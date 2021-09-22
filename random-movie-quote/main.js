const button = document.querySelector('.generate')

const generateQuote = async () => {
  try {
    const request = await fetch(
      'https://movie-quote-api.herokuapp.com/v1/quote/'
    )
    const jsonResponse = await request.json()
    console.log(jsonResponse)
    renderQuote(jsonResponse)
  } catch (err) {
    console.log(err)
  }
}

const renderQuote = quote => {
  const quoteContent = document.querySelector('.quote')

  quoteContent.innerHTML = `
  "${quote.quote}"
  <cite class="author">- ${quote.role} (${quote.show})</cite>
  `
}

button.addEventListener('click', generateQuote)
