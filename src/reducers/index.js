import { combineReducers } from 'redux'

import input from './input'
import editorScroll from './editorScroll'
import previewScroll from './previewScroll'
import common from './common'
import notes from './notes'

const index = combineReducers({
	input,
    // 编辑区域滚动
	editorScroll,
    // 预览区域滚动
	previewScroll,
    // 公共的一些状态
    common,
    // 笔记
    notes
})

export default index