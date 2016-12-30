import * as types from '../actions'


const previewScroll = (state = {previewTop: 0, current}, action)=> {
	switch(action.type) {
		// 开始滚动
		case types.START_SCROLL:
			return Object.assign({}, state, {
				current: action.value
			})
		// 渲染区域滚动
		case types.PREVIEW_SCROLL:
			return Object.assign({}, state, {
				editorTop: action.value,
				current: 'preview'
			})
		default:
			return state
	}
}

export default previewScroll