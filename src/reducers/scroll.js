import * as types from '../actions'


const scroll = (state = {top: 0}, action)=> {
	switch(action.type) {
		case types.SCROLL:
			return Object.assign({}, state, {
				top: action.value
			})
		default:
			return state
	}
}

export default scroll