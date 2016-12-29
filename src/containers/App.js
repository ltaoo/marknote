import React, { Component } from 'react' 
import { Link } from 'react-router'

import Codebox from './Codebox'

export default class App extends Component {
  	render() {
	    return (
	      	<div>
		        <h2>Code Mirror 编辑器</h2>
		        <Codebox />
	      	</div>
	    )
  	}
}