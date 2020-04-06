const json = require('./mockAPI')
const supertest = require('supertest')
const app = require('./server')

describe('Testing the mockAPI result', () => {
  test('It should get mockAPI JSON', () => {
    expect(json.message).toMatch('this is a message')
  })
})
