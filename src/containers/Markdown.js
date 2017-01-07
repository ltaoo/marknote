import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Icon} from 'react-fa'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt({
	// \n 转换成 br
	breaks: true,
	// 代码块高亮
	highlight: function (str, lang) {
		// console.log(str, lang)
		let lines = str.split('\n')
		// console.log(lines)
		let result = ''
		lines.forEach(line => {
			result += `<li>${hljs.highlight(lang, line, true).value}</li>`
		})
	    if (lang && hljs.getLanguage(lang)) {
	      	try {
	        	return `<pre class="hljs"><code><ol>${result}</ol></code></pre>`
	      	} catch (__) {}
	    }
	    // return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
	    return `<pre class="hljs"><code><ol>${result}</ol></code></pre>`
	}
})

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
		const html = `<div class="markdown-body">${md.render(noteContent)}</div>`
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