require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT,
      authCtrl = require('./controllers/authController'),
      taskCtrl = require('./controllers/taskController');
      folderCtrl = require('./controllers/folderController')

const app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('DB connected')
});

//auth endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);
app.get(`/api/auth/me`, authCtrl.getMe)

//tasks endpoints
app.get(`/api/all-tasks`, taskCtrl.getAllTasks)
app.post(`/api/create-task`, taskCtrl.createTask)

//folders endpoints
app.get(`/api/folders`, folderCtrl.getFolders)

app.listen(port, () => console.log(`Server running on ${port}`));