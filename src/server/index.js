const app = require('./server.js')

const PORT = process.env.PORT || 80
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
