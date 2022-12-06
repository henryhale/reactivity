<p align="center"><img width="100px" alt="Reactivity" src="https://user-images.githubusercontent.com/92443116/199690375-adaec8cc-e426-4226-8a81-d7ee6fe4e1da.png"></p>
<h1 align="center">Reactivity</h1>

After completing my basic implementation of [render functions](https://github.com/henryhale/render-functions),
I went further to tap into **Reactive Programmming** using JavaScript basing on [_Vue's reactivity_](https://vuejs.org/guide/essentials/reactivity-fundamentals.html).

````js
 import { reactive } from "../lib/index.js"

 // App state
 const state = reactive({ count: 0 })

 // track `count` 
 watchEffect(() => console.log(`Count: ${state.count}`))

 // increment
 ++state.count
    // > Count: 1
 ++state.count
    // > Count: 2
````

## Live Demo

**Temperature Converter** -> [source code](./examples/03-temperature-converter/) -> [demo link](https://henryhale.github.io/reactivity/)

## Target Audience

This repository is not for beginners; it's targeted at intermediate or professional developers and programmers who want to take their JavaScript skills to the next level.

Some of the basics (like loops, conditionals, and closures) are not discussed at all.
If you find you need to brush up on some of those topics, refer to the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

> **NB:** Intermediate understanding of JavaScript and some of the latest ECMAScript Standards like classes, modules, shortcircuiting, and more.

## Before You Start

Modern JavaScript Frameworks have different implementations on gaining reactivity; common usecases include _DOM updates_ and _App state_.

I recommend that you check out how some modern frameworks implement reactivity; - [Vue](https://vuejs.org/guide/essentials/reactivity-fundamentals.html), - [Solid](https://www.solidjs.com/guides/reactivity), -[Svelte](https://svelte.dev/tutorial/reactive-assignments)

> **Warning:** No application should be built on top of this _Reactivity System_ as it is intended to be for learning or study purposes only.

## The Architecture Behind

My understanding of Reactive JavaScript is based on the idea that when the variable changes, all computations that depend on it get re-evaluated.

**_Example_**: Spreadsheets like Microsoft Excel use cell referencing such that if cell **A3** is the sum of cells **A1** and **A2**, then whenever cell **A1** or **A2** changes, the value of cell **A3** gets _re-evaluated_.

### Basic Implementation

- Inorder to gain reactivity, wrap the _initial value_ (primitive type) into an object with a _getter_ and a _setter_.
- In the getter, every time the value is accessed, we capture the active caller (a _subscriber/dependant_) to this value, and store it (as a subscriber to this value).
- In the setter, whenever the value is being changed, make the change, and then notify all _subscribers/dependants_ that the value is changed, so re-evaluate (update).
- Incase the initial value was an object, wrap the object in a _Proxy_ with set and get traps which work like getters and setters as described before.

## Features

>The naming of the building blocks is based on Vue's Reactivity. 

- **`watchEffect`**
  
  A function that opens a subcription to reactive values and so saves the action to be notified when updates occur

  Takes an `action` as an argument

   **Interface**

  ```ts
   watchEffect(action: function)
  ```

  We can watch all reactive value like `ref`, `computed` and properties of `reactive` objects

  How does `watchEffect` work, check it out [here](./lib/2-watchEffect.js)

- **`ref`**
  
  A function that creates a reactive object from a _primitive value_ either **string**, **number** or **null**

  Takes any _primitive type_ and return a _object_ with the `value` property

   **Interface**

  ```ts
   const variable_name = ref(value: string | number | null | undefined)
  ```

   Example

  ```js
   import { ref } from "../lib/index.js";

   // first name
   const firstName = ref("Brad")

   // read value 
   console.log(`My first name is ${firstName.value}.`)

   // watch firstName for changes
   watchEffect(() => {
      console.log(`Your first name has changed to ${firstName.value}`)
   })

   // change value
   firstName.value = "Henry"

   // change again
   firstName.value = "John"
  ```

  How does `ref` work, check it out [here](./lib/3-ref.js)

- **`computed`**
  
  A function that stores a value that re-calculates when it's dependencies get updated.

  > This is used in conjuction with other reactive values like `ref`, `reactive`

  Takes a _function_ as an argument and returns an object with **only** a getter for a `value` property

  **Interface**

  ```ts
   const variable_name = computed(action: function)
  ```

  **Example**

  ```js
   import { computed, ref, watchEffect } from "../lib/index.js";

   // cells A1 and A2
   const A1 = ref(1), 
         A2 = ref(2)

   // cell A3 - computed sum  
   const A3 = computed(() => A1.value + A2.value)

   // watch cell A3 for changes if either cell A1 or A2 changes
   watchEffect(() => {
      // read A3
      console.log(`A3 is ${A3.value}`)
   })

   // change cell A1 
   ++A1.value
      // logs > A3 is 4

   // change cell A2
   A2.value = 5
      // logs > A3 is 7 
  ```

  How does `computed` works, check it out [here](./lib/4-computed.js)

- **`reactive`**
  
  A function that creates a reactive object from only objects not arrays.

  Takes an `object` as argument and returns a proxy

  > Access of properties does not behave like `ref` or `computed`, they are accessed directly and still reactive.

  **Interface**

  ```ts
   const variable_name = reactive(obj?: any)
  ```

  **Example**

  ```js
   import { reactive } from "../lib/index.js";
   
   //app state
   const state = reactive({ count: 0 })

   // read a property
   console.log(`Count: ${state.count}`)
   // logs > Count: 0

   // change `count`
   ++state.count

   // read a property
   console.log(`Count: ${state.count}`)
   // logs > Count: 1
  ```

  > Note: Destructing objects causes a disconnection from reactivity since the properties are referenced in objects and so destruction assignment to a variable de-references the property from the reactive object

  How does `reactive` work, check it out [here](./lib/5-reactive.js)

## Building Blocks

> Source code contains comments that take you through what happens behind the scenes

To build it from scratch as you test each of the building blocks,
[**check out the source code**](./lib/).

## Examples

I have developed some basic examples to illustrate how reactivity can be useful.

````javascript
 import { ref, computed, watchEffect } from "../lib/index.js"

 // count 
 const count = ref(0)

 // double 
 const double = computed(() => 2 * count)

 // watch `count` and `double` for changes 
 watchEffect(() => {
   console.log(`Count: ${count.value}, Double: ${double.value}`)
 })

 // trigger changes
 ++count.value
   // logs > Count: 1, Double: 2
 ++count.value
   // logs > Count: 2, Double: 4
 ++count.value
   // logs > Count: 3, Double: 6

````
### More Examples

- [Counter](./examples/01-counter/)
- [Model Input](./examples/02-model-input/)
- [Temperature Converter](./examples/03-temperature-converter/)


## References

- [Rich Harris - Rethinking Reactivity](https://www.youtube.com/watch?v=AdNJ3fydeao)

- [Svelte 3: Rethinking Reactivity](https://svelte.dev/blog/svelte-3-rethinking-reactivity)

- [Ryan Solid - Fine grained reactivity](https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf)

- [Introduction to Reactivity with SolidJS](https://www.youtube.com/watch?v=J70HXl1KhWE)

- [SolidJS Basic Reactivity](https://www.solidjs.com/docs/latest/api)

## Thoughts

In case of any issues or inquiries about this, a pull request is welcome.

Thanks.
