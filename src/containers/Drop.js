import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class Drop extends Component {
	componentDidMount() {
		let box = ReactDOM.findDOMNode(this)
		box.addEventListener("drop", (e) => { 
			// 阻止默认的拖动打开事件
			e.preventDefault()
			// 拿到文件对象
			let fileList = e.dataTransfer.files;
			if(fileList.length > 1){ 
				alert('只能拖动一个文件')
				return;
			} 
			console.log(fileList)
		})
	}
	render() {
		return (
			<div className = "drop">
				<p>将笔记本文件夹拖入</p>
			</div>
		)
	}
}
