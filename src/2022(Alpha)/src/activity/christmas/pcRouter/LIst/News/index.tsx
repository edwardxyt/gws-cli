import React, { useRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

const FancyInput = React.forwardRef((props, ref) => {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));

    return <input ref={inputRef} type="text" />
});

const News = props => {
    const fancyInputRef = useRef();

    return (
        <div>
            <FancyInput ref={fancyInputRef} />
            <button
                onClick={() => fancyInputRef.current.focus()}
            >父组件调用子组件的 focus</button>
        </div>
    )
}

export default News