const positions = document.querySelectorAll('.tic-tac-toe > div')
const player = document.querySelector('.player')
const buttonRestart = document.querySelector('.restart')
let playing = ''
let isFull = false

let square = {
  a1: '',
  a2: '',
  a3: '',
  b1: '',
  b2: '',
  b3: '',
  c1: '',
  c2: '',
  c3: ''
}

const posibilities = [
  'a1,a2,a3',
  'b1,b2,b3',
  'c1,c2,c3',

  'a1,b1,c1',
  'a2,b2,c2',
  'a3,b3,c3',

  'a1,b2,c3',
  'a3,b2,c1'
]

const restartGame = () => {
  for (let i in square) {
    square[i] = ''
  }
  playing = ''
  isFull = false
  renderVictory.winner.innerText = '-'
  renderVictory.winner.classList.remove('winner')
  getPlayer()

  positions.forEach(position => {
    position.innerText = ''
    position.addEventListener('click', handleClick)
  })
}

const stopGame = () => {
  positions.forEach(position => {
    position.removeEventListener('click', handleClick)
  })
}

const togglePlayer = () => (playing = playing === 'X' ? 'O' : 'X')

const getPlayer = () => {
  const random = Math.floor(Math.random() * 2)

  if (random === 1) {
    togglePlayer()
    player.innerText = 'X'
  } else {
    togglePlayer()
    player.innerText = 'O'
  }
}

const renderVictory = {
  winner: document.querySelector('.result'),
  draw() {
    console.log('draw')
    this.winner.innerText = 'DRAW'
  },
  earner() {
    this.winner.innerText = playing
    this.winner.classList.add('winner')
  }
}

const verify = () => {
  isFull = true

  posibilities.forEach(possibility => {
    let possibilityArray = possibility.split(',')
    const hasWon = possibilityArray.every(option => square[option] === playing)

    if (hasWon) {
      renderVictory.earner()
      stopGame()
      return true
    }
  })

  positions.forEach(position => {
    if (!position.innerText.trim()) {
      isFull = false
    }
  })
  if (isFull) {
    renderVictory.draw()
  }
}

const handleClick = e => {
  if (!e.target.innerText) {
    if (playing === 'O') {
      e.target.innerText = 'X'
      togglePlayer()
      square[e.target.dataset.position] = 'X'
      player.innerText = 'O'
    } else {
      e.target.innerText = 'O'
      togglePlayer()
      square[e.target.dataset.position] = 'O'
      player.innerText = 'X'
    }
    verify()
  }
}

positions.forEach(position => {
  position.addEventListener('click', handleClick)
})

buttonRestart.addEventListener('click', restartGame)

getPlayer()
