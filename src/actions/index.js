export const INPUT = 'INPUT'
export const EDITOR_SCROLL = 'EDITOR_SCROLL'
export const PREVIEW_SCROLL = 'PREVIEW_SCROLL'

export const START_SCROLL = 'START_SCROLL'
export const EDITOR_START_SCROLL = 'EDITOR_START_SCROLL'
export const PREVIEW_START_SCROLL = 'PREVIEW_START_SCROLL'

export function input(value) {
	return {
		type: INPUT,
		value
	}
}
// 编辑区域滚动
export function editorScroll(value) {
	return {
		type: EDITOR_SCROLL,
		value
	}
}
// 渲染区域滚动
export function previewScroll(value) {
	return {
		type: PREVIEW_SCROLL,
		value
	}
}

export function startScroll(value) {
	return {
		type: START_SCROLL,
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