import Cache from '../core/cache.js'
import assert from 'assert'


describe('Cache', function () {

    before(function () {
    })

    it('should set and get value', function () {
        let cache = new Cache()

        cache.set('a', 1)
        cache.set('b', '2')
        cache.set(['a', 'b'], 'array key')

        console.log(cache.keys())
        console.log(cache.get('a'))

        assert.strictEqual(cache.get('a'), 1)
        assert.strictEqual(cache.get('b'), '2')
        assert.strictEqual(cache.get(['a', 'b']), 'array key')
        assert.strictEqual(cache.get('not exist'), null)
    })

    it('should set a value with expire time', function () {

        let cache = new Cache()

        cache.set('1s', 1, 1)

        assert.strictEqual(cache.get('1s'), 1)

        setTimeout(() => {
            assert.strictEqual(cache.get('1s'), null)
        }, 2)
    })

    it('should set a default value with expire time', function () {

        let cache = new Cache(1)

        cache.set('1s', 1)

        assert.strictEqual(cache.get('1s'), 1)

        setTimeout(() => {
            assert.strictEqual(cache.get('1s'), null)
        }, 2)
    })

})