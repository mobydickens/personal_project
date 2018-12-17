const bcrypt = require('bcryptjs');

module.exports = {
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
  getProjects: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    if(req.session.user) {
      let projects = await db.get_user_projects([ id ]);
      return res.status(200).send(projects);
    }
  }
}