import fs from 'fs'
import path from 'path'

import React, { Component } from 'react' 
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {connect} from 'react-redux'
// 渲染进程通信
import {ipcRenderer} from 'electron'
import {Modal} from 'antd'

import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/lib/codemirror.css'
// 支持 vim 模式
import 'codemirror/keymap/vim'
// 编辑器主题
// import 'codemirror/theme/icecoder.css'

import {
    input, 
    startScroll, 
    editorScroll, 
    addNewNote,
    saveNote
} from '../actions/index'
import '../static/styles/Codebox.css'

// 事件
import Event from '../utils/Event'
// 数据
import store from '../store'

let scroller = null
let codemirror = null

class Codebox extends Component {
    constructor(props) {
        super(props)

        this._handleScroller = this._handleScroller.bind(this)
    }

    componentDidMount() {
        const {dispatch, common} = this.props
        // 初始化 codemirror 编辑器
        const code = ReactDOM.findDOMNode(this)
        // const code = this.refs.editor
        // 生成 codemirror 编辑器并保存到变量
        codemirror = CodeMirror(code, {
            // value: "// open a javascript file..",
            // 显示行号
            lineNumbers: true,
            // 当前行高亮
            styleActiveLine: true,
            matchBrackets: true,
            // 主题
            mode: 'markdown',
            // 使用 vim 模式
            keyMap: 'vim',
            // 自动换行
            lineWrapping: true
        })

        // 默认内容
        let localNote = localStorage.getItem('note')
        if(localNote) {
            codemirror.setValue(localNote)
        }
        // 监听输入事件
        codemirror.on('change', (target, source) => {
            dispatch(input(codemirror.getValue()))
        })
        // 可以用来显示当前光标位置
        // codemirror.on('cursorActivity', (target, source) => {
        //     let cursor = codemirror.doc.getCursor()
        //     console.log(cursor)
        // })

        // 滚动事件
        this._handleScroller()

        // 点击笔记事件
        Event.on('chooseNote', (notebook, note) => {
            let rootdir = localStorage.getItem('notedir')
            if(rootdir) {
                let content = fs.readFileSync(path.join(rootdir, notebook, note), 'utf8')
                localStorage.setItem('note', content)
                codemirror.setValue(content)
            }
        })    
    }

    _handleScroller() {
        const {dispatch, common} = this.props
        // 需要监听滚动条的位置
        // 获取到滚动条节点，保存到变量中
        scroller = document.querySelector('.CodeMirror-scroll')
        // console.dir(scroller)
        scroller.onscroll = () => {
            if(common.current === 'editor') {
                const clientHeight = scroller.clientHeight
                const scrollTop = scroller.scrollTop
                const scrollHeight = scroller.scrollHeight
                // console.log(clientHeight, scrollTop, scrollHeight)
                // clientHeight + scrollTop === scrollHeight，客户端高度加上滚动的距离等于内容高度
                // 当编辑区滚动时，要修改渲染区的 scrollTop
                const percentage = (scrollTop)/scrollHeight
                // console.log(percentage)
                // dispatch(editorScroll(scrollTop))
                dispatch(editorScroll(percentage))
            }
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
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
        !!scroller && (scroller.scrollTop = previewScroll.editorTop)
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

Codebox.codemirror = codemirror

export default connect((state)=> {
    const {previewScroll, common, notes} = state
	return {
        previewScroll,
        common,
        notes
	}
})(Codebox)

function _saveNote(){
    let state = store.getState()
    const {notes} = state
    let content = notes.noteContent
    let notePath = notes.currentNote
    // console.log(notes)
    // 判断是否是有修改的保存
    if(!notes.inputting) {
        // 没有修改就忽略这一保存动作
        return
    }
    //
    try {
        fs.writeFileSync(notePath, content, 'utf8')
        store.dispatch(saveNote())
        // 应该有个通知就好了
        console.log('保存成功')
    }catch(err) {
        console.log(err)
    }
}

function _addNewFile() {
    let state = store.getState()
    const {notes} = state
    // 先判断是否有修改没有保存，如果有就提示是否需要保存
    let result = 0
    // if(notes.inputting) {
    //     Modal.confirm({
    //         content: '文件没有保存，是否需要保存？',
    //         okText: '确定',
    //         cancelText: '取消',
    //         onOk(){
    //             // 点击确认
    //             result = 1
    //         },
    //         onCancle() {
    //             result = -1
    //         }
    //     })
    // }
    // 先清空当前 reducer 和 localStorage
    if(result === 1) {
        // 如果是确认要保存
    } else if(result === 0) {
        // 如果是不保存直接放弃
        store.dispatch(addNewNote())
        // 清空编辑区的文字
        // console.log(codemirror)
        codemirror.doc.setValue('# 未命名')
        // 获取到焦点
        codemirror.focus()
        codemirror.doc.setCursor({
            line: 0,
            ch: 0
        })
        codemirror.doc.setSelection({
            line: 0,
            ch: 2
        }, {
            line: 0,
            ch: 5
        })
        // 获取到当前文件夹，在当前文件夹下新建文件
    } else {
        // 取消本次操作
        return
    }

}

ipcRenderer.on('new-note', (event, message) => {
    _addNewFile()
})
ipcRenderer.on('save-note', (event, message) => {
    _saveNote()
})

