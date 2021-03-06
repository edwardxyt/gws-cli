'use strict'
import React from 'react'

import commonStyle from '../../common/css/css.css'
import './css.css'
import Icon from '../../image/icon.svg'
import { observer, inject } from 'mobx-react'

@inject('fetchData', 'loadStore') @observer class Component extends React.Component {
	constructor(props) {
		super(props)
	}
	UNSAFE_componentWillMount() {}
	_addHandle() {
		let { fetchOperate } = this.props.fetchData
		fetchOperate()
	}
	componentDidUpdate() {
		let { control } = this.props.loadStore
		if (this.props.fetchData.state == 1) {
			control(true)
		} else {
			control(false)
		}
	}
	_renderData() {
		let { fetchData } = this.props
		let { data, state } = fetchData

		if (state == 0) {
			return ("点击发送请求")
		} else if (state == 1) {
			return ("正在请求")
		} else if (state == 2 && data != null) {
			return (data)
		} else if (state == -1) {
			return ("请求出错")
		}
	}
	render() {
		return (
			<div className ="container">
				<div className="index" onClick={()=>{this._addHandle()}}>
				<img src={Icon}  className="icon" />
				{this._renderData()}
				</div>
			</div>
		)
	}
}


export default Component
