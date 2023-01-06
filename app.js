const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('./services/sequelize')
const { login, isAuthenticated } = require('./controllers/auth')
const { errorResponder, errorLogger, invalidPathHandler } = require('./services/errorHandlersMiddlewares')
const flowers = require('./routes/flowers')
const port = process.env.PORT || 3000;


app.use(cors())
app.use(bodyParser.json())


app.post('/api/login', login)

// making sure user have a valid token before have access to resources.
app.use(isAuthenticated)

// app.use('/api/user', users)
app.use('/api/flower', flowers)

// Attach the first Error handling Middleware
// function defined above (which logs the error)
app.use(errorLogger)

// Attach the second Error handling Middleware
// function defined above (which sends back the response)
app.use(errorResponder)

// Attach the fallback Middleware
// function which sends back the response for invalid paths)
app.use(invalidPathHandler)

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
})