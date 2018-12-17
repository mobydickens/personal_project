require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const massive = require('massive');
const { SERVER_PORT } = process.env;

const app = express();
app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`server listening at port ${SERVER_PORT}`));