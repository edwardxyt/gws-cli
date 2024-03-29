import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as React from 'react';
import styles from './login.module.less';

var foo = (x: number) => {
    x = 10 + x;
    console.log(x);
};
foo(100);

interface LoginProps {
    compiler: string;
    framework: string;
}

export default class Login extends React.Component<LoginProps, {}> {
    constructor(props: any) {
        super(props);
        console.log(this.props);
        console.log('styles', styles);
    }

    render() {
        return (
            <>
                <h1 className={styles.hone}>
                    wo de \n
                    <span className={styles.tow}>login</span>
                </h1>
                <h1>
                    Hello from{this.props.compiler} and{this.props.framework}!
                </h1>
                <Chart />
            </>
        );
    }
}

const options: Highcharts.Options = {
    title: {
        text: 'My chart',
    },
    series: [
        {
            type: 'line',
            data: [1, 2, 3],
        },
    ],
};

const Chart = (props: HighchartsReact.Props) => (
    <div>
        <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </div>
);
