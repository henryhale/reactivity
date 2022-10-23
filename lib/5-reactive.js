import { defineKey, isObject } from "./0-helper.js";
import { requests, Subscribers } from "./1-global.js";
// import { watchEffect } from "./2-watchEffect.js";

/**
 * `reactive` - creates a reactive object from only objects not arrays
 * 
 * @param {object} obj 
 * @returns Proxy
 */
export function reactive (obj = {}) {

    /**
     * Generate a new instance of Subscribers for primitives or a tree of instances for an object
     * @param {object | string | number | null} signal 
     * @returns Subscribers 
     */
    function buildChannels(signal) {
        
        // primitive `signal` gets a new instance
        if (!isObject(signal)) {
            return new Subscribers()
        }
        
        // pure & cleaner object for new tree of Subscribers instances
        const result = Object.create(null)
        
        // define the same key on the `result` and recursively `buildChannels` for it's value
        Object.keys(signal).forEach(effect => {
            defineKey(result, effect, buildChannels(signal[effect]))
        })
        
        // return a fully generated tree of subscribers instances
        return result

    }

    /**
     * Generate a Proxy handler with only set and get traps for an object - `signal`
     * @param {object} signal 
     * @param {object | Subscribers} channel 
     * @returns Proxy handler
     */
    function makeHandler (signal = {}, channel) {

        // store subscribers for the `signal` 
        const channels = channel || buildChannels(signal)

        // return a proxy handler
        return {

            // get trap
            get (target, key) {

                // incase of need for an object 
                if (isObject(target[key])) {

                    // proxify it and return
                    return new Proxy (target[key], makeHandler(target[key], channels[key]))

                }
                
                // incase of need for a primitive type
                // capture the caller or `action` requesting for this value if any
                if (channels instanceof Subscribers) {

                    // incase it is on the top level
                    channels.add(requests.current)

                } else {

                    // incase it was a nested object 
                    isObject(channels) && channels[key] && channels[key].add(requests.current)

                }

                // return the value
                return target[key]
            },

            // set trap
            set (target, key, value) {
                
                // change the value
                target[key] = value

                // incase the new value is an object
                if (isObject(value)) {

                    // build it a channel 
                    channels[key] = buildChannels(value)

                } else {

                    // then notify all subscribers to this value
                    channels[key] && channels[key].notify()
                    
                }

                // successful change
                return true
                
            }
        }
    }

    // initialize the target `obj`
    return new Proxy(obj, makeHandler(obj))

}

// const count = reactive({ i: { j: 5 }, k: 1, p: [] })
// count.i = { ...count.i, l: -3 }
// watchEffect(() => console.log("J: ", count.i.l));
// ++count.i.l
// ++count.i.l
// ++count.i.l
// const state = reactive({
//     id: 0,
//     profile: {
//         id: 1234,
//         name: "John"
//     },
//     settings: {
//         darkMode: false
//     }
// })

// watchEffect(() => console.log("Name: ", state.profile.name, "ID: ", state.id))

// ++state.id
// ++state.id
// ++state.id

// state.profile.name = "Brad 1"
// state.profile.name = "Brad 2"
// state.profile.name = "Brad 3"
