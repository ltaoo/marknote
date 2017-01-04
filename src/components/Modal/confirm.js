import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Dialog from './Modal';
import {
	getConfirmLocale
} from './locale';

export default function confirm(config) {
	const props = Object.assign({
		iconType: 'question-circle'
	}, config);
	const prefixCls = props.prefixCls || 'ant-confirm';
	// 创建节点并插入
	let div = document.createElement('div');
	document.body.appendChild(div);

	let width = props.width || 416;
	let style = props.style || {};

	// 默认为 true，保持向下兼容
	if (!('okCancel' in props)) {
		props.okCancel = true;
	}

	const runtimeLocale = getConfirmLocale();

	props.okText = props.okText ||
		(props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
	props.cancelText = props.cancelText || runtimeLocale.cancelText;

	function close() {
		const unmountResult = ReactDOM.unmountComponentAtNode(div);
		if (unmountResult && div.parentNode) {
			div.parentNode.removeChild(div);
		}
	}

	let body = (
		<div className={`${prefixCls}-body`}>
      		<span className={`${prefixCls}-title`}>{props.title}</span>
      		<div className={`${prefixCls}-content`}>{props.content}</div>
    	</div>
	);
	

	ReactDOM.render(
		<Dialog
      		className= "modal"
      		onCancel={close}
      		visible
      		title=""
      		transitionName="zoom"
      		footer=""
      		maskTransitionName="fade"
      		maskClosable={false}
      		style={style}
      		width={width}
    	>
	      	<div className= "modal__content">
	        	{body}
	      	</div>
    	</Dialog>, div);

	return {
		destroy: close,
	};
}