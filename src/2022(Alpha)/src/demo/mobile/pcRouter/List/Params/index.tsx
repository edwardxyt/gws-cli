// 这是接收参数的详情页
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

interface IProps {
    params: any;
}

//利用hoc解决  当然如果不喜欢这种嵌套可以取出来
function Params(props) {
    let params = useParams();

    class P extends Component<IProps, {}> {
        componentDidMount() {
            console.log('params:', this.props.params);
        }

        render() {
            return <span>id: {this.props.params.params.id}</span>;
        }
    }

    return <P params={{ params }} {...props}></P>;
}

export default Params;
