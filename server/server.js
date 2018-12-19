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

app.use(async function authBypass(req, res, next) {
  if(DEV === 'true') {
    let db = req.app.get('db');
    let user = await db.session_user();
    req.session.user = user[0];
    next();
  } else {
    next();
  }
})

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(SERVER_PORT, () => console.log(`server listening at port ${SERVER_PORT}`));
});

// SIGN UP
app.post('/auth/signup', controller.signup);
// LOGIN
app.post('/auth/login', controller.login);
//NEW TEAM
app.post('/api/newteam', controller.newTeam);
//NEW PROJECT
app.post('/api/newproject', controller.newProject);
//NEW TASK
app.post('/api/task', controller.newTask);
//LOGOUT
app.get('/auth/logout', controller.logout);
//INITIAL COMPONENT DID MOUNT GET IN HOME
app.get('/api/projects', controller.getProjects);
//GET PROJECT NAME IN PROJECT VIEW
app.get('/api/project/:id', controller.getSingleProject);
//COMPONENT DID MOUNT IN LANE
app.get('/api/tasks', controller.getTasks);
//WHEN ADDING NEW TEAM MEMBER, CHECK IF EMAIL IS VALID
app.get('/api/member', controller.checkMember);
//WHEN GETTING LIST OF TEAMS FOR INDIVIDUAL USER
app.get('/api/teams', controller.getTeams);
//DELETE PROJECT
app.delete('/api/deleteproject/:id', controller.deleteProject);
//DELETE TASK
app.delete('/api/task/:id', controller.deleteTask);
