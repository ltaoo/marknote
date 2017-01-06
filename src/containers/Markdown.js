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

const renderer = new marked.Renderer();

renderer.code = function (code, lang, escaped) {
	// if (this.options.highlight) {
	// 	// 是否配置了高亮
	//     var out = this.options.highlight(code, lang);
	//     if (out != null && out !== code) {
	//       	escaped = true;
	//       	code = out;
	//     }
	// }
	// code 根据 \n 分割
	let lines = code.split('\n')
	let result = ''
	lines.forEach(line => {
		result += `<li>${this.options.highlight(line, lang)}</li>`
	})

	// 如果没有 language，就直接返回
	if (!lang) {
	    return '<pre><code><ol>'
	      	+ result
	      	+ '\n</ol></code></pre>';
	}

	return '<pre><code><ol class="'
	    + this.options.langPrefix
	    + escape(lang, true)
	    + '">'
	    + result
	    + '\n</ol></code></pre>\n'; 
}

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
		const html = `<div class="markdown-body">${marked(source, {renderer})}</div>`
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