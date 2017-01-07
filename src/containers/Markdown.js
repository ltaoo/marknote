import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import marked from 'marked'
import {Icon} from 'react-fa'
// 配置代码块高亮
marked.setOptions({
  	highlight: function (code) {
    	return require('highlight.js').highlightAuto(code).value
  	}
})

const renderer = new marked.Renderer();
// 代码块增加行号
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

	// 如果没有 language，就直接返回中文
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

// 通用组件
import FloatTool from '../components/FloatTool'

class Markdown extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const {notes} = this.props
		this.preview = ReactDOM.findDOMNode(this)
		this.preview.onscroll = (event) => {
			this._onScroll();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		// 如果正在输入，就不更新
		if(nextProps.notes.inputting) {
			return false
		} else {
			return true
		}
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
		const {notes} = this.props
		const {noteContent, inputting} = notes

		// console.log(source)
		// if(!inputting) {
		const html = `<div class="markdown-body">${marked(noteContent, {renderer})}</div>`
		// }
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
			>
				<div
					dangerouslySetInnerHTML = {{__html: html}}
					onWheel = {this._onWheel.bind(this)}
				></div>
				<FloatTool
					styles = {{right: 30, top: 95}}
				>
					<Icon 
						name = "desktop"
						onClick = {() => {
							alert('全屏显示')
						}}
					/>
				</FloatTool>
			</div>
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