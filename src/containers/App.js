import React, { Component } from 'react' 
import { Link } from 'react-router'

import Toolbar from './Toolbar'
import Codebox from './Codebox'
import Markdown from './Markdown'

import '../static/styles/App.css'

export default class App extends Component {
  	render() {
	    return (
	      	<div className = "main">
                <Toolbar />
                <div className = "markdown">
                    <Codebox />
                    <Markdown />
                </div>
	      	</div>
	    )
  	}
}