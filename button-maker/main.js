const controls = document.querySelector('#controls')
const cssText = document.querySelector('.css-result')
const buttonResult = document.querySelector('.button')
const copyButton = document.querySelector('.copy')

const handleStyle = {
  element: buttonResult,

  backgroundColor(value) {
    this.element.style.backgroundColor = value
  },
  color(value) {
    this.element.style.color = value
  },
  height(value) {
    this.element.style.height = value + 'px'
  },
  width(value) {
    this.element.style.width = value + 'px'
  },
  text(value) {
    this.element.innerText = value
  },
  border(value) {
    this.element.style.border = value
  },
  borderRadius(value) {
    this.element.style.borderRadius = value + 'px'
  },
  fontSize(value) {
    this.element.style.fontSize = value + 'px'
  },
  fontFamily(value) {
    this.element.style.fontFamily = value
  }
}

const copyCss = () => {
  let inputCopy = document.createElement('input')
  let boxAlert = document.querySelector('.animation-copy')

  inputCopy.value = cssText.innerText

  document.body.appendChild(inputCopy)
  inputCopy.select()
  document.execCommand('copy')

  document.body.removeChild(inputCopy)

  boxAlert.classList.add('active')
  let interval = setTimeout(() => {
    boxAlert.classList.add('remove-animation')
    setTimeout(() => {
      boxAlert.classList.remove('remove-animation')
      boxAlert.classList.remove('active')
    }, 1000)
  }, 1000)
}

const showCss = () => {
  const css = buttonResult.style.cssText.split('; ')

  const cssTextFormat = css.reduce((acc, item) => {
    item = '<strong>' + item.split(': ').join(': </strong>')

    item.includes(';')
      ? (acc += `<span>${item}</span>`)
      : (acc += `<span>${item};</span>`)

    return acc
  }, '')

  cssText.innerHTML = cssTextFormat
}

const saveValue = (name, value) => {
  localStorage[name] = value
}

const setValues = () => {
  const propreties = Object.keys(localStorage)
  propreties.forEach(propretie => {
    handleStyle[propretie](localStorage[propretie])
    controls.elements[propretie] = localStorage[propretie]
  })
  showCss()
}

const handleChange = e => {
  const name = e.target.name
  const value = e.target.value

  handleStyle[name](value)
  saveValue(name, value)
  showCss()
}

controls.addEventListener('change', handleChange)
copyButton.addEventListener('click', copyCss)
setValues()
