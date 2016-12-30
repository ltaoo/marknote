import * as types from '../actions'


const scroll = (state = {editorTop: 10, previewTop: 0, current: 'editor'}, action)=> {
	switch(action.type) {
		// 开始滚动
		case types.START_SCROLL:
			return Object.assign({}, state, {
				current: action.value
			})
		// 编辑区域滚动时，修改渲染区的高度
		case types.EDITOR_SCROLL:
			return Object.assign({}, state, {
				previewTop: action.value,
				current: 'editor'
			})
		default:
			return state
	}
}

export default scroll