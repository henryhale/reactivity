import { isFunction } from "./0-helper.js";
import { requests, Subscribers } from "./1-global.js";
import { watchEffect } from "./2-watchEffect.js";


/**
 * `computed` - stores a value that re-calculates when it's dependencies get updated
 * @param {function} action 
 * @returns object { value }
 */
export function computed (action) {
    
    // Initiate a new subscribers instance 
    const subscribers = new Subscribers()
    
    // cache the value
    let result
    
    // open subscriptions to dependencies used to compute the `result`
    watchEffect(() => {

        try {

            // execute the `action` and then store the `result`
            isFunction(action) && (result = action.call())

        } finally {

            // then notify the subscribers when after the result is obtained
            subscribers.notify()

        }
    })

    return {
        get value () {

            // capture the caller or `action` requesting for this value if any
            subscribers.add(requests.current)
            
            return result
        }
    }
}

