"use strict";
import React from "react";
import style from "./css.css";
// 公用属性
import commonStyle from "../../common/css/css.css";
import { observer, inject } from "mobx-react";

@inject("clickTimes")
@observer
class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {}
    _addHandle(num) {
        this.props.clickTimes.click(1);
    }
    render() {
        return (
            <React.Fragment>
                <div className={commonStyle.container}>
                    <div
                        className={commonStyle.index}
                        onClick={() => {
                            this._addHandle(1);
                        }}
                    >
                        <div className={style.icon} />
                        点击次数：{this.props.clickTimes.times}
                    </div>
                </div>
                <Hook />
            </React.Fragment>
        );
    }
}

class Hook extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>React Router 4 Hook 方法-Auth</div>;
    }
}
export default AuthComponent;
