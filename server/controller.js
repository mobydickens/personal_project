const bcrypt = require('bcryptjs');

module.exports = {

  // POSTS
  signup: async (req, res) => {
    const { email, username, password } = req.body;
    const db = req.app.get('db');
    let user = await db.find_user([ email ]);
    if(user[0]) {
      res.status(200).send({ loggedIn: false, message: 'Email already exists'});
    } else {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync( password, salt );
      let newUser = await db.new_user([ email, username, hash]);
      req.session.user = { email: newUser[0].email, id: newUser[0].id };
      res.status(200).send({ loggedIn: true, message: 'signup a success', id: newUser[0].id, username: newUser[0].username, email: newUser[0].email });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get('db');
    let user = await db.find_user([ email ]);
    if(!user[0]) {
      res.status(200).send({ loggedIn: false, message: 'Email not found!'});
    } else {
      let result = bcrypt.compareSync( password, user[0].hash_value);
      if(result) {
        req.session.user = { email: user[0].email, id: user[0].id };
        return res.status(200).send({ loggedIn: true, message: 'Login successful!', email: user[0].email, id: user[0].id, username: user[0].username, background: user[0].background })
      } else {
        return res.status(200).send({ loggedIn: false, message: 'Incorrect password'});
      }
    }
  },
  newTeam: async (req, res) => {
    const { name, team } = req.body;
    const db = req.app.get('db');
    let newTeam = await db.new_team([ name ]);
    for (let i = 0; i < team.length; i++) {
      let id = team[i].id;
      await db.new_connection([ Number(id), newTeam[0].id ]);
    }
    let userTeams = await db.get_user_teams([req.session.user.id])
    res.status(200).send(userTeams)
  },
  newProject: async (req, res) => {
    const { title, devHours, description, team_id, start_date } = req.body;
    const db = req.app.get('db');
    let project = await db.new_project([ team_id, title, description, devHours, start_date ]);
    res.status(200).send({message: 'success!', project: project });
  },
  newTask: async (req, res) => {
    const { title, description, estimate, status, projectId } = req.body;
    let project_id = Number(projectId);
    const db = req.app.get('db');
    let taskArray = await db.all_lane_tasks([ Number(project_id), status ]);
    let laneOrder = taskArray.length + 1;
    let newTask = await db.new_task([ projectId, laneOrder, title, description, status, estimate ]);
    res.status(200).send(newTask);
  },
  newTimelog: async (req, res) => {
    const { spent_time, estimate_change, comment, taskId, userId } = req.body;
    const db = req.app.get('db');
    await db.new_timelog([ Number(taskId), Number(userId), Number(spent_time), Number(estimate_change), comment ]);
    res.status(200).send('New log has been added. Good job everybody!');
  },

  // GETS
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send({ loggedIn: false });
  },
  getSession: async (req, res) => {
    const db = req.app.get('db');
    if(req.session.user) {
      let user = await db.find_user([ req.session.user.email ]);
      return res.status(200).send({ loggedIn: true, message: 'User is logged in!', email: user[0].email, id: user[0].id, username: user[0].username, background: user[0].background })
    } else {
      return res.status(401).send({ loggedIn: false, message: "Please log in."})
    }
  },

  getProjects: async (req, res) => {
    const db = req.app.get('db');
    if(req.session.user) {
      const { id } = req.session.user;  
      let projects = await db.get_user_projects([ id ]);
      return res.status(200).send(projects);
    } else {
      return res.status(401).send({ loggedIn: false, message: 'Please log in.'})
    }
  },
  getSingleProject: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    let project = await db.get_single_project([ id ])
    res.status(200).send(project[0]);
  },
  getTasks: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    let tasks = await db.all_lane_tasks([ id  ]);
    res.status(200).send(tasks);
  },
  getOneTask: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    let task = await db.get_single_task([ Number(id) ]);
    res.status(200).send(task[0]);
  },
  details: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    let task = await await db.get_single_task([ Number(id) ]);
    let logs = await db.get_logs([ Number(id) ]);
    res.status(200).send( { task, logs} );
  },
  checkMember: async (req, res) => {
    let { email } = req.query;
    const db = req.app.get('db');
    let user = await db.find_user([ email ]);
    if(!user[0]) {
      res.status(200).send({ found: false, message: 'User not found!'})
    } else {
      res.status(200).send({ found: true, message: 'user found!', username: user[0].username, id: user[0].id });
    }
  },
  getTeams: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.session.user;
    let teams = await db.get_user_teams([ Number(id) ]);
    res.status(200).send(teams);
  },
  teamDetails: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    let details = await db.get_team_details([ id ]);
    res.status(200).send(details);
  },
  tableInformation: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    let projectInfo = await db.get_project_for_table([ Number(id) ]);
    let taskInfo = await db.get_tasks_for_table([ Number(id) ]);
    let timelogs = await db.get_timelogs_for_table([ Number(id) ]);
    res.status(200).send({ projectInfo: projectInfo[0], taskInfo, timelogs })
  },

  //PUT
  updateBackground: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const { background } = req.body;
    await db.update_background([ Number(id), background ]);
    res.status(200).send('success in setting new background!')
  },

  updateTitle: async (req, res) => {
    const db = req.app.get('db');
    const { title } = req.body;
    const { id } = req.params;
    let updatedTitle = await db.update_task_title([ title, Number(id) ]);
    res.status(200).send(updatedTitle[0]);
  },
  updateDescription: async (req, res) => {
    const db = req.app.get('db');
    const { description } = req.body;
    const { id } = req.params;
    let updatedDescription = await db.update_task_description([ description, Number(id) ]);
    res.status(200).send(updatedDescription[0]);
  },
  updateStatus: async (req, res) => {
    const db = req.app.get('db');
    const { status } = req.body;
    const { id } = req.params;
    await db.update_status([ status, Number(id) ]);
    let tasks = await db.all_lane_tasks([ id  ]);
    res.status(200).send(tasks);
  },
  editTimelog: async (req, res) => {
    const db = req.app.get('db');
    const { spent_time, estimate_change, comment } = req.body;
    const { id } = req.params;
    let updatedLog = await db.update_timelog([ Number(id), Number(spent_time), Number(estimate_change), comment ]);
    res.status(200).send(updatedLog[0]);
  },
  editProjectName: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const { title } = req.body;
    let name = await db.update_project_name([ Number(id), title ]);
    res.status(200).send(name[0]);
  },
  editProjectDescription: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const { description } = req.body;
    let newDescription = await db.update_project_description([ Number(id), description ]);
    res.status(200).send(newDescription[0]);
  },
  addTeammate: async (req, res) => {
    const db = req.app.get('db');
    const { email, team_id } = req.body;
    let user = await db.find_user([ email ]);
    await db.new_connection([ user[0].id, Number(team_id) ]);
    let details = await db.get_team_details([ Number(team_id) ]);
    res.status(200).send(details);
  },
  editLaneOrder: async (req, res) => {
    const { id } = req.params;
    const { index } = req.body;
    const db = req.app.get('db');
    let task = await db.update_lane_order([ Number(id), Number(index) ]);
    let tasks = await db.all_lane_tasks([ task[0].project_id ]);
    res.status(200).send(tasks);
  },
  updateOrderAndStatus: async (req, res) => {
    const { id } = req.params;
    const { index, status } = req.body;
    const db = req.app.get('db');
    let task = await db.update_order_status([ Number(id), Number(index), status ]);
    let tasks = await db.all_lane_tasks([ task[0].project_id ]);
    res.status(200).send(tasks);
  },

  // DELETE
  deleteProject: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    let numId = Number(id);
    await db.delete_projectwide_timelogs([ numId ]);
    await db.delete_all_tasks([ numId ]);
    await db.delete_project([ numId ]);
    let projects = await db.get_user_projects([ req.session.user.id ])
    res.status(200).send(projects);
  },
  deleteTask: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    await db.delete_timelogs([ Number[ id ]]);
    await db.delete_task([ Number(id) ]);
    res.status(200).send('success!');
},
  leaveTeam: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    await db.delete_leave_team([ id, req.session.user.id ]);
    let teams = await db.get_user_teams([ req.session.user.id ]);
    res.status(200).send(teams);
  }
}