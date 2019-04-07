import Utils from '../core/utils.js'
import assert from 'assert'


describe('Utils', function () {
    describe('urlQuery', function () {
        before(function () {
            global.window = {
                location: { search: '?p1=a&p2=b&p3&p4=true' }
            }
        })
        it('should parse parameters from url(location.search)', function () {
            let q = Utils.urlQuery

            assert.strictEqual('a', q.p1)
            assert.strictEqual('b', q.p2)
        })
        it('should setup default value to boolean type: true', function () {
            let q = Utils.urlQuery
            assert.strictEqual(true, q.p3)
            assert.strictEqual('true', q.p4)
        })
    })

    describe('format', function () {
        describe('price', function () {
            it('should be format price', function () {

                let p = Utils.format.price
                assert.strictEqual('0.1012', p(.10123, 4))
                assert.strictEqual('0.10', p(.1, 2))
                assert.strictEqual('0.12', p(.1201))
                assert.strictEqual('0.12', p(.1299, 2))
                assert.strictEqual('0', p(0))
                assert.strictEqual('1', p(1))
                assert.strictEqual('99', p(99))
                assert.strictEqual('100', p(100))
                assert.strictEqual('999', p(999))
                assert.strictEqual('1,000', p(1000))
                assert.strictEqual('1,234,567', p(1234567))
                assert.strictEqual('1,234,567,890', p(1234567890))
                assert.strictEqual('1,234.56', p(1234.567890))
                assert.strictEqual('1,234.5670', p(1234.567, 4))
            })
        })
    })
})
