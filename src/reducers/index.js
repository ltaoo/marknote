import { combineReducers } from 'redux'

import input from './input'
import scroll from './scroll'
import previewScroll from './previewScroll'

const index = combineReducers({
	input,
	scroll,
	previewScroll
})

export default index