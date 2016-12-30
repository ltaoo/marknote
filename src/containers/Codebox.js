import React, { Component } from 'react' 
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {connect} from 'react-redux'

import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/theme/monokai.css'
import 'codemirror/lib/codemirror.css'

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

        // this.doc.change = (target, source) => {
        //     console.log(target, source)
        // }

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
export default connect((state)=> {
	return {
		state
	}
})(Codebox)