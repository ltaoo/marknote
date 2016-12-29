import React, { Component } from 'react' 
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {connect} from 'react-redux'

import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/matchbrackets'

class Codebox extends Component {
    componentDidMount() {
        const code = ReactDOM.findDOMNode(this)

        this.doc = CodeMirror(code, {
            value: "// open a javascript file..",
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            mode: "javascript"
        })

        this.doc.setValue('hello world')
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if(nextProps)
    }
  	render() {
  		const {state} = this.props
	    return (
	      	<div className="codebox"></div>
	    )
  	}
}
// connect 函数接收一个函数作为参数，决定在这个组件可以获取到哪些数据
// 首先要了解， state 是一棵很大的状态树，也就是我们reducer函数中传入的 state
export default connect((state)=> {
	return {
		state
	}
})(Codebox)