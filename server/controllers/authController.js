const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const {email, password, first_name, last_name, profile_pic} = req.body;
    const db = req.app.get('db');

    let employee = await db.auth.check_employee(email)
    if(employee[0]) {
        return res.status(400).send('Email already in use')
    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    let newEmployee = await db.auth.register_employee({email, password:hash, first_name, last_name, profile_pic})
    req.session.user = newEmployee[0]
    res.status(201).send(req.session.user)
  },
  login: async (req, res) => {
    const {email, password} = req.body;
    const db = req.app.get('db');

    let employee = await db.auth.check_employee(email);
    if(!employee[0]){
        return res.status(400).send(`User doesn't exist`)
    }

    const authenticated = bcrypt.compareSync(password, employee[0].password)
    if(!authenticated){
        return res.status(401).send(`Password is incorrect`)
    }

    delete employee[0].password;
    req.session.user = employee[0]
    res.status(202).send(req.session.user)
  },
  logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
  }
};