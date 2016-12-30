import { combineReducers } from 'redux'

import input from './input'
import scroll from './scroll'

const index = combineReducers({
	input,
	scroll
})

export default index