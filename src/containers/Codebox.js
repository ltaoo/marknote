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

import {input, scroll} from '../actions/index'
import '../static/styles/Codebox.css'

const mouseOrTouch = function(mouseEventType, touchEventType) {
    mouseEventType = mouseEventType || "click";
    touchEventType = touchEventType || "touchend";
    
    var eventType  = mouseEventType;

    try {
        document.createEvent("TouchEvent");
        eventType = touchEventType;
    } catch(e) {}

    return eventType;
}

class Codebox extends Component {

    componentDidMount() {
        const {dispatch} = this.props
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

        // 监听滚动事件
        // code.bind(mouseOrTouch("scroll", "touchmove"), function(event) {
        //     console.log(event)
        // })
        // console.log(Window)
        // 需要监听滚动条的位置
        const scroller = document.querySelector('.CodeMirror-scroll')
        // console.dir(scroller)
        scroller.onscroll = function(event) {
            // console.log(event)
            var scrollTop = scroller.scrollTop
            // console.log(scrollTop)
            dispatch(scroll(scrollTop))
        }
    }

    _onWheel(event) {
        // 获取到滚动值，100 或者 -100
        // console.log(event.deltaY)
    }

  	render() {
  		const {state} = this.props
	    return (
	      	<div className="editor"
                onWheel = {this._onWheel.bind(this)}
            ></div>
	    )
  	}
}
export default connect((state)=> {
	return {
		state
	}
})(Codebox)