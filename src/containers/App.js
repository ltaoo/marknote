import React, { Component } from 'react' 
import { Link } from 'react-router'

import Codebox from './Codebox'
import Markdown from './Markdown'

import '../static/styles/App.css'

export default class App extends Component {
  	render() {
	    return (
	      	<div className = "main">
		        <Codebox />
		        <Markdown />
	      	</div>
	    )
  	}
}