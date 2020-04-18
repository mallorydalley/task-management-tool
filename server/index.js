require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT,
      authCtrl = require('./controllers/authController'),
      taskCtrl = require('./controllers/taskController'),
      folderCtrl = require('./controllers/folderController'),
      employeeCtrl = require('./controllers/employeeController')


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
app.get(`/api/session`, authCtrl.checkSession)

//employee endpoints
app.get(`/api/employees`, employeeCtrl.getEmployees)
app.get(`/api/employee/:employee_id`, employeeCtrl.getOneEmployee)

//tasks endpoints
app.get(`/api/all-tasks/:folder_id`, taskCtrl.getAllTasks)
app.get(`/api/task/:task_id`, taskCtrl.getOneTask)
app.post(`/api/create-task`, taskCtrl.createTask)
app.put(`/api/task/:task_id`, taskCtrl.editTask)

//folders endpoints
app.get(`/api/folders`, folderCtrl.getFolders)

app.listen(port, () => console.log(`Server running on ${port}`));

// socket.io
// const io = require('socket.io')(3001)


// io.on('connection', socket => {
//     console.log('new User')
//     socket.emit('chat-message', 'Hello World')
// }) 