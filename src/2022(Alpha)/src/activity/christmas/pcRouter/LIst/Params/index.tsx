// 这是接收参数的详情页
import React, { Component,useImperativeHandle } from 'react'
import { useParams } from "react-router-dom";

//利用hoc解决  当然如果不喜欢这种嵌套可以取出来
function Params(props) {
    let params = useParams()
    class P extends Component {
        componentDidMount() {
            console.log('params:', this.props.params);
        }
        render() {
            return (
                <span></span>
            );
        }
    }
    return (
        <P params={{params}} {...props}></P>
    );
}



export default Params