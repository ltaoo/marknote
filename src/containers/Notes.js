import React, {Component} from 'react'
import {connect} from 'react-redux'

import '../static/styles/Notes.css'

class Notes extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {notes} = this.props
		let list = notes.notebooks.map((notebook, index) => {
			return (
				<li className = "notes__notebook" key = {index}>{notebook}</li>
			)
		})
		return (
			<ul className = "notes">
				{list}
			</ul>
		)
	}
}

export default connect((state) => {
	const {notes} = state

	return {
		notes
	}
})(Notes)