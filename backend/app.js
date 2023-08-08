const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./config/database');
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;

app.use('/', require('./routes'));




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
