export default class Cache {
    constructor(default_seconds = null) {
        this.default_seconds = default_seconds
        this.data = {}
    }

    _string_key = k => JSON.stringify(k);


    keys = () => {
        return Object.keys(this.data)
    }

    get = k => {
        let obj = this.data[this._string_key(k)]
        return (obj && obj.expired_at > (new Date()).getTime()) ? obj.value : null
    }

    set = (k, v, seconds = Infinity) => {
        if (this.default_seconds && seconds === Infinity)
            seconds = this.default_seconds

        this.data[this._string_key(k)] = {
            value: v,
            expired_at: (new Date()).getTime() + (seconds * 1000)
        }
    }

    clear = () => {
        this.data = {}
    }
}

