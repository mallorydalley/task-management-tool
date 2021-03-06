require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT,
      authCtrl = require('./controllers/authController'),
      taskCtrl = require('./controllers/taskController'),
      folderCtrl = require('./controllers/folderController'),
      employeeCtrl = require('./controllers/employeeController'),
      commentCtrl = require('./controllers/commentController')
      emailCtrl = require('./controllers/emailController'),
      http = require('http'),
      socket = require('socket.io');


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
app.delete(`/api/task/:task_id`, taskCtrl.deleteTask)

//folders endpoints
app.get(`/api/folders`, folderCtrl.getFolders)
app.post(`/api/create-folder`, folderCtrl.createFolder)

//comments endpoints
app.get(`/api/comments/:task_id`, commentCtrl.getComments)
app.post(`/api/comment`, commentCtrl.createComment)

//email endpoints
app.post('/api/email', emailCtrl.email)


let server = app.listen(port, () => console.log(`Server running on ${port}`));

//Sockets
const io = socket(server)

io.on('connection', (socket) => {
    // console.log('Made socket connection', socket.id)

    socket.on('JOIN_ROOM', function (data){
        console.log('joined room', data)
        
        const {room_id} = data
        socket.join(room_id)
        io.in(room_id).emit('ROOM_JOINED', data)
    })

    socket.on('JOIN_EXISTING_ROOM', function(data){
        const {room_id} = data
        socket.join(room_id)
        socket.emit('EXISTING_ROOM_JOINED', data)
    })

    socket.on('SEND_MESSAGE', function(data){
        // const {room_id} = data
        io.emit('RECEIVE_MESSAGE', data)
       
    })


})








