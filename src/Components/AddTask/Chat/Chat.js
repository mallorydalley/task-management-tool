import React from "react";
import './Chat.css'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            // username: '',
            message: '',
            taskComments: this.props.taskComments,
            obj: {},
            room_id: ''
        }
        this.socket = io('localhost:4600')

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                // room_id: `${this.state.room_id}`,
                first_name: `${this.props.first_name}`,
                last_name: `${this.props.last_name}`,
                profile_pic: `${this.props.profile_pic}`,
                comment:this.state.message,
                task_id: this.props.task_id,
                employee_id: this.props.employee_id
            })
            this.addMessageDB()
            this.setState({message: ''});
            // document.getElementsByClassName('form-control').value=null
        }

        this.socket.on('RECEIVE_MESSAGE', function (data){
            console.log(data)
            // const { comment, task_id, employee_id } = data
            // const newArr = [...this.state.taskComments]
            // newArr.push(data)
            // this.setState({ taskComments: newArr })
            addMessage(data);
        })

        const addMessage = data => {
            console.log(data);
            const {comment, task_id, employee_id} = data
            this.setState({ taskComments: [...this.state.taskComments, data], obj:data })
            console.log(this.state.taskComments)
            
        }
    }

    addMessageDB = () => {
        const comment = this.state.message
        const task_id = this.props.match.params.task_id
        const employee_id = this.props.employee_id
        axios.post(`/api/comment`, { comment, task_id, employee_id })
            .then(() => {
                // console.log(data)
            })
            .catch(err => console.log(err))
    }
    

    componentDidMount() {
        this.getComments()
        // this.socket.on('JOIN_ROOM', {room_id:this.props.match.params.task_id})
        // this.socket.on('ROOM_JOINED', data => {
        //     console.log(data)
        // })
    }

    getComments = () => {
        axios.get(`/api/comments/${this.props.match.params.task_id}`)
        .then(res => {
            this.setState({taskComments: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        console.log(this.state.obj)
        // console.log(this.props.comments)
        const {taskComments} = this.state
        // console.log(taskComments)
        // console.log(this.props)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Comments</div>
                                <hr />
                                <div className="messages">
                                    
                                {taskComments.sort((a, b) => a.comment_id - b.comment_id).map((message, i) => {
                                    console.log(message)
                                    return (
                                        <div>
                                            <img 
                                                className='comment-pic' 
                                                src={message.profile_pic}
                                            /> 
                                    <span>{`${message.first_name} ${message.last_name}: `}</span>
                                            {message.comment}
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                            <div className="card-footer">
                                <br />
                                <input 
                                    className="form-control"
                                    type="text" 
                                    placeholder="Message" 
                                    value={this.state.message}
                                    name='message'
                                    onChange={e => this.handleInput(e)}
                                     />
                                <br />
                                <button onClick={(ev)  => {
                                    this.sendMessage(ev)
                                    }} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = reduxState => {
    const {employee_id, first_name, last_name, profile_pic} = reduxState
    return {employee_id, first_name, last_name, profile_pic}
}

export default withRouter(connect(mapStateToProps)(Chat));