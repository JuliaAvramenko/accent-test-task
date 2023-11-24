// Our component
const rangeNode = document.querySelector(".range")
const sliderOneNode = rangeNode.querySelector("#slider-1")
const sliderTwoNode = rangeNode.querySelector("#slider-2")
const displayInputOneNode = rangeNode.querySelector("#range-1")
const displayInputTwoNode = rangeNode.querySelector("#range-2")
const sliderTrack = document.querySelector(".range__slider-track")

// CSS variables
const circleDiameter = Number(getComputedStyle(document.body).getPropertyValue('--circle-diameter').replace('px', ''))
const sliderTrackLength = Number(getComputedStyle(document.body).getPropertyValue('--range-wrapper-width').replace('px', ''))

// Constants
const SLIDER_TRACK_MIN_VALUE = rangeNode.dataset.min
const SLIDER_TRACK_MAX_VALUE = rangeNode.dataset.max
const MIN_GAP = circleDiameter / sliderTrackLength * (SLIDER_TRACK_MAX_VALUE - SLIDER_TRACK_MIN_VALUE) + 15


function init() {
    sliderOneNode.min = SLIDER_TRACK_MIN_VALUE
    sliderOneNode.max = SLIDER_TRACK_MAX_VALUE
    sliderOneNode.value = rangeNode.dataset.startValue

    sliderTwoNode.min = SLIDER_TRACK_MIN_VALUE
    sliderTwoNode.max = SLIDER_TRACK_MAX_VALUE
    sliderTwoNode.value = rangeNode.dataset.endValue

    setCurrencyValue(displayInputOneNode, rangeNode.dataset.startValue)
    setCurrencyValue(displayInputTwoNode, rangeNode.dataset.endValue)

    window.onload = function () {
        fillColor()
    }
}

init()

sliderOneNode.addEventListener('input', slideOneInputHandler)
sliderTwoNode.addEventListener('input', slideTwoInputHandler)
displayInputOneNode.addEventListener("input", changeMinInputHandler)
displayInputTwoNode.addEventListener("input", changeMaxInputHandler)

displayInputOneNode.addEventListener("blur", (e) => {

    if (getCurrencyValue(displayInputOneNode) < SLIDER_TRACK_MIN_VALUE) {
        setCurrencyValue(displayInputOneNode, SLIDER_TRACK_MIN_VALUE)
    }

})
displayInputTwoNode.addEventListener("blur", (e) => {

    if (getCurrencyValue(displayInputTwoNode) > SLIDER_TRACK_MAX_VALUE) {
        setCurrencyValue(displayInputTwoNode, SLIDER_TRACK_MAX_VALUE)
    }

})

// Изменяем value для input
function setCurrencyValue(node, value) {
    node.value = `${value} ₽`
}

function getCurrencyValue(node) {
    const value = Number(node.value.replace(/[^0-9]/g, ''))
    return value
}

// Хендлеры для изменения инпутов

function changeMinInputHandler(e) {
    const value = getCurrencyValue(displayInputOneNode)
    setCurrencyValue(displayInputOneNode, value)

    if (value < SLIDER_TRACK_MIN_VALUE) {
        sliderOneNode.value = SLIDER_TRACK_MIN_VALUE
    }
    if (value <= Number(sliderTwoNode.value) - MIN_GAP) {
        sliderOneNode.value = value
        fillColor()
    }
}
function changeMaxInputHandler(e) {
    const value = getCurrencyValue(displayInputTwoNode)
    setCurrencyValue(displayInputTwoNode, value)

    if (value > SLIDER_TRACK_MAX_VALUE) {
        sliderTwoNode.value = SLIDER_TRACK_MAX_VALUE
    }

    if (value >= Number(sliderOneNode.value) + MIN_GAP) {
        sliderTwoNode.value = value
        fillColor()
    }
}


// Хендлеры для ползунков


function slideOneInputHandler() {
    if (Number(sliderTwoNode.value) - Number(sliderOneNode.value) <= MIN_GAP) {
        sliderOneNode.value = Number(sliderTwoNode.value) - MIN_GAP;
    }
    setCurrencyValue(displayInputOneNode, sliderOneNode.value)
    fillColor();
}


function slideTwoInputHandler() {
    if (Number(sliderTwoNode.value) - Number(sliderOneNode.value) <= MIN_GAP) {
        sliderTwoNode.value = Number(sliderOneNode.value) + MIN_GAP;
    }
    setCurrencyValue(displayInputTwoNode, sliderTwoNode.value)
    fillColor();
}

function fillColor() {
    percent1 = (sliderOneNode.value / SLIDER_TRACK_MAX_VALUE) * 100;
    percent2 = (sliderTwoNode.value / SLIDER_TRACK_MAX_VALUE) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #FFECBB ${percent1}% , #FDC840 ${percent1}% , #FDC840 ${percent2}%, #FFECBB ${percent2}%)`;
}


