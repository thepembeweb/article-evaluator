const dotenv = require('dotenv')
dotenv.config()

const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const aylienTextApi = require('aylien_textapi')

const apiEngine = new aylienTextApi({
  application_id: '64953d6d',
  application_key: 'f6af06ad7a9cdac5dda3f75293fa69ac'
})

// const apiEngine = new aylien({
//   application_id: process.env.API_ID,
//   application_key: process.env.API_KEY
// })

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(express.static('dist'))

app.get('/test', (req, res) => {
  app.set('json spaces', 2)
  res.json(mockAPIResponse)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
})

app.post('/evaluate', (req, res) => {
  const data = {}
  const link = req.body.link

  if (link) {
    if (apiEngine) {
      apiEngine.extract({ url: link, best_image: true }, (error, response) => {
        if (error === null) {
          const maxShowCharacters =
            response.article.length < 500 ? response.article.length : 500

          if (maxShowCharacters === 500) {
            data.text = response.article
              ? `${response.article.substring(
                  0,
                  maxShowCharacters
                )}<span id="dots">...</span><span id="more" style="display: none">${response.article.substring(
                  maxShowCharacters
                )}</span>`
              : ''
          } else {
            data.text = response.article
          }
          data.title = response.title ? response.title : ''
          data.image = response.image ? response.image : ''

          if (data.text && data.text.length > 0) {
            apiEngine.sentiment({ text: data.text }, (error, response) => {
              if (error === null) {
                data.polarity = response.polarity
                data.subjectivity = response.subjectivity
                data.polarity_confidence = response.polarity_confidence.toFixed(
                  2
                )
                data.subjectivity_confidence = response.subjectivity_confidence.toFixed(
                  2
                )
                res.send(data)
              }
            })
          } else {
            res.json(JSON.stringify(`Could not classify this article.`))
          }
        } else {
          res.json(JSON.stringify(`Requested URL was not found.`))
        }
      })
    }
  } else {
    res.json(
      JSON.stringify(
        `Please provide a URL in order to have something to evaluate.`
      )
    )
  }
})

module.exports = app
