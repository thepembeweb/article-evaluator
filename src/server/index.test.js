const supertest = require('supertest')
const app = require('./server')

describe('Testing the root path port', () => {
  test('It should get root path port', () => {
    const expectedPort = 3000
    let port = app.listen(expectedPort, function () {
      console.log(`Test app listening on port: ${expectedPort}`)
    })
    expect(port.address().port).toBe(expectedPort)
  })
})
