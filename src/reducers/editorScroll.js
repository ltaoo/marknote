import * as types from '../actions'


const editorScroll = (state = {previewTop: 0}, action)=> {
	switch(action.type) {
		// 编辑区域滚动时，修改渲染区的高度
		case types.EDITOR_SCROLL:
			return Object.assign({}, state, {
				previewTop: action.value
			})
		default:
			return state
	}
}

export default editorScroll