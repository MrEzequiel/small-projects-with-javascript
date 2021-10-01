const form = document.querySelector('#form')
const fields = document.querySelectorAll('input')

const regexpCEP = /\d{5}[-\s]?\d{3}/g
const regexpCPF = /(?:\d{3}[-.\s]?){3}\d{2}/g
const regexpEmail = /[\w.-]+@[\w-]+\.[\w-.]+/gi

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

const verify = {
  isEmpty: text => text.trim() === '',

  isMatch(input, regexp) {
    const match = input.match(regexp)

    if (!match || match[0] !== input) {
      return false
    } else {
      return true
    }
  }
}

const validInput = e => {
  e.preventDefault()
  const types = {
    valueInput: e.target.value,

    name() {
      if (verify.isEmpty(this.valueInput)) {
        renderInvalid.create(e.target, 'Please fill all required fields')
      } else {
        renderInvalid.remove(e.target)
      }
    },

    email() {
      if (verify.isEmpty(this.valueInput)) {
        renderInvalid.create(e.target, 'Please fill all required fields')
      } else if (!verify.isMatch(this.valueInput, regexpEmail)) {
        renderInvalid.create(e.target, 'Invalid email')
      } else {
        renderInvalid.remove(e.target)
      }
    },

    cep() {
      if (verify.isEmpty(this.valueInput)) {
        renderInvalid.create(e.target, 'Please fill all required fields')
      } else if (!verify.isMatch(this.valueInput, regexpCEP)) {
        renderInvalid.create(e.target, 'Invalid CEP')
      } else {
        renderInvalid.remove(e.target)
        let textInput = this.valueInput.replace(/\D/g, '')
        textInput = textInput.replace(/(\d{5})(\d{3})/g, '$1-$2')
        e.target.value = textInput
      }
    },

    cpf() {
      if (verify.isEmpty(this.valueInput)) {
        renderInvalid.create(e.target, 'Please fill all required fields')
      } else if (!verify.isMatch(this.valueInput, regexpCPF)) {
        renderInvalid.create(e.target, 'Invalid CPF')
      } else {
        renderInvalid.remove(e.target)
        let textInput = this.valueInput.replace(/\D/g, '')
        textInput = textInput.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/g,
          '$1.$2.$3-$4'
        )
        e.target.value = textInput
      }
    },

    password() {
      let obligationsList = document.querySelectorAll('.obligations li')
      obligationsList = Array.from(obligationsList)

      obligationsList.forEach(obligation => {
        obligation.classList.remove('check')
      })

      for (let i in this.valueInput) {
        let character = this.valueInput.charAt(i)
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

      const isValid = obligationsList.every(obligation =>
        obligation.classList.contains('check')
      )

      if (verify.isEmpty(this.valueInput)) {
        renderInvalid.create(e.target, 'Please fill all required fields')
      } else if (!isValid) {
        renderInvalid.create(e.target, 'Please fill in the requirements')
      } else {
        renderInvalid.remove(e.target)
      }
    }
  }

  types[e.target.name]()
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
