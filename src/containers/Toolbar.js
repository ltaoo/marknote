import React, {Component} from 'react'
// http://fontawesome.io/icons/
import {Icon} from 'react-fa'

import '../static/styles/Toolbar.css'
/*
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
<Icon name="desktop" />
<Icon name="eraser" />
<Icon name="search" />
*/
export default class Toolbar extends Component {
    render() {
        const {menuClick, addNewFile} = this.props
        return (
            <div className = "toolbar">
                <Icon 
                    className = "toolbar__icon"
                    name="bars" 
                    onClick = {menuClick}
                />
                <Icon 
                    className = "toolbar__icon"
                    name="file-o" 
                    onClick = {addNewFile}
                />
                <Icon name="save"
                    className = "toolbar__icon"
                />
                <Icon name="folder-open-o"
                    className = "toolbar__icon"
                />
            </div>
        )
    }
}