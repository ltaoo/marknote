import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import marked from 'marked'

import '../static/styles/Markdown.css'

class Markdown extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// this.preview = ReactDOM.findDOMNode(this)
		this.preview = ReactDOM.findDOMNode(this)
		console.dir(this.preview)
	}

	render() {
		const {scroll} = this.props
		const source = this.props.input.source
		// console.log(source)
		const html = `<div class="markdown-body">${marked(source)}</div>`
		// console.log(html)
		// 改变滚动条位置
		// const scroller = document.querySelector('.CodeMirror-scroll')
		!!this.preview && (this.preview.scrollTop = scroll.top)
		return (
			<div
				className = "preview"
				dangerouslySetInnerHTML = {{__html: html}}
			></div>
		)
	}
}

export default connect((state)=> {
	const {input, scroll} = state;
	return {
		input,
		scroll
	}
})(Markdown)