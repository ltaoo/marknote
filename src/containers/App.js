import fs from 'fs'

import React, { Component } from 'react' 
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {connect} from 'react-redux'

import {remote} from 'electron'
// 模态框
import {Modal} from 'antd'
import 'antd/lib/modal/style/css'

// 容器组件
import Header from './Header'
import Toolbar from './Toolbar'
import Codebox from './Codebox'
import Markdown from './Markdown'
import Tools from './Tools'
// 侧边栏
import Sidebar from './Sidebar'
import Notes from './Notes'
// drop 组件
import Drop from './Drop'

// 全局
import '../static/common.css'
// 主题样式
import '../static/themes/github-markdown.css'
// 组件样式
import '../static/styles/App.css'


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false
        }
    }
    componentDidMount() {
        const {dispatch, notes} = this.props
        let notedir = localStorage.getItem('notedir')
        if(!notedir) {
            // 如果不存在
            // 弹出文件夹选择窗口
            // remote.dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
            // 显示模态框
            Modal.info({
                content: <Drop />
            })
        }

        // let box = ReactDOM.findDOMNode(this)
        let box = document.querySelector('.container')
        box.addEventListener("drop", function (e){ 
            // console.log('拖动文件')
            // 阻止默认的拖动打开事件
            e.preventDefault()
            // 当拖动的时候，样式可以再处理下，添加蒙版层

            // 拿到文件对象
            let fileList = e.dataTransfer.files;
            if(fileList.length > 1){ 
                alert('只能拖动一个文件')
                return;
            } 
            localStorage.setItem('notedir', fileList[0].path)
            notedir = fileList[0].path
        })

        fs.readdir(notedir, (err, res) => {
            if(err) console.log(err)

            console.log(res)
        })
    
    }
    render() {
        const {notes} = this.props
        // 根据 show 来处理样式
        let mainStyle = {
            transition: 'transform .3s ease-out',
            WebkitTransition: '-webkit-transform .3s ease-out'
        }
        if(this.state.show) {
            // 如果展示侧边栏
            mainStyle.transform = `translateX(300px)`
            mainStyle.WebkitTransform = `translateX(300px)`
            mainStyle.overflow = 'hidden'
        } else {
            mainStyle.transform = ''
            mainStyle.WebkitTransform = ''
            mainStyle.overflow = 'auto'
        }

        return (
            <div className = "container">
                <Header />
                <Sidebar
                    show = {this.state.show}
                    styles = {{sidebar: {
                        width: '300px',
                        backgroundColor: '#fff'
                    }}}
                    onSetOpen = {() => {
                        this.setState({
                            show: !this.state.show
                        })
                    }}
                >
                    <Notes />
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
export default connect((state) => {
    const {notes} = state
    return {
        notes
    }
})(App)