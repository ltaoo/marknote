import React, { Component } from 'react' 
import { Link } from 'react-router'

import Toolbar from './Toolbar'
import Codebox from './Codebox'
import Markdown from './Markdown'

import Tools from './Tools'
// 侧边栏
import Sidebar from './Sidebar'

import '../static/styles/App.css'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false
        }
    }
    _sidebar() {
        return (
            <p> ok ? </p>
        )
    }
  	render() {
        // 根据 show 来处理样式
        let mainStyle = {
            transition: 'transform .3s ease-out',
            WebkitTransition: '-webkit-transform .3s ease-out'
        }
        if(this.state.show) {
            // 如果展示侧边栏
            mainStyle.transform = `translateX(400px)`
            mainStyle.WebkitTransform = `translateX(400px)`
            mainStyle.overflow = 'hidden'
        } else {
            mainStyle.transform = ''
            mainStyle.WebkitTransform = ''
            mainStyle.overflow = 'auto'
        }

	    return (
	      	<div className = "main">
                <Tools />
                <Sidebar
                    show = {this.state.show}
                    styles = {{sidebar: {
                        width: '400px',
                        backgroundColor: '#fff'
                    }}}
                    onSetOpen = {() => {
                        this.setState({
                            show: !this.state.show
                        })
                    }}
                >
                    <div>
                        <p>hello</p>
                    </div>
                </Sidebar>
                <div className = "main" style = {mainStyle}>
                    <Toolbar 
                        menuClick = {() => {
                            this.setState({
                                show: !this.state.show
                            })
                        }}
                    />
                    <div className = "markdown">
                        <Codebox />
                        <Markdown />
                    </div>
                </div>
	      	</div>
	    )
  	}
}