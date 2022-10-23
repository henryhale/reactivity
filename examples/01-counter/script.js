import { ref, watchEffect } from "../../lib/index.js";

const btn = document.getElementById("btn");

const count = ref(0)

watchEffect(() => {
    btn.textContent = `Count: ${count.value}`
})

btn.addEventListener('click', () => ++count.value)
