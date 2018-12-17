const bcrypt = require('bcryptjs');

module.exports = {
  // signup: async (req, res) => {
  //   // const { }
  // },
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
  }
}