import { requests, Subscribers } from "./1-global.js";

/**
 * `ref` - creates a reactive object from a primitive value either string, number or null
 * 
 * @param {number | string | null} value 
 * @returns object { value }
 */
export function ref(value = null) {

    // Initiate a new subscribers instance 
    const subscribers = new Subscribers() 

    return {

        get value () {

            // capture the caller or `action` requesting for this value if any
            subscribers.add(requests.current)

            return value
        },

        set value (newValue) {

            // change the value
            value = newValue

            // then notify all subscribers to this value
            subscribers.notify()
        }

    } 

}
