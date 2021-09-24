import Countdown from './Countdown.js'

function updateTimer(verdict) {
  const countdown = setInterval(() => {
    const { total } = new Countdown(verdict)

    if (!total.filter(item => item !== 0)) {
      getDate()
      clearInterval(countdown)
    } else {
      renderTime(total)
    }
  }, 1000)
}

function renderTime(time) {
  const countdownContainer = document.querySelector('.countdown')
  const arrayTimers = Array.from(countdownContainer.children)

  arrayTimers.forEach((item, index) => {
    item.children[0].innerText = time[index]
  })
}

function getDate() {
  if (timeForChristmas._timeStampDiff < 0) {
    updateTimer(`24 december ${thisYear + 1} 23:59:59`)
  } else {
    updateTimer(`24 december ${thisYear} 23:59:59`)
  }
}

const thisYear = new Date().getFullYear()
const timeForChristmas = new Countdown(`24 december ${thisYear} 23:59:59`)

getDate()
