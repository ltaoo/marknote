import fs from 'fs'

import React, { Component } from 'react' 
import { Link } from 'react-router'

import {remote} from 'electron'

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
    componentDidMount() {
        let notedir = localStorage.getItem('notedir')
        if(!notedir) {
            // 如果不存在
            // 弹出文件夹选择窗口
            // remote.dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
            // 显示模态框
        }
        console.log(notedir)

        // fs.readdir('D:/', (err, res) => {
        //     if(err) throw err

        //     console.log(res)
        // })
    }
  	render() {
        // 根据 show 来处理样式
        let mainStyle = {
            transition: 'transform .3s ease-out',
            WebkitTransition: '-webkit-transform .3s ease-out'
        }
        if(this.state.show) {
            // 如果展示侧边栏
            mainStyle.transform = `translateX(380px)`
            mainStyle.WebkitTransform = `translateX(380px)`
            mainStyle.overflow = 'hidden'
        } else {
            mainStyle.transform = ''
            mainStyle.WebkitTransform = ''
            mainStyle.overflow = 'auto'
        }

	    return (
	      	<div className = "container">
                <Sidebar
                    show = {this.state.show}
                    styles = {{sidebar: {
                        width: '380px',
                        backgroundColor: '#fff'
                    }}}
                    onSetOpen = {() => {
                        this.setState({
                            show: !this.state.show
                        })
                    }}
                >
                    <div>
                        <button
                            onClick = {() => {
                                console.log(document)
                            }}
                        >click it</button>
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