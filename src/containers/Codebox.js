import React, { Component } from 'react' 
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {connect} from 'react-redux'

import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/lib/codemirror.css'
// 编辑器主题
// import 'codemirror/theme/icecoder.css'

import {input, startScroll, editorScroll} from '../actions/index'
import '../static/styles/Codebox.css'

class Codebox extends Component {

    componentDidMount() {
        const {dispatch, common} = this.props
        const code = ReactDOM.findDOMNode(this)

        this.doc = CodeMirror(code, {
            // value: "// open a javascript file..",
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            mode: 'markdown',
            // 自动换行
            lineWrapping: true
        })
        // 监听输入事件
        this.doc.on('change', (target, source) => {
            dispatch(input(this.doc.getValue()))
        })
        // 需要监听滚动条的位置
        this.scroller = document.querySelector('.CodeMirror-scroll')
        // console.dir(scroller)
        this.scroller.onscroll = () => {
            if(common.current === 'editor') {
                var scrollTop = this.scroller.scrollTop
                // 当编辑区滚动时，要修改渲染区的 scrollTop
                dispatch(editorScroll(scrollTop))
            }
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
        console.log('hello')
  		const {previewScroll} = this.props
        !!this.scroller && (this.scroller.scrollTop = previewScroll.editorTop)
	    return (
	      	<div 
                className="editor"
                onWheel = {this._onWheel.bind(this)}
            ></div>
	    )
  	}
}
export default connect((state)=> {
    const {previewScroll, common} = state
	return {
        previewScroll,
        common
	}
})(Codebox)