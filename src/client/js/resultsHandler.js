const navigation = document.getElementsByTagName('header')[0]
const mainSection = document.getElementById('mainSection')
const resultSection = document.getElementById('resultSection')
const resultTitle = document.getElementById('resultTitle')
const resultImage = document.getElementById('resultImage')
const resultText = document.getElementById('resultText')
const resultPolarity = document.getElementById('resultPolarity')
const resultSubjectivity = document.getElementById('resultSubjectivity')

const displayResults = data => {
  if (data) {
    console.log('data', data)
    navigation.classList.remove('hidden')
    navigation.classList.add('visible')
    mainSection.classList.remove('column')
    mainSection.classList.add('row')

    resultSection.classList.remove('hidden')
    resultSection.classList.add('visible')

    formatResults(data)

    displaySentiment(
      'Polarity',
      data.polarity,
      'Confidence',
      data.polarity_confidence,
      resultPolarity
    )
    displaySentiment(
      'Subjectivity',
      data.subjectivity,
      'Confidence',
      data.subjectivity_confidence,
      resultSubjectivity
    )
  }
}

const formatResults = data => {
  resultTitle.innerHTML = data.title
  resultText.innerHTML = data.text
  resultImage.src = data.image
  resultImage.alt = data.title
  resultImage.title = data.title
}

const displaySentiment = (
  sentimentLabel,
  sentiment,
  confidenceLabel,
  confidence,
  targetElement
) => {
  let fragment = document.createDocumentFragment()

  if (sentiment && sentimentLabel && confidenceLabel && confidence) {
    let table = document.createElement('table')
    let tableBody = document.createElement('tbody')

    let tr = document.createElement('tr')
    let td = document.createElement('td')
    td.appendChild(document.createTextNode(sentimentLabel))
    tr.appendChild(td)
    td = document.createElement('td')
    td.appendChild(document.createTextNode(confidenceLabel))
    tr.appendChild(td)
    tableBody.appendChild(tr)

    tr = document.createElement('tr')
    td = document.createElement('td')
    td.appendChild(document.createTextNode(sentiment))
    tr.appendChild(td)
    td = document.createElement('td')
    td.appendChild(document.createTextNode(confidence))
    tr.appendChild(td)
    tableBody.appendChild(tr)
    table.appendChild(tableBody)

    fragment.appendChild(table)
  } else {
    let paragraph = document.createElement('p')
    paragraph.appendChild(
      document.createTextNode(
        `* We could not determine ${sentimentLabel} of this article.`
      )
    )
    fragment.appendChild(paragraph)
  }

  targetElement.appendChild(fragment)
}

export { displayResults }
