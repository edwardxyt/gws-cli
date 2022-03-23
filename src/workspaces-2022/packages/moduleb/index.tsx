import React, { useState } from 'react';

const MB: React.FC<any> = (props) => {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(20);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

let year = 1958;

export { MB, year };