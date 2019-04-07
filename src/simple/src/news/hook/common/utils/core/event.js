
class Event {

    constructor() {
        this.event_map = {}
    }

    touchBottom(cb) {
        if (this.event_map['touch_bottom_fn'])
            throw ('duplicated event listener on slide up');

        let fn = () => {
            //判断滚动条滚到了网页最底部
            if (window.innerHeight + document.body.scrollTop + document.documentElement.scrollTop + 50 >
                document.body.scrollHeight) {
                if (this.event_map['touch_bottom_status'] == 'running') return;
                this.event_map['touch_bottom_status'] = 'running';
                cb(() => setTimeout(() => {
                    this.event_map['touch_bottom_status'] = 'ready'
                }, 300))
            }
        };
        this.event_map['touch_bottom_fn'] = fn;
        window.addEventListener("scroll", fn, false);
    }

    cancelTouchBottom() {
        window.removeEventListener('scroll', this.event_map['touch_bottom_fn']);
        this.event_map['touch_bottom_fn'] = null;
    }
}

export default new Event()
