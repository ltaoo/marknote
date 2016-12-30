import React, {Component} from 'react'
import {connect} from 'react-redux'
import marked from 'marked'

class Markdown extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const source = this.props.input.source
		// console.log(source)
		const html = marked(source)
		// console.log(html)
		return (
			<div
				className = "markdown-body"
				dangerouslySetInnerHTML = {{__html: html}}
			></div>
		)
	}
}

export default connect((state)=> {
	return {
		input: state.input
	}
})(Markdown)