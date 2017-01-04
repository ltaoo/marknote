// 暴露给所有子组件有 dispatch 的 store 对象
import {createStore, applyMiddleware} from 'redux'
// reducer
import rootReducer from '../reducers'
// redux 日志中间件
import createLogger from 'redux-logger'
// thunk
import thunk from 'redux-thunk'

export default createStore(rootReducer, applyMiddleware(thunk, createLogger()))