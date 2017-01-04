import * as types from '../actions'

let path = localStorage.getItem('note_dir') || ''

const drop = (state = {path}, action)=> {
	switch(action.type) {
		case types.SET_PATH:
			return Object.assign({}, state, {
				path: action.value
			})
		default:
			return state
	}
}

export default drop