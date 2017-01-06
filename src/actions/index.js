// 输入
export const INPUT = 'INPUT'
export function input(value) {
	// 写入缓存
	localStorage.setItem('note', value)
	return {
		type: INPUT,
		value
	}
}
// 开始滚动，用以获取当前是编辑区滚动还是预览区滚动
export const START_SCROLL = 'START_SCROLL'
export function startScroll(value) {
	return {
		type: START_SCROLL,
		value
	}
}
// 编辑区域滚动
export const EDITOR_SCROLL = 'EDITOR_SCROLL'
// export const EDITOR_START_SCROLL = 'EDITOR_START_SCROLL'
export function editorScroll(value) {
	return {
		type: EDITOR_SCROLL,
		value
	}
}
// 渲染区域滚动
export const PREVIEW_SCROLL = 'PREVIEW_SCROLL'
// export const PREVIEW_START_SCROLL = 'PREVIEW_START_SCROLL'
export function previewScroll(value) {
	return {
		type: PREVIEW_SCROLL,
		value
	}
}

// 从指定目录读取笔记
export const SCAN_NOTES = 'SCAN_NOTES'
export function scanNotes(value) {
	return {
		type: SCAN_NOTES,
		value
	}
}

// 选择笔记本
export const CHOOSE_NOTEBOOK = 'CHOOSE_NOTEBOOK'
export function chooseNotebook(value) {
	localStorage.setItem('currentNotebook', value)
	return {
		type: CHOOSE_NOTEBOOK,
		value
	}
}

// 选择笔记
export const CHOOSE_NOTE = 'CHOOSE_NOTE'
export function chooseNote(value) {
	return {
		type: CHOOSE_NOTE,
		value
	}
}

// 保存笔记
export const SAVE_NOTE = 'SAVE_NOTE'
export function saveNote(value) {
	return {
		type: SAVE_NOTE,
		value
	}
}

// 添加笔记
export const ADD_NOTE = 'ADD_NOTE'
export function addNewNote() {
	// 添加笔记前，清空缓存
	localStorage.setItem('note', '')
	localStorage.setItem('currentNote', '')
	return {
		type: ADD_NOTE
	}
}