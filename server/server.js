const express = require('express');
const db = require('./config/mongoose.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http')

const PORT = 5002;
const app = express();
app.use(cors());

const dotenv = require("dotenv");

const server = http.createServer(app);
module.exports.io = require('socket.io')(server, {cors: {origin: "*"}});

// Load environment variables from .env file
dotenv.config();


// Allow requests from specified origins only
app.use(cors({
  origin: ['http://localhost:6000', 'http://localhost:3000']
}));


app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes'));

app.get('/', (req, res) => {
  res.send("Hello world");
})

server.listen(5000, () => {
  console.log("socket is listening")
})

app.listen(PORT, () => {
  console.log("port is listening on",PORT)
})