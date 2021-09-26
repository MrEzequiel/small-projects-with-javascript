const image = document.querySelector('img')

const createTooltip = e => {
  const tooltip = document.createElement('div')
  tooltip.classList.add('tooltip')

  tooltip.innerText = 'Image description here'

  document.body.append(tooltip)
  moveTooltip(tooltip, e.pageY + 15, e.pageX + 15)
  // console.log(e)

  image.addEventListener('mousemove', e => {
    moveTooltip(tooltip, e.pageY + 15, e.pageX + 15)
  })
}

const removerTooltip = () => document.querySelector('.tooltip').remove()

const moveTooltip = (el, top, left) => {
  el.style.top = `${top}px`

  if (left + 240 <= window.innerWidth) {
    el.style.left = `${left}px`
  } else {
    el.style.left = `${left - 170}px`
  }
}

image.addEventListener('mouseenter', createTooltip)
image.addEventListener('mouseleave', removerTooltip)
