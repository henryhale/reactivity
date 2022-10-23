import { isFunction } from "./0-helper.js"

import { requests } from "./1-global.js"

/**
 * `watchEffect` - opens a subcription to reactive values and so saves the `action` to be notified when updates occur
 * 
 *  If the `action` is a function, execute it so that it is captured and 
 *  stored by reactive getters in `ref`, `computed`, `reactive` 
 * @param {function} action 
 * @returns
 */
export function watchEffect(action) {

    // action must be a function, otherwise EXIT
    if (!isFunction(action)) return

    // add the `action` into the `requests` for later subscriptions
    requests.add(action)

    try {

        // call the `action` so that its can be captured by reactive getters
        action.call()

    } finally {

        // give room for other actions 
        requests.cleanup()

    }

}
