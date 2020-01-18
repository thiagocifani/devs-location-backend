const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

mongoose.connect('mongodb+srv://thiago:thiago@cluster0-obqeb.mongodb.net/week10?retryWrites=true&w=majority', 
  { useNewUrlParser: true,
    useUnifiedTopology: true 
  },
);


app.listen(3000);