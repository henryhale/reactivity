
# Reactivity - The Building Blocks

I used a _layered approach_ to setup the building blocks following the naming in ascending order; zero (0) through five (5).

- [0-helper.js](./0-helper.js)
- [1-global.js](./1-global.js)
- [2-watchEffect.js](./2-watchEffect.js)
- [3-ref.js](./3-ref.js)
- [4-computed.js](./4-computed.js)
- [5-reactive.js](./5-reactive.js)

Bundled files composed of all layers;
- [index.browser.js](./index.browser.js)
- [index.js](./index.js)

> Each file serves a particular functionality and is built on top of the one(s) before it.

## [0-helper.js](./0-helper.js)

In this module, there exists three functions to that will basically help provide quick evaluation and less repetition throughout the build.

## [1-global.js](./1-global.js)

At the global context, there exists a global store for requests or subscriptions to reactive values and a reusable _Subscribers_ class that will keep track of dependencies.

## [2-watchEffect.js](./2-watchEffect.js)

A function that exposes the caller or subscriber to the global context such that it can be captured (for subscriptions) exists in this module.

## [3-ref.js](./3-ref.js)

Primitive values like strings or numbers lie at the endpoints of referencial types like objects. In this module, a primitive value is made reactive by wrapping it into an _object_ with a _value_ property

## [4-computed.js](./4-computed.js)

Most values depend on other values or computations and so a change in one must trigger a re-computation to all values depending on it, these are computed values

## [5-reactive.js](./5-reactive.js)

Since normal objects are like trees whose end nodes are primitive values, their can be reactive too. In this module, the object is wrapped under a proxy and supplied with set and get traps to track primitive values

## Bundled files 

### [index.browser.js](./index.browser.js)

This file is meant for use in browsers that don't support ES6 modules. It includes all necessary functions required to run all code samples.

### [index.js](./index.js)

In browsers that support ES6 modules, I recommend using this module.

## Happy Coding :)

>Source code contains comments that might briefly explain whats happening behind the scenes.
