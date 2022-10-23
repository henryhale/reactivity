/**
 * 
 *  HELPER FUNCTIONS
 * 
 */

/**
 * Check whether `fn` is a function
 * @param {*} fn 
 * @returns Boolean
 */
export const isFunction = fn => typeof fn === 'function' 

/**
 * Check whether `obj` is an object
 * @param {*} obj 
 * @returns Boolean
 */
export const isObject = obj => typeof obj === 'object' && obj !== null

/**
 * Add a property to an object
 * @param {*} obj 
 * @param {*} key 
 * @param {*} value 
 * @param {*} enumerable 
 * @returns 
 */
export const defineKey = (obj, key, value, enumerable = true) => {
    if (!isObject(obj)) return
    Object.defineProperty(obj, key, {
        value,
        writable: true,
        configurable: true,
        enumerable: !!enumerable
    })
}
