import React, {Component} from 'react'
import {Icon} from 'react-fa'

import '../static/styles/Tools.css'

export default class Tools extends Component {
    render() {
        return (
            <div className = "tools">
                <div className = "tools__newfile"><Icon name="file" /></div>
            </div>
        )
    }
}