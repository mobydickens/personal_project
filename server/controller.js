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
        return res.status(200).send({ loggedIn: true, message: 'Login successful!', email: user[0].email, id: user[0].id, username: user[0].username })
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
      await db.new_connection([ team[i].id, newTeam[0].id ]);
    }
    res.status(200).send('complete!')
  },
  newProject: async (req, res) => {
    const { title, devHours, description, team_id, start_date } = req.body;
    const db = req.app.get('db');
    let project = await db.new_project([ team_id, title, description, devHours, start_date ]);
    res.status(200).send({message: 'success!', project: project });
  },

  // GETS
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send({ loggedIn: false });
  },
  getProjects: async (req, res) => {
    const db = req.app.get('db');
    if(req.session.user) {
      const { id } = req.session.user;
      let projects = await db.get_user_projects([ id ]);
      return res.status(200).send(projects);
    } else {
      return res.status(200).send({ loggedIn: false, message: 'Please log in.'})
    }
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
    let teams = await db.get_user_teams([ id ]);
    res.status(200).send(teams);
  },

  // DELETE
  deleteProject: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    db.delete_project([ id ]);
    let projects = await db.get_user_projects([ req.session.user.id ])
    res.status(200).send(projects);
  }
}