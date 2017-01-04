import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import {Provider} from 'react-redux'
// 路由配置
import routes from './routes'
// 返回一个有 dispatch 方法的对象
import store from './store/index'

ReactDOM.render(
	<Provider store = {store}>
		<Router history={hashHistory} routes={routes} />
	</Provider>,
  	document.getElementById('app')
)
