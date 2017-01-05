import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon} from 'react-fa'

import {chooseNotebook, chooseNote} from '../actions/index'
import Event from '../utils/Event'

import '../static/styles/Notes.css'

class Notes extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {dispatch, notebooks, notes, currentNotebook} = this.props
		let notebooks_html = notebooks.map((notebook, index) => {
			let cls = "notes__notebook"
			if(notebook === currentNotebook) {
				// 如果是
				cls = "notes__notebook notes__notebook--active"
			}
			return (
				<li
					className = {cls}
					key = {index}
					onClick = {(e) => {
						// console.log(notebook)
						dispatch(chooseNotebook(notebook))
					}}
				>
					{
						currentNotebook === notebook
						? <Icon name="folder-open-o" style = {{marginRight: '10px'}} />
						: <Icon name="folder-o" style = {{marginRight: '12px'}} />
					} 
					{notebook}
				</li>
			)
		})

		let notes_html = notes.map((note, index) => {
			return (
				<li 
					className = "notes__note" 
					key = {index}
					onClick = {() => {
						// 点击笔记事件
						dispatch(chooseNote(note))
						Event.emit('chooseNote', currentNotebook, note)
					}}
				>
					<Icon name="file-code-o" style = {{marginRight: '10px'}} />{note}
				</li>
			)
		})
		return (
			<div className = "notes">
				<ul className = "notes__notebooks">
					{notebooks_html}
				</ul>
				<ul className = "notes__notes">
					{notes_html}
				</ul>
			</div>
		)
	}
}

export default connect((state) => {
	const {notes} = state

	return {
		notebooks: notes.notebooks,
		notes: notes.notes,
		currentNotebook: notes.currentNotebook
	}
})(Notes)