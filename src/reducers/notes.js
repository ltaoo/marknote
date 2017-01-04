import * as types from '../actions'
import fs from 'fs'

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

const initialValue = {
	notebooks
}

const notes = (state = initialValue, action)=> {
	switch(action.type) {
		case types.SCAN_DIR:
			return Object.assign({}, state, {
				notebooks: action.value
			})
		default:
			return state
	}
}

export default notes