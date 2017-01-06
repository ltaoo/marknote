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
const currentNotebookInLocal = localStorage.getItem('currentNotebook')

// 笔记内容
let noteContent = ''
if(localStorage.getItem('note')) {
	// 如果缓存中有
	noteContent = localStorage.getItem('note')
}

// 笔记路径
let currentNote = null;
if(localStorage.getItem('currentNote')) {
	currentNote = localStorage.getItem('currentNote')
}

const initialValue = {
	// 笔记本根路径
	NOTES_DIR,
	// 笔记本列表
	notebooks,
	// 当前显示的笔记列表
	notes: notesAry,
	// 当前选中的笔记本名，默认第一个（应该设置一个默认笔记本？）
	currentNotebook: currentNotebookInLocal || notebooks[0],
	// 当前选中的笔记物理路径
	currentNote,
	// 当前笔记内容（不一定是选中的笔记，也可能是新建的笔记）
	noteContent,
	// 是否正在输入
	inputting: false
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
			// let content = fs.readFileSync(path.join(NOTES_DIR, state.currentNotebook, action.value), 'utf8')
			let currentNote = path.join(NOTES_DIR, state.currentNotebook, action.value)
			localStorage.setItem('currentNote', currentNote)
			return Object.assign({}, state, {
				currentNote
			})
		// 输入文本
		case types.INPUT:
			return Object.assign({}, state, {
				noteContent: action.value,
				inputting: true
			})
		// 保存笔记
		case types.SAVE_NOTE:
			return Object.assign(state, {
				inputting: false,
				currentNote: action.value
			})
		// 新增笔记
		case types.ADD_NOTE:
			return Object.assign({}, state, {
				currentNote: '',
				noteContent: '',
				inputting: true
			})
		default:
			return state
	}
}

export default notes