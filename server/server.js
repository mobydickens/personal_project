require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const controller = require('./controller');

const app = express();
app.use(express.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// app.use(async function authBypass(req, res, next) {
//   if(DEV === 'true') {
//     let db = req.app.get('db');
//     let user = await db.session_user();
//     req.session.user = user[0];
//     next();
//   } else {
//     next();
//   }
// })

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(SERVER_PORT, () => console.log(`server listening at port ${SERVER_PORT}`));
});


app.post('/auth/signup', controller.signup); //signup
app.post('/auth/login', controller.login); //login
app.post('/api/newteam', controller.newTeam); //create a NEW team
app.post('/api/newproject', controller.newProject); //create a NEW project
app.post('/api/task', controller.newTask); //create a NEW task
app.post('/api/timelog', controller.newTimelog); //creates a new timelog in timelogs table

app.get('/auth/logout', controller.logout); //logs user out and destroys session
app.get('/api/projects', controller.getProjects); //gets projects from component did mount in HOME component
app.get('/api/project/:id', controller.getSingleProject); //gets project name for individual project view
app.get('/api/tasks/:id', controller.getTasks); //gets tasks in lanes with a component did mount in LANE component
app.get('/api/task/:id', controller.getOneTask); //get ONE task
app.get('/api/details/:id', controller.details); //get ALL timelogs for ONE task
app.get('/api/member', controller.checkMember); //when adding teammate, check if email is in the database
app.get('/api/teams', controller.getTeams); //gets all teams that user is a part of
app.get('/api/teamdetails/:id', controller.teamDetails); //get details for team list triggered in Team component
app.get('/api/table/:id', controller.tableInformation); // request details to make table in Table component. Triggered in Table. 

app.put('/api/updatetitle/:id', controller.updateTitle); //updating TITLE of task. Triggered from edit task component
app.put('/api/updatedescription/:id', controller.updateDescription); //triggered again from edit task component
app.put('/api/updatestatus/:id', controller.updateStatus); //status update from INSIDE detail modal and edit task component
app.put('/api/timelog/:id', controller.editTimelog); //triggered in detail modal component from inside the render. 
app.put('/api/editname/:id', controller.editProjectName); //triggered from Project Header component
app.put('/api/editdesc/:id', controller.editProjectDescription); //triggered from Project Header component
app.put('/api/addteammate', controller.addTeammate); //triggered from TeamList component
app.put('/task/:id', controller.editLaneOrder) //triggered from project component
app.put('/taskstatus/:id', controller.updateOrderAndStatus); //triggered from project component with react beautiful dnd
app.put('/api/background/:id', controller.updateBackground); //triggered from Backgrounds component with a save button

app.delete('/api/deleteproject/:id', controller.deleteProject); //deletes an ENTIRE project (including all of that project's tasks)
app.delete('/api/task/:id', controller.deleteTask); //deletes a single task
app.delete('/api/leaveteam/:id', controller.leaveTeam); //leave team, triggered from TeamList component 

