const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const routes = require('./routes');
const cors = require('cors');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect('mongodb+srv://thiago:thiago@cluster0-obqeb.mongodb.net/week10?retryWrites=true&w=majority', 
  { useNewUrlParser: true,
    useUnifiedTopology: true 
  },
);


server.listen(3000);