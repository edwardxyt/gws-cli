import './index.less';

import { Button } from 'antd';
import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom';

import PcRouter from './router/index';

import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
    {
        name: 'pj1',
        entry: '//pj1.xiayuting.cc',
        container: '#container',
        activeRule: '/pj1',
    },
]);
// 启动 qiankun
// start({ singular: false });

// const PcRouter: React.FC<any> = () => {
//     useEffect(() => {
//         console.log(111);
//     }, []);
//     return (
//         <div>
//             <Button type="primary">Primary Button</Button>
//         </div>
//     );
// };

ReactDOM.render(<PcRouter />, document.getElementById('main'));
