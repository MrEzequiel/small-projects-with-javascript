'use strict;'

let timer = null

let time = 0
let seconds = 0
let minutes = 0

const minutesStopwatch = document.querySelector('.minutes')
const secondsStopwatch = document.querySelector('.seconds')
const milisecondsStopwatch = document.querySelector('.miliseconds')

const toggleButton = document.querySelector('.start')
const resetButton = document.querySelector('.reset')

const render = {
  stopwatch() {
    milisecondsStopwatch.innerHTML = `${time}`
    secondsStopwatch.innerHTML = `${seconds}`
    minutesStopwatch.innerHTML = `${minutes}`
  },
  clearStopwatch() {
    milisecondsStopwatch.innerHTML = '00'
    secondsStopwatch.innerHTML = '00'
    minutesStopwatch.innerHTML = '00'
  }
}

const stopwatch = () => {
  const fixNumber = number => number.toString().padStart(2, '0')

  time++

  if (time == 100) {
    time = 0
    seconds++
  } else if (seconds == 60) {
    seconds = 0
    minutes++
  }

  time = fixNumber(time)
  seconds = fixNumber(seconds)
  minutes = fixNumber(minutes)

  render.stopwatch()
}

toggleButton.addEventListener('click', e => {
  if (e.target.innerHTML === 'Start') {
    timer = setInterval(stopwatch, 10)
    e.target.innerHTML = 'Pause'
  } else {
    e.target.innerHTML = 'Start'
    clearInterval(timer)
  }
})

resetButton.addEventListener('click', () => {
  render.clearStopwatch()
  time = 0
  seconds = 0
  minutes = 0
  clearInterval(timer)
})
