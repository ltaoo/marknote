import * as types from '../actions'


const previewScroll = (state = {editorTop: 0}, action)=> {
	switch(action.type) {
		// 开始滚动
		// 渲染区域滚动
		case types.PREVIEW_SCROLL:
			return Object.assign({}, state, {
				editorTop: action.value
			})
		default:
			return state
	}
}

export default previewScroll