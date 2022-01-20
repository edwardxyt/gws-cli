import * as React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface LoginProps {
    compiler: string;
    framework: string;
}

export default class Login extends React.Component<LoginProps, {}> {
    render() {
        return (
            <>
                <h1>login</h1>
                <h1>
                    Hello from{this.props.compiler}
                    {' '}
                    and{this.props.framework}
                    !
                </h1>
                <Chart/>
            </>
        );
    }
}

const options: Highcharts.Options = {
    title: {
        text: 'My chart'
    },
    series: [{
        type: 'line',
        data: [1, 2, 3]
    }]
}


const Chart = (props: HighchartsReact.Props) => <div>
    <HighchartsReact
        highcharts={Highcharts}
        options={options}
        {...props}
    />
</div>