import * as types from '../actions'


const input = (state = {source: ""}, action)=> {
	switch(action.type) {
		case types.INPUT:
			return Object.assign({}, state, {
				source: action.value
			})
		case types.REMOVE:
			return Object.assign({}, state, {
				source: state.source.slice(state.source.length-1)
			})
		default:
			return state
	}
}

export default input