const bcrypt = require('bcryptjs');

module.exports = {
  signup: async (req, res) => {
    // const { }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get('db');
    let user = await db.find_user([ email ]);
  }
}