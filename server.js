const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const createRouter = require('./helpers/create_router.js')

const app = express()

app.use(cors())
app.use(bodyParser.json())

MongoClient.connect('mongodb://localhost/jamiecardgame')
  .then((client) => {
    const db = client.db('card_game')
    const playersCollection = db.collection('players')
    const playersRouter = createRouter(playersCollection)
    const decksCollection = db.collection('decks')
    const decksRouter = createRouter(decksCollection)
    app.use('/api/players', playersRouter)
    app.use('/api/decks', decksRouter)
  })
  .catch(console.err)

app.listen(3000, function () {
  console.log(`Listening on port ${this.address().port}`)
})

// app.js or server.js
// connect Mongoose to your DB
var mongoose = require(‘mongoose’);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jamiecardgame');

const port = process.env.PORT || 3000;
app.listen(port);
