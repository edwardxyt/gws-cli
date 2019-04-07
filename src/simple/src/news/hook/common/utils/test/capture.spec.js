import { runInCatch, captureError } from '../core/capture.js'
import assert from 'assert'

class FakeRaven {
    constructor() {
        this.e = null
    }
    isSetup() {
        return true
    }
    captureException(e) {
        this.e = e
    }
}

describe('Capture', function () {
    describe('', function () {
        before(function () {
            global.Raven = new FakeRaven()
            global.window = {}
        })
        it('should have a function called runInCatch', () => {
            assert(typeof (runInCatch), 'function')
        })

        it('should have a function called captureError', () => {
            assert(typeof (captureError), 'function')
        })

        it('should capture a error', () => {
            let e = 'stamp string'
            captureError(e)

            assert.strictEqual(Raven.e, e)
        })


        it('should run in a catch', () => {
            let e = new Error('a error')
            runInCatch(() => {
                throw e
            })

            assert.strictEqual(Raven.e, e)
        })
    })
})