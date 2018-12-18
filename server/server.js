require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, DEV } = process.env;
const controller = require('./controller');

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

// SIGN UP
app.post('/auth/signup', controller.signup);
// LOGIN
app.post('/auth/login', controller.login);
//INITIAL COMPONENT DID MOUNT GET IN HOME
app.get('/api/projects', controller.getProjects);