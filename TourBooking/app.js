const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose=require('mongoose');
const uri = "mongodb+srv://xxxxxxxxx?retryWrites=true&w=majority";
const connector = mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});
const routes=require('./routes');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', routes);
app.use(function(req, res) {
  res.json({message:"route not found"});
});

module.exports = app;
