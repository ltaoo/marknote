import React, {Component} from 'react'
import MarkdownIt from 'markdown-it'

export default class Markdown extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const source = this.props
		const md = new MarkdownIt()
		const html = md.render(source)
		return (
			<div
				className = "output"
				dangerouslySetInnerHTML = {{__html: html}}
			></div>
		)
	}
}