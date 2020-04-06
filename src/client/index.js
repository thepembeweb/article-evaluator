import { displayResults } from './js/resultsHandler'
import { submitAction, validateUrl } from './js/submitHandler'
import './styles/index.scss'

const _initServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then(registration => {
          console.log('SW registered: ', registration)
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }
}
_initServiceWorker()

let navigation
let articleUrlInput
let evaluateButton
let readMoreButton
let resultImage
let resultTitle
let resultText
let inputError
let resultPolarity
let resultSubjectivity

let typingTimer
const doneTypingInterval = 500

const _toggleErrorMsg = message => {
  if (message === '') {
    inputError.innerHTML = message
    inputError.classList.add('hidden')
    inputError.classList.remove('visible')
  } else {
    inputError.innerHTML = message
    inputError.classList.add('visible')
    inputError.classList.remove('hidden')
  }
}

const _doneTyping = () => {
  const url = articleUrlInput.value.trim()

  if (url === '' || validateUrl(url)) {
    _toggleErrorMsg('')
  } else {
    _toggleErrorMsg('Please make sure you enter a valid URL')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  navigation = document.getElementsByTagName('header')[0]
  articleUrlInput = document.getElementById('articleUrlInput')
  evaluateButton = document.getElementById('evaluateButton')
  readMoreButton = document.getElementById('readMoreButton')
  resultImage = document.getElementById('resultImage')
  resultTitle = document.getElementById('resultTitle')
  resultText = document.getElementById('resultText')
  inputError = document.getElementById('input__error')
  resultPolarity = document.getElementById('resultPolarity')
  resultSubjectivity = document.getElementById('resultSubjectivity')

  articleUrlInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(_doneTyping, doneTypingInterval)
  })

  articleUrlInput.addEventListener('keydown', () => {
    clearTimeout(typingTimer)
  })

  evaluateButton.addEventListener('click', event => {
    event.preventDefault()

    resultImage.innerHTML = ''
    resultTitle.innerHTML = ''
    resultText.innerHTML = ''
    resultPolarity.innerHTML = ''
    resultSubjectivity.innerHTML = ''

    const url = articleUrlInput.value.trim()

    if (url !== '' && validateUrl(url)) {
      _toggleErrorMsg('')

      evaluateButton.disabled = true
      evaluateButton.innerHTML = '<span>Processing...</span>'

      submitAction(url)
        .then(response => {
          if (response.success) {
            displayResults(response.data)
          } else {
            _toggleErrorMsg(response.message)
          }

          evaluateButton.disabled = false
          evaluateButton.innerHTML = '<span>Evaluate</span>'
        })
        .catch(error => console.log(error))
    } else {
      _toggleErrorMsg('Please enter a valid URL')
    }
  })

  readMoreButton.addEventListener('click', event => {
    event.preventDefault()

    const dots = document.getElementById('dots')
    const moreText = document.getElementById('more')

    if (dots.style.display === 'none') {
      dots.style.display = 'inline'
      readMoreButton.innerHTML = '<span>Read more</span>'
      moreText.style.display = 'none'
    } else {
      dots.style.display = 'none'
      readMoreButton.innerHTML = '<span>Read less</span>'
      moreText.style.display = 'inline'
    }
  })
})
