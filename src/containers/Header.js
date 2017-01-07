import React, {Component} from 'react'
import {Icon} from 'react-fa'

import {ipcRenderer} from 'electron'

import '../static/styles/Header.css'

export default class Header extends Component {
	render() {
		return (
			<div className = "header">
				<Icon 
					className = "header__button--icon"
					name = "close" 
					onClick = {() => {
						ipcRenderer.send('quit-app')
					}}
				/>
				<Icon 
					className = "header__button--icon"
					name = "minus" 
					onClick = {() => {
						ipcRenderer.send('quit-app')
					}}
				/>
			</div>
		)
	}
}