import debounce from './debounce.js'

export class Slide {
  constructor(slide, container) {
    this.slide = document.querySelector(slide)
    this.container = document.querySelector(container)
    this.changeEvent = new Event('changeEvent')
    this.distance = { finalPosition: 0, startX: 0, movement: 0 }
  }

  transition(active) {
    this.slide.style.transition = active ? 'transform .3s ease-in-out' : ''
  }

  moveSlide(distanceX) {
    this.distance.movePosition = distanceX
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.6
    return this.distance.finalPosition - this.distance.movement
  }

  onStart(e) {
    let moveType
    if (e.type === 'mousedown') {
      e.preventDefault()
      this.distance.startX = e.clientX
      moveType = 'mousemove'
    } else {
      this.distance.startX = e.changedTouches[0].clientX
      moveType = 'touchmove'
    }

    this.container.addEventListener(moveType, this.onMove)
    this.transition(false)
  }

  onMove(e) {
    const pointerPosition =
      e.type === 'mousemove' ? e.clientX : e.changedTouches[0].clientX
    const finalPosition = this.updatePosition(pointerPosition)
    this.moveSlide(finalPosition)
  }

  onEnd(e) {
    const moveType = e.type === 'mouseup' ? 'mousemove' : 'touchmove'

    this.container.removeEventListener(moveType, this.onMove)
    this.distance.finalPosition = this.distance.movePosition
    this.transition(true)
    this.changeSlideOnEnd()
  }

  changeSlideOnEnd() {
    if (this.distance.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide()
    } else if (this.distance.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide()
    } else {
      this.changeSlide(this.index.active)
    }
  }

  addSlideEvents() {
    this.container.addEventListener('mousedown', this.onStart)
    this.container.addEventListener('touchstart', this.onStart)
    this.container.addEventListener('mouseup', this.onEnd)
    this.container.addEventListener('touchend', this.onEnd)
  }

  slidePosition(slide) {
    const margin = (this.container.offsetWidth - slide.offsetWidth) / 2
    return -(slide.offsetLeft - margin)
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map(el => {
      const position = this.slidePosition(el)
      return { el, position }
    })
  }

  slideIndexNav(index) {
    const last = this.slideArray.length - 1
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1
    }
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index]
    this.moveSlide(activeSlide.position)
    this.slideIndexNav(index)
    this.distance.finalPosition = activeSlide.position
    this.changeActiveClass()
    this.container.dispatchEvent(this.changeEvent)
  }

  changeActiveClass() {
    this.slideArray.forEach(({ el }) => el.classList.remove('active'))

    this.slideArray[this.index.active].el.classList.add('active')
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev)
    }
  }

  activeNextSlide() {
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next)
    }
  }

  onResize() {
    setTimeout(() => {
      this.slidesConfig()
      this.changeSlide(this.index.active)
    }, 1000)
  }

  addResizeEvent() {
    window.addEventListener('resize', this.onResize)
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)

    this.onResize = debounce(this.onResize.bind(this), 200)
    this.activePrevSlide = this.activePrevSlide.bind(this)
    this.activeNextSlide = this.activeNextSlide.bind(this)
    this.eventControl = this.eventControl.bind(this)
    this.activeControlItem = this.activeControlItem.bind(this)
  }

  init() {
    this.bindEvents()
    this.slidesConfig()
    this.transition(true)
    this.addSlideEvents()
    this.addResizeEvent()

    this.changeSlide(3)
    return this
  }
}

export class SlideNav extends Slide {
  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev)
    this.nextElement = document.querySelector(next)
    this.addArrowEvent()
    this.addControl()
  }
  addArrowEvent() {
    this.prevElement.addEventListener('click', this.activePrevSlide)
    this.nextElement.addEventListener('click', this.activeNextSlide)
  }

  createControl() {
    const control = document.createElement('ul')
    control.dataset.control = 'slide'

    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href='#slide${index + 1}'>${
        index + 1
      }</a></li>`
    })

    this.container.appendChild(control)
    return control
  }

  eventControl(item, index) {
    item.addEventListener('click', e => {
      e.preventDefault()
      this.changeSlide(index)
      this.activeControlItem()
    })
    this.container.addEventListener('changeEvent', this.activeControlItem)
  }

  activeControlItem() {
    this.controlArray.forEach(item => item.classList.remove('active'))
    this.controlArray[this.index.active].classList.add('active')
  }

  addControl(customControl) {
    this.control = document.querySelector(customControl) || this.createControl()
    this.controlArray = [...this.control.children]

    this.activeControlItem()
    this.controlArray.forEach(this.eventControl)
  }
}
