import * as types from '../actions'


const common = (state = {current: 'editor'}, action)=> {
    switch(action.type) {
        // 编辑区域滚动时，修改渲染区的高度
        case types.START_SCROLL:
            return Object.assign(state, {
                current: action.value
            })
        default:
            return state
    }
}

export default common