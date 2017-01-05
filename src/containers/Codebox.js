import fs from 'fs'
import path from 'path'

import React, { Component } from 'react' 
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {connect} from 'react-redux'
// 渲染进程通信
import {ipcRenderer} from 'electron'

import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/lib/codemirror.css'
// 支持 vim 模式
import 'codemirror/keymap/vim'
// 编辑器主题
// import 'codemirror/theme/icecoder.css'

import {input, startScroll, editorScroll} from '../actions/index'
import '../static/styles/Codebox.css'

// 事件
import Event from '../utils/Event'
// 数据
import store from '../store'

class Codebox extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, common} = this.props
        const code = ReactDOM.findDOMNode(this)
        // const code = this.refs.editor
        this.doc = CodeMirror(code, {
            // value: "// open a javascript file..",
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            mode: 'markdown',
            keyMap: 'vim',
            // 自动换行
            lineWrapping: true
        })

        // 默认内容
        let localNote = localStorage.getItem('note')
        if(localNote) {
            this.doc.setValue(localNote)
        }

        // 监听输入事件
        this.doc.on('change', (target, source) => {
            dispatch(input(this.doc.getValue()))
        })

        // 需要监听滚动条的位置
        this.scroller = document.querySelector('.CodeMirror-scroll')
        // console.dir(scroller)
        this.scroller.onscroll = () => {
            if(common.current === 'editor') {
                const clientHeight = this.scroller.clientHeight
                const scrollTop = this.scroller.scrollTop
                const scrollHeight = this.scroller.scrollHeight
                // console.log(clientHeight, scrollTop, scrollHeight)
                // clientHeight + scrollTop === scrollHeight，客户端高度加上滚动的距离等于内容高度
                // 当编辑区滚动时，要修改渲染区的 scrollTop
                const percentage = (scrollTop)/scrollHeight
                // console.log(percentage)
                // dispatch(editorScroll(scrollTop))
                dispatch(editorScroll(percentage))
            }
        }

        // 将内容保存至 localstorage
        // 每隔 10s 就保存一次
        this.timer = setInterval(() => {
            this._saveToLocalStorage(this.doc.getValue())
        }, 10000)


        Event.on('chooseNote', (notebook, note) => {
            let rootdir = localStorage.getItem('notedir')
            if(rootdir) {
                let content = fs.readFileSync(path.join(rootdir, notebook, note), 'utf8')
                localStorage.setItem('note', content)
                this.doc.setValue(content)
            }
        })    
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    _saveToLocalStorage(content) {
        // 判断是否和缓存中的一致，如果一直就不保存？
        const oldContent = localStorage.getItem('note')
        if(content !== oldContent) {
            localStorage.setItem('note', content)
        }
    }

    _onWheel() {
        // 当滚动的时候，就锁定另一个
        const {dispatch, common} = this.props
        if(common.current === 'editor') {
            return;
        }
        dispatch(startScroll('editor'))
    }

  	render() {
  		const {previewScroll, notes} = this.props
        !!this.scroller && (this.scroller.scrollTop = previewScroll.editorTop)
        //
	    return (
            <div 
                ref = "editor"
                className="editor"
                onWheel = {this._onWheel.bind(this)}
            ></div>
	    )
  	}
}


export default connect((state)=> {
    const {previewScroll, common, notes} = state
	return {
        previewScroll,
        common,
        notes
	}
})(Codebox)

function saveNote(){
    let state = store.getState()
    const {notes} = state
    let content = notes.noteContent
    let notePath = notes.currentNote
    console.log(notePath)
    //
    try {
        fs.writeFileSync(notePath, content, 'utf8')
    }catch(err) {
        console.log(err)
    }
}

ipcRenderer.on('save-note', (event, message) => {
    saveNote()
})

