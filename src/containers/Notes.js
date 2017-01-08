import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon} from 'react-fa'
// 文件树
import Tree from 'react-ui-tree'
import '../components/Tree/tree.css'

import {chooseNotebook, chooseNote} from '../actions/index'
import Event from '../utils/Event'
import scan from '../utils/filetree'

import '../static/styles/Notes.css'

class Notes extends Component {
	constructor(props) {
		super(props)

		this.state = {
			notebookHieght: `50%`,
			noteHeight: `calc(50% - 6px)`,
			startChange: false,
			active: null,
			tree: {}
		}
		this._renderNode = this._renderNode.bind(this)
		this._chooseNote = this._chooseNote.bind(this)
	}

	componentDidMount() {
		// 拿到一个目录
		const rootdir = localStorage.getItem('notedir')
		let tree = scan(rootdir)
		this.setState({
			tree
		})
	}

	_chooseNote(note, currentNotebook) {
		const {dispatch} = this.props
		dispatch(chooseNote(note))
		Event.emit('chooseNote', currentNotebook, note)
	}

	_renderNode(node) {
		if(node.leaf) {
			// 如果是文件
			return (
				<span
					className = {node === this.state.active && 'is-active'}
					style = {{whiteSpace: 'nowrap'}}
					onClick = {() => {
						// alert('hello')
						// 选中笔记
						this._chooseNote(node.module, node.parent)
						this.setState({
							active: node
						})
					}}
				>
				<Icon name="file-code-o" style = {{marginRight: '10px'}} />
			  	{node.module}
				</span>
			)
		}
	    return (
	      	<span
	      		onClick = {() => {
	      			// alert('hello')
	      			// 选中笔记
	      			// this._chooseNote(node.module, node.parent)
	      		}}
	      	>
				{
					node.collapsed 
					? <Icon name="folder-o" style = {{marginLeft: 10, marginRight: '12px'}} />
					: <Icon name="folder-open-o" style = {{marginLeft: 10, marginRight: '10px'}} />
				}
	        	{node.module}
	      	</span>
	    )
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
				<Tree
				  	paddingLeft={20}              // left padding for children nodes in pixels
				  	tree={this.state.tree}        // tree object
				  	renderNode={this._renderNode}  // renderNode(node) return react element
				/>
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