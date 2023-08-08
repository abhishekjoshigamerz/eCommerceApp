const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./config/database');
const app = express();

app.use(cors());
app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;

app.use('/', require('./routes'));




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
