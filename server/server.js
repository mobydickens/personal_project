require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const massive = require('massive');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();
app.use(express.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(SERVER_PORT, () => console.log(`server listening at port ${SERVER_PORT}`));
});