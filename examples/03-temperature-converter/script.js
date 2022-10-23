import { computed, reactive, watchEffect } from "../../lib/index.js";

const [appTitle, cInput, fInput, tempTxt] = ["appTitle", "c-input", "f-input", "tempTxt"].map(el => document.getElementById(el))

const state = reactive({
    app: {
        title: "Temperature Converter"
    },
    temp: {
        c: 0,
        f: 32
    }
})

const tempText = computed(() => `${state.temp.c} <sup>0</sup>C  =  ${state.temp.f} F`)

function setC(value) {
    state.temp.c = value
    state.temp.f = value * (9 / 5) + 32
}
  
function setF(value) {
    state.temp.f = value
    state.temp.c = (value - 32) * (5 / 9)
}

watchEffect(() => appTitle.textContent = state.app.title)

watchEffect(() => cInput.value = state.temp.c)

watchEffect(() => fInput.value = state.temp.f)

watchEffect(() => tempTxt.innerHTML = tempText.value)

cInput.addEventListener('input', e => setC(e.target.value))

fInput.addEventListener('input', e => setF(e.target.value))
