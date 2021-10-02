const form = document.querySelector('#form')
const fields = document.querySelectorAll('input')

class Validation {
  constructor(el) {
    this.element = el
    this.textInput = el.value
    this.typeInput = el.name

    this.regexp = {
      cep: /\d{5}[-\s]?\d{3}/g,
      cpf: /(?:\d{3}[-.\s]?){3}\d{2}/g,
      email: /[\w.-]+@[\w-]+\.[\w-.]+/gi,
      clear: /\D/g
    }

    this.regexpFormat = {
      cpf: [/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'],
      cep: [/(\d{5})(\d{3})/g, '$1-$2']
    }
  }

  isEmpty = () => this.textInput.trim() === ''

  isMatch() {
    const match = this.textInput.match(this.regexp[this.typeInput])

    if (!match || match[0] !== this.textInput) {
      return false
    } else {
      return true
    }
  }

  validPassword() {
    let obligationsList = document.querySelectorAll('.obligations li')
    obligationsList = [...obligationsList]

    obligationsList.forEach(obligation => {
      obligation.classList.remove('check')
    })

    for (let i in this.textInput) {
      let character = this.textInput.charAt(i)
      if (i >= 6 && i <= 20) {
        obligationsList[0].classList.add('check')
      } else {
        obligationsList[0].classList.remove('check')
      }

      if (character == character.toLowerCase()) {
        obligationsList[1].classList.add('check')
      }
      if (character == character.toUpperCase()) {
        obligationsList[2].classList.add('check')
      }
      if (character.match(/\W/g)) {
        obligationsList[3].classList.add('check')
      }
    }

    return obligationsList.every(obligation =>
      obligation.classList.contains('check')
    )
  }

  verify() {
    if (this.isEmpty()) {
      return 'Please fill all required fields'
    }

    if (this.typeInput !== 'name' && this.typeInput !== 'password') {
      if (!this.isMatch()) {
        return `Invalid ${this.typeInput.toUpperCase()}`
      } else {
        if (this.typeInput === 'cep' || this.typeInput === 'cpf') {
          let textInputFormat = this.textInput.replace(this.regexp.clear, '')
          textInputFormat = textInputFormat.replace(
            this.regexpFormat[this.typeInput][0],
            `${this.regexpFormat[this.typeInput][1]}`
          )
          this.textInput = textInputFormat
        }
      }
    } else if (this.typeInput === 'password') {
      if (!this.validPassword()) {
        return 'Please fill in the requirements'
      }
    }

    return true
  }
}

const renderInvalid = {
  create(el, text) {
    this.remove(el)
    const message = document.createElement('p')
    message.classList.add('error')
    message.innerText = text

    form.insertBefore(message, el.nextElementSibling)
  },
  remove(el) {
    const messageError = el.nextElementSibling
    if (messageError.classList.contains('error')) {
      setTimeout(() => {
        messageError.remove()
      }, 500)
      messageError.classList.add('disappear')
    }
  }
}

const validInput = e => {
  e.preventDefault()

  const validation = new Validation(e.target)

  if (typeof validation.verify() !== 'string') {
    renderInvalid.remove(e.target)
    e.target.value = validation.textInput
  } else {
    renderInvalid.create(e.target, validation.verify())
  }
}

fields.forEach(field => {
  field.addEventListener('blur', validInput)
  field.addEventListener('invalid', validInput)
})

form.addEventListener('submit', e => {
  e.preventDefault()

  if (form.querySelector('.error')) {
    return false
  }

  document.body.classList.add('send')
})
