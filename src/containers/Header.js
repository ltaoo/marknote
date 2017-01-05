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
					name = "window-close-o" 
					onClick = {() => {
						ipcRenderer.send('quit-app')
					}}
				/>
				<Icon 
					className = "header__button--icon"
					name = "window-maximize" 
					onClick = {() => {
						ipcRenderer.send('quit-app')
					}}
				/>
				<Icon 
					className = "header__button--icon"
					name = "window-minimize" 
					onClick = {() => {
						ipcRenderer.send('quit-app')
					}}
				/>

			</div>
		)
	}
}