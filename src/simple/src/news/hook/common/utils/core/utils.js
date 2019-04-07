function cookie() {
    let c = document.cookie, r = {};
    if (c === '') return r
    c.split(';').forEach((kv) => {
        let t = kv.trim().split('=');
        if(t[1]) r[t[0]] = t[1];
    });
    return r;
}

cookie.get = k => cookie()[k]

cookie.set = (k, v, expires = "Sun, 31 Jan 2100 16:00:00 GMT") => {
    console.log('set cookie', k, v)
    document.cookie = `${k}=${escape(v)};path=/;expires=${expires}`
}

cookie.delete = k => {
    cookie.set(k, '', 'Thu, 01 Jan 1970 00:00:01 GMT')
}


export default class Utils {
    static format = {

        /*
        n is origin price number,
        precision is a Number type, proclaim how many decimal to keep
        */
        price(n, precision) {
            let s = String(n), int = parseInt(n).toString(), pre = s.split('.')[1];
            let start = int.length % 3;

            let r = s.substr(0, start)

            for (let i = start; i < int.length; i += 3) {
                r += (r.length ? ',' : '') + int.substr(i, 3)
            }

            if (pre) {
                r += '.' + `${pre}000000`.substr(0, precision || 2)
            } else if (precision) {
                r += '.' + '000000'.substr(0, precision || 2)
            }

            return r
        }
    }

    static get urlQuery() {
        let s = window.location.search;
        if (s.indexOf('?') == 0) s = s.substr(1);
        if (s.indexOf('#') >= 0) s = s.substr(0, s.indexOf('#'));

        let r = {};
        s.split('&').forEach(function (kv) {
            let t = kv.split('=');
            if (t[0]) r[t[0]] = t[1] ? decodeURIComponent(t[1]) : true;
        });
        return r
    }

    static get hashQuery() {
        let h = window.location.hash;
        if (h.indexOf('?') > -1) h = h.substr(h.indexOf('?') + 1);

        let r = {};
        h.split('&').forEach(function (kv) {
            let t = kv.split('=');
            if (t[0]) r[t[0]] = t[1] ? decodeURIComponent(t[1]) : true;
        });
        return r
    }

    static Cookie = cookie

    static get docCookie() {
        let c = document.cookie, r = {};
        if (c === '') return r
        c.split(';').forEach((kv) => {
            let t = kv.trim().split('=');
            r[t[0]] = t[1];
        });
        return r;
    }

    loadScript = function (src) {
        let script = document.createElement('script')
        script.src = src
        return new Promise((resolve, _) => {
            document.head.appendChild(script)
            script.onload(() => resolve(script))
        })
    }
}
