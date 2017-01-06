import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import marked from 'marked'
// 配置代码块高亮
marked.setOptions({
  	highlight: function (code) {
    	return require('highlight.js').highlightAuto(code).value
  	}
})
import 'highlight.js/styles/atom-one-light.css'

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

	showComponentUpdate(nextProps, nextState) {
		// const {editorScroll} = this.props
		// console.log(nextProps)
		return !(this.props === nextProps || is(this.props, nextProps)) || !(this.state === nextState || is(this.state, nextState))
	}

	_onScroll() {
		const {dispatch, common} = this.props
		// 要区分是主动滚动还是被动滚动
		if(common.current === 'preview') {
			dispatch(previewScroll(this.preview.scrollTop))
		}
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
		// const {editorScroll} = this.props
		const source = this.props.notes.noteContent

		// console.log(source)
		const html = `<div class="markdown-body">${marked(source)}</div>`
		// console.log(html)
		// 改变滚动条位置
		// const clientHeight = this.preview.clientHeight
  		// const scrollTop = this.preview.scrollTop
        // if(this.preview) {
	       //  const scrollHeight = this.preview.scrollHeight
        // 	this.preview.scrollTop = editorScroll.previewTop*scrollHeight
        // }
		// !!this.preview && (this.preview.scrollTop = editorScroll.previewTop*scrollHeight)
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
	const {notes, common} = state;
	return {
		notes,
		// editorScroll,
		common
	}
})(Markdown)