import * as types from '../actions'


const input = (state = {source: ''}, action)=> {
	switch(action.type) {
		case types.INPUT:
			return Object.assign({}, state, {
				source: action.value
			})
		default:
			return state
	}
}

export default input