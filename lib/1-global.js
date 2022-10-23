import { isFunction } from "./0-helper.js"

/**
 * 
 *   GLOBALS 
 * 
 * 
*/

/**
 * `requests` - a global storage (Stack) for capturing, retrieving and removing watchers 
 */
export const requests = (function (store = []) {
    return {

        /**
         * Add a `req` - request on top of the  `store` - stack 
         */
        add: req => !store.includes(req) && store.push(req),

        /**
         * Remove the executed `req` on top of the `store` - stack 
         * @returns 
         */
        cleanup: () => store.pop(),

        /**
         * Access the most recently added request in the store
         */
        get current () {
            return store[store.length - 1]
        }
    }
})()

/**
 * `Subscriber` - a class based on the Observer Pattern to store `sub` and notify them by calling each.
 */
export class Subscribers {
    
    /**
     * Record list
     */
    #store = []

    /**
     * Add a new `sub` - subscriber (must be a function)
     * @param {functon} sub 
     */
    add (sub) {
        isFunction(sub) && !this.#store.includes(sub) && this.#store.push(sub)
    }

    /**
     * Method to notify all subscribers when an update is made by calling each 
     */
    notify () {
        this.#store.forEach(sub => sub.call())
    }
}
