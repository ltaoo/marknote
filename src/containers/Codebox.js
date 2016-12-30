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

import {input} from '../actions/index'
import '../static/styles/Codebox.css'

class Codebox extends Component {
    componentDidMount() {
        // console.log(this.props)
        const {dispatch} = this.props
        const code = ReactDOM.findDOMNode(this)

        this.doc = CodeMirror(code, {
            // value: "// open a javascript file..",
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true
        })
        // 监听输入事件
        this.doc.on('change', (target, source) => {
            dispatch(input(this.doc.getValue()))
            // console.log(source)
            // if(source.origin === '+input') {
            //     // 如果是输入，就从 Input 中读取
            //     if(source.text.length === 2) {
            //         // 换行
            //         dispatch(input('\n'))
            //     } else {
            //         dispatch(input(source.text[0]))
            //     }
            // } else {
            //     // 删除就从 removed 读取
            //     dispatch()
            // }
        })

    }

  	render() {
  		const {state} = this.props
	    return (
	      	<div className="codebox"></div>
	    )
  	}
}
export default connect((state)=> {
	return {
		state
	}
})(Codebox)