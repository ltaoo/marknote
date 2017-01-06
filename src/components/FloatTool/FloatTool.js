import React, {Component} from 'react'
import './styles.css'

export default class FloatTool extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {styles} = this.props
		return (
			<div
				className = "floatTool"
				style = {styles}
			>
				{this.props.children}
			</div>
		)
	}
}