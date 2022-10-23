import { computed, ref, watchEffect } from "../../lib/index.js";

const [heading, input, comment] = ["heading", "input", "comment"].map(el => document.getElementById(el))

const text = ref("Hello, World!")

const hasHeading = computed(() => text.value ? ":) You have a heading" : ":( No heading")

watchEffect(() => heading.textContent = text.value)

watchEffect(() => comment.textContent = hasHeading.value)

input.value = text.value

input.addEventListener('input', e => (text.value = e.target.value) )
