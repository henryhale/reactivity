import { defineKey, hasOwn, isObject } from "./0-helper.js";
import { requests, Subscribers } from "./1-global.js";
import { watchEffect } from "./2-watchEffect.js";

export function reactive (obj = {}) {

    function refFactory(value) {
        const subscribers = new Subscribers()
        return {
            get () {
                subscribers.add(requests.current)
                return value
            },
            set (newValue) {
                value = newValue
                subscribers.notify()
            }
        }
    }

    function buildChannel(signal) {
        if (!isObject(signal)) return refFactory(signal)
        // if (Array.isArray(signal)) return signal
        let result = Object.create(null)
        Array.isArray(signal) && defineKey(result, "$array", 1, false)
        Object.keys(signal).forEach(effect => {
            if (isObject(signal[effect])) {
                defineKey(result, effect, buildChannel(signal[effect], effect))
            } else {
                Object.defineProperty(result, effect, {
                    ...refFactory(signal[effect]),
                    enumerable: true
                })
            }
        })
        return result
    }

    function makeHandler() {
        return {
            get (target, key) {
                if (Reflect.has(target, key)) {
                    if (isObject(target[key])) {
                        return new Proxy(
                            hasOwn(target[key], "$array") ? Array.from({ ...target[key], length: Object.keys(target[key]).length }).map(x => refFactory(x)) : target[key], 
                            makeHandler()
                        )
                    }
                    return target[key]
                }
                return undefined
            },
            set (target, key, value) {
                if (Reflect.has(target, key)) {
                    target[key] = value
                } else {
                    Object.defineProperty(target, key, {
                        ...refFactory(value),
                        enumerable: true
                    })
                }
                return true
            }
        }
    }

    return new Proxy(buildChannel(obj), makeHandler())

}

const count = reactive({ p: [1] })
console.log(count.p[0] + 9);
watchEffect(() => console.log(count.p[0]));
++count.p[0]
++count.p[0]
++count.p[0]
++count.p[0]
// count.p.push(8)
// ++count.i
// ++count.i
// console.log(count);
// const state = reactive({
//     id: 0,
//     q: [{i: 1}],
//     profile: {
//         id: 1234,
//         name: "John"
//     },
//     settings: {
//         darkMode: false
//     }
// })
// console.log(state.q[0].i);
// watchEffect(() => console.log("I: ", state.q[0].i))
// ++state.q[0].i
// ++state.q[0].i
// ++state.q[0].i
// ++state.q[0].i
// ++state.q[0].i
// watchEffect(() => console.log("Name: ", state.profile.name))

// ++state.id
// ++state.id
// ++state.id

// state.profile.name = "Brad 1"
// state.profile.name = "Brad 2"
// state.profile.name = "Brad 3"
