import React from "react";

class A extends React.Component {
    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {}

    render() {
        return <div>这里是A</div>;
    }
}

export default A;
