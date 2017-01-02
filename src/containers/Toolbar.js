import React, {Component} from 'react'
// http://fontawesome.io/icons/
import {Icon} from 'react-fa'

import '../static/styles/Toolbar.css'

export default class Toolbar extends Component {
    render() {
        const {menuClick} = this.props
        return (
            <div className = "toolbar">
                <Icon 
                    name="bars" 
                    onClick = {menuClick}
                />
                <Icon name="undo" />
                <Icon name="repeat" />
                <Icon name="bold" />
                <Icon name="strikethrough" />
                <Icon name="italic" />
                <Icon name="quote-left" />
                <Icon name="ucwords" />
                <Icon name="font" />
                <Icon name="h1" />
                <Icon name="h2" />
                <Icon name="h3" />
                <Icon name="h4" />
                <Icon name="h5" />
                <Icon name="h6" />
                <Icon name="list-ul" />
                <Icon name="list-ol" />
                <Icon name="hr" />
                <Icon name="link" />
                <Icon name="reference-link" />
                <Icon name="image" />
                <Icon name="code" />
                <Icon name="preformatted-text" />
                <Icon name="code-block" />
                <Icon name="table" />
                <Icon name="datetime" />
                <Icon name="eye" />
                <Icon name="preview" />
                <Icon name="tv" />
                <Icon name="eraser" />
                <Icon name="search" />
            </div>
        )
    }
}