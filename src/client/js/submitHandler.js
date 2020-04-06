import URL_REGEX from './validator'

const validateUrl = url => URL_REGEX.test(url)

/**
 * Helper function that helps us making POST calls to the server.
 *
 * @param {String} link - Article url that we want to evaluate.
 * @param {String} path - Path for server endpoint that will help us with analysis process.
 */
const _evaluateData = async (link, path = '/evaluate') => {
  return await fetch(path, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({ link: link })
  })
}

const submitAction = url => {
  return new Promise((resolve, reject) => {
    _evaluateData(url)
      .then(response => {
        if (response.status !== 200) {
          reject({
            success: false,
            message: 'There was a server error.'
          })
        }

        response.json().then(data => {
          resolve({
            success: true,
            data: data
          })
        })
      })
      .catch(error => {
        reject({
          success: false,
          message: error
        })
      })
  })
}

export { submitAction, validateUrl }
