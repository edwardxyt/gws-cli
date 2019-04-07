
import assert from 'assert'
import DOMReadyMethodFactory from '../core/dom-ready-factory.js'


describe('DOMReadyFactory', function () {

    describe('DOM is not ready', function () {

        before(function () {
            global.document = {
                readyState: 'pending',
                addEventListener: (name, fn, bool) => 'DOMContentLoaded',
                removeEventListener: (name, fn, bool) => 'load',
            }
            global.window = {
                addEventListener: (name, fn, bool) => 'DOMContentLoaded',
                removeEventListener: (name, fn, bool) => 'load',
            }
        })

        it('save ready callback to ready list', function () {
            let DOMReady = new DOMReadyMethodFactory(document, window)

            let callback_count = 0

            DOMReady(() => {
                callback_count++
            })

            assert.equal(callback_count, 0)

            DOMReady(() => {
                callback_count++
            })

            assert.equal(callback_count, 0)

            setTimeout(() => assert.equal(callback_count, 0), 200)
        })

    })

    describe('DOM is already complete', function () {

        before(function () {
            global.document = {
                readyState: 'complete',
                addEventListener: (name, fn, bool) => 'DOMContentLoaded',
                removeEventListener: (name, fn, bool) => 'load',
            }
            global.window = {
                addEventListener: (name, fn, bool) => 'DOMContentLoaded',
                removeEventListener: (name, fn, bool) => 'load',
            }
        })

        it('save ready callback to ready list', function () {
            let DOMReady = new DOMReadyMethodFactory(document, window)

            let callback_count = 0

            DOMReady(() => {
                callback_count++
            })

            DOMReady(() => {
                callback_count++
            })

            setTimeout(() => assert.equal(callback_count, 2), 200)
        })

    })

    describe('DOM is not ready first, but complete later', function () {

        before(function () {
            global.document = {
                readyState: 'complete',
                addEventListener: (name, fn, bool) => {
                    setTimeout(fn, 100)
                },
                removeEventListener: (name, fn, bool) => 'load',
            }
            global.window = {
                addEventListener: (name, fn, bool) => 'DOMContentLoaded',
                removeEventListener: (name, fn, bool) => 'load',
            }
        })

        it('save ready callback to ready list', function () {
            let DOMReady = new DOMReadyMethodFactory(document, window)

            let callback_count = 0

            DOMReady(() => {
                callback_count++
            })

            setTimeout(() => assert.equal(callback_count, 0), 50)
            setTimeout(() => assert.equal(callback_count, 1), 200)
        })

    })


})