import React, {Component} from 'react'
import {Icon} from 'react-fa'

import '../static/styles/Header.css'

export default class Header extends Component {
	render() {
		return (
			<div className = "header">
				<Icon name = "close" />
			</div>
		)
	}
}