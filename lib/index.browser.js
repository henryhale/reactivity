const isFunction = fn => typeof fn === 'function';

const isObject = obj => typeof obj === 'object' && obj !== null;

const defineKey = (obj, key, value, enumerable = true) => {
    if (!isObject(obj)) return;
    Object.defineProperty(obj, key, {
        value,
        writable: true,
        configurable: true,
        enumerable: !!enumerable
    });
};

const requests = (function (store = []) {
    return {
        add: req => !store.includes(req) && store.push(req),
        cleanup: () => store.pop(),
        get current () {
            return store[store.length - 1]
        }
    };
})();

class Subscribers {
    #store = []
    add (sub) {
        isFunction(sub) && !this.#store.includes(sub) && this.#store.push(sub);
    }
    notify () {
        this.#store.forEach(sub => sub.call());
    }
}

function watchEffect(action) {
    if (!isFunction(action)) return
    requests.add(action)
    try {
        action.call()
    } finally {
        requests.cleanup()
    }
}

function ref(value = null) {
    const subscribers = new Subscribers() 
    return {
        get value () {
            subscribers.add(requests.current)
            return value
        },
        set value (newValue) {
            value = newValue
            subscribers.notify()
        }
    } 
}

function computed (action) {
    const subscribers = new Subscribers()
    let result
    watchEffect(() => {
        try {
            isFunction(action) && (result = action.call())
        } finally {
            subscribers.notify()
        }
    })
    return {
        get value () {
            subscribers.add(requests.current)
            return result
        }
    }
}

function reactive (obj = {}) {
    function buildChannels(signal) {
        if (!isObject(signal)) {
            return new Subscribers()
        }
        const result = Object.create(null)
        Object.keys(signal).forEach(effect => {
            defineKey(result, effect, buildChannels(signal[effect]))
        })
        return result
    }
    function makeHandler (signal = {}, channel) {
        const channels = channel || buildChannels(signal)
        return {
            get (target, key) {
                if (isObject(target[key])) {
                    return new Proxy (target[key], makeHandler(target[key], channels[key]))
                }
                if (channels instanceof Subscribers) {
                    channels.add(requests.current)
                } else {
                    isObject(channels) && channels[key] && channels[key].add(requests.current)
                }
                return target[key]
            },
            set (target, key, value) {
                target[key] = value
                if (isObject(value)) {
                    channels[key] = buildChannels(value)
                } else {
                    channels[key] && channels[key].notify()
                }
                return true
            }
        }
    }
    return new Proxy(obj, makeHandler(obj))
}
