import { runInCatch } from './capture.js';

function DOMReadyMethodFactory(window, document) {

    let readyList = []
    let isReady = false

    let go = () => {
        readyList.forEach(cb => {
            runInCatch(() => {
                if (typeof (cb) === 'undefined')
                    throw new Error(`${cb} is undefined`);
                if (typeof (cb) !== 'function')
                    throw new Error(`${cb} is not a function`);
                cb()
            })
        })
    }

    let ready = () => {
        isReady = true
        document.removeEventListener("DOMContentLoaded", ready, false)
        window.removeEventListener("load", ready, false)
        go()
    }

    let DOMReady = cb => isReady ? runInCatch(cb) : readyList.push(cb);

    DOMReady.getStatus = () => ({
        isReady: isReady,
        readyList: readyList
    })

    if (document.readyState === "complete") {
        isReady = true
    } else {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", ready, false);
        // A fallback to window.onload, that will always work
        window.addEventListener("load", ready, false);
    }

    return DOMReady
}

export default DOMReadyMethodFactory
