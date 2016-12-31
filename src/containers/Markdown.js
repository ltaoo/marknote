import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import marked from 'marked'

import {startScroll, previewScroll} from '../actions/index'

import '../static/styles/Markdown.css'

class Markdown extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.preview = ReactDOM.findDOMNode(this)
		this.preview.onscroll = (event) => {
			this._onScroll();
		}
	}

	_onScroll() {
		const {dispatch, scroll} = this.props
		// 要区分是主动滚动还是被动滚动
		// if(scroll.current === 'preview') {
		// }
		dispatch(previewScroll(this.preview.scrollTop))
	}

	_onWheel() {
		// 当滚动的时候，就锁定另一个
		const {dispatch, common} = this.props
		if(common.current === 'preview') {
			return;
		}
		dispatch(startScroll('preview'))
	}

	render() {
		const {editorScroll} = this.props
		const source = this.props.input.source
		// console.log(source)
		const html = `<div class="markdown-body">${marked(source)}</div>`
		// console.log(html)
		// 改变滚动条位置
		!!this.preview && (this.preview.scrollTop = editorScroll.previewTop)
		return (
			<div
				className = "preview"
				dangerouslySetInnerHTML = {{__html: html}}
				onWheel = {this._onWheel.bind(this)}
			></div>
		)
	}
}

export default connect((state)=> {
	const {input, editorScroll, common} = state;
	return {
		input,
		editorScroll,
		common
	}
})(Markdown)