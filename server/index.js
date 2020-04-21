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

//comments endpoints
app.get(`/api/comments/:task_id`, commentCtrl.getComments)
app.post(`/api/comment`, commentCtrl.createComment)

//email endpoints
app.post('/api/email', emailCtrl.email)


let server = app.listen(port, () => console.log(`Server running on ${port}`));



// const server = http.createServer(app)
const io = socket(server)

io.on('connection', (socket) => {
    console.log('Made socket connection', socket.id)

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data)
    })

    // socket.on('chat', (data) => {
    //     io.sockets.emit('chat', data)
    // })

    // socket.on("incoming data", data => {
    //     socket.broadcast.emit("outgoing data", {num:data})
    // })

    // socket.on("disconnect", () => console.log("Client disconnected"))
    // socket.emit('chat-message', 'Hello World')
    // socket.on('new-user', name => {
    //     users[socket.id] = name
    //     socket.broadcast.emit('user connected')
    // })
    // socket.on('send-chat-message', message => {
    //     console.log(message)
    // })
    // socket.broadcast.emit('chat-message', message)
})








