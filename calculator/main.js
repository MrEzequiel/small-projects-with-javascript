'use strict'

const numbers = document.querySelectorAll('.controls .number')
const operators = document.querySelectorAll('.controls [data-button]')
const screen = document.querySelector('.screen')

let currentNumber = ''
let thisOperation = ''
let lastNumber = null
let isNewNumber = true

const render = number => (screen.innerText = number)

const handleClickOperator = e => {
  console.log()
}

const handleClick = e => {
  if (isNewNumber) {
    const number = e.target.innerText
    currentNumber += number
    render(currentNumber)
  }
}

numbers.forEach(number => {
  number.addEventListener('click', handleClick)
})

operators.forEach(operator => {
  operator.addEventListener('click', handleClickOperator)
})
