import React, { useImperativeHandle, useRef } from 'react';

const FancyInput = React.forwardRef((props, ref) => {
    const inputRef: any = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
    }));

    return <input ref={inputRef} type="text" />;
});

const News = () => {
    const fancyInputRef: any = useRef();

    return (
        <div>
            <FancyInput ref={fancyInputRef} />
            <button onClick={() => fancyInputRef.current.focus()}>
                父组件调用子组件的 focus
            </button>
        </div>
    );
};

export default News;
