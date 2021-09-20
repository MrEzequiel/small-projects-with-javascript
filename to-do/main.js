const form = document.forms
const toDoList = document.querySelector('.to-do-list')

const saveLocalstorage = toDoMemory =>
  localStorage.setItem('to-do-storage', JSON.stringify(toDoMemory))

const getLocalStorage = () => {
  let objToDo = JSON.parse(localStorage.getItem('to-do-storage'))
  if (!objToDo) {
    return 0
  }

  objToDo.reduceRight((acc, item) => {
    renderToDo(item.do, item.checked)
  }, null)
}

const updateToDo = () => {
  const allToDo = document.querySelectorAll('.to-do-container')
  if (!allToDo) {
    return false
  }

  const arrayToDo = Array.from(allToDo)

  const objToDo = arrayToDo.map(item => {
    return {
      do: item.children[1].innerText,
      checked: item.querySelector('input').checked
    }
  })

  saveLocalstorage(objToDo)
}

const handleChange = (e, el) => {
  if (e.type === 'click') {
    el.remove()
  } else if (e.type === 'change') {
    e.target.checked
      ? el.querySelector('p').classList.add('marked')
      : el.querySelector('p').classList.remove('marked')
  }
  updateToDo()
}

const renderToDo = (toDo, checked = false) => {
  const container = document.createElement('div')
  container.classList.add('to-do-container')

  const label = document.createElement('label')
  label.classList.add('label-checkbox')

  checked
    ? (label.innerHTML = `<input type="checkbox" class="checkbox-to-do" checked/>
    <span class="checkmark"></span>`)
    : (label.innerHTML = `<input type="checkbox" class="checkbox-to-do"/>
    <span class="checkmark"></span>`)

  container.append(label)

  container.innerHTML += `
  <p class="to-do-text" contenteditable="true">${toDo}</p>

  <button type="button">
    <span class="material-icons"> delete </span>
  </button>
  `

  container.querySelector('input').addEventListener('change', e => {
    handleChange(e, container)
  })
  container.querySelector('p').addEventListener('input', handleChange)
  container.querySelector('button').addEventListener('click', e => {
    handleChange(e, container)
  })

  toDoList.insertBefore(container, toDoList.querySelector('.to-do-container'))
  updateToDo()
}

const handleSubmit = e => {
  e.preventDefault()
  renderToDo(e.target[0].value)
}

form[0].addEventListener('submit', handleSubmit)

getLocalStorage()
