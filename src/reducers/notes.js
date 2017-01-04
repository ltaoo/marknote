import * as types from '../actions'
import fs from 'fs'
import path from 'path'

// 先从缓存中获取到是否有路径
const NOTES_DIR = localStorage.getItem('notedir')
let notebooks = []
if(NOTES_DIR) {
	// 如果存在
	try {
		notebooks = fs.readdirSync(NOTES_DIR)
	}catch(err) {
		console.log(err)
	}
}

// 如果笔记本存在
// 默认拿第一个笔记本的
let notesAry = []
if(notebooks.length > 0) {
	let notebook = notebooks[0]
	try {
		notesAry = fs.readdirSync(path.join(NOTES_DIR, notebook))
	}catch(err) {
		console.log(err)
	}
}

// 笔记内容
let noteContent = ''
if(localStorage.getItem('note')) {
	// 如果缓存中有
	noteContent = localStorage.getItem('note')
}

const initialValue = {
	notebooks,
	notes: notesAry,
	currentNotebook: notebooks[0],
	noteContent
}

const notes = (state = initialValue, action)=> {
	switch(action.type) {
		// 扫描路径
		case types.SCAN_DIR:
			return Object.assign({}, state, {
				notebooks: action.value
			})
		// 选择笔记本
		case types.CHOOSE_NOTEBOOK:
			// 读取指定笔记本的笔记
			let newNotes = fs.readdirSync(path.join(NOTES_DIR, action.value))
			return Object.assign({}, state, {
				currentNotebook: action.value,
				notes: newNotes
			})
		// 选择笔记
		case types.CHOOSE_NOTE:
			let content = fs.readFileSync(path.join(NOTES_DIR, state.currentNotebook, action.value), 'utf8')
			return Object.assign({}, state, {
				noteContent: content
			})
		case types.INPUT:
			return Object.assign({}, state, {
				noteContent: action.value
			})
		default:
			return state
	}
}

export default notes