import { SlideNav } from './slide.js'

const slide = new SlideNav('.slide', '.container-slide')
slide.init()

slide.addArrow('.prev', '.next')
