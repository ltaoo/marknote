import React, { Component } from 'react' 
import { Link } from 'react-router'

import Toolbar from './Toolbar'
import Codebox from './Codebox'
import Markdown from './Markdown'

import Tools from './Tools'

import '../static/styles/App.css'

export default class App extends Component {
  	render() {
	    return (
	      	<div className = "main">
                <Toolbar />
                <Tools />
                <div className = "markdown">
                    <Codebox />
                    <Markdown />
                </div>
	      	</div>
	    )
  	}
}