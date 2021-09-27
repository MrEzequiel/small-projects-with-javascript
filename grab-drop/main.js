const itemsGrab = document.querySelectorAll('.items-grab')
const itemsDrop = document.querySelectorAll('.items')
const itemContainer = document.querySelector('.container-items')

const handleGrabStart = e => {
  e.currentTarget.classList.add('dragging')
}

const handleGrabEnd = e => {
  e.currentTarget.classList.remove('dragging')
}

const handleHover = e => {
  e.preventDefault()
  e.currentTarget.classList.add('hover')
}

const handleLeaveHover = e => {
  e.currentTarget.classList.remove('hover')
}

const handleDrop = e => {
  e.currentTarget.classList.remove('hover')

  const item2 = e.target.parentNode
  const item = document.querySelector('.dragging')

  if (item2.classList.contains('items-grab')) {
    e.currentTarget.insertBefore(item, item2)
  } else {
    e.currentTarget.append(item)
  }
}

const addEvent = (el, event, callback) => {
  event.forEach((event, index) => {
    el.addEventListener(event, callback[index])
  })
}

addEvent(
  itemContainer,
  ['drop', 'dragover', 'dragleave'],
  [handleDrop, handleLeaveHover, handleHover]
)

itemsGrab.forEach(item => {
  addEvent(item, ['dragstart', 'dragend'], [handleGrabStart, handleGrabEnd])
})

itemsDrop.forEach(item => {
  addEvent(
    item,
    ['dragover', 'dragleave', 'drop'],
    [handleHover, handleLeaveHover, handleDrop]
  )
})
