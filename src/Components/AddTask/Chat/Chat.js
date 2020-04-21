import React from "react";
import './Chat.css'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import axios from 'axios'

class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            message: '',
            taskComments: this.props.taskComments
        }
        this.socket = io('localhost:4600')

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                first_name: `${this.props.first_name}`,
                last_name: `${this.props.last_name}`,
                profile_pic: `${this.props.profile_pic}`,
                comment:this.state.message,
                task_id: this.props.task_id,
                employee_id: this.props.employee_id
            })
            this.setState({message: ''});
        }

        this.socket.on('RECEIVE_MESSAGE', function (data){
            addMessage(data);
        })

        const addMessage = data => {
            console.log(data);
            this.setState({ taskComments: [...this.state.taskComments, data] })
            const {comment, task_id, employee_id} = data
            axios.post(`/api/comment`, { comment, task_id, employee_id})
            .then(() => {
                console.log(data)
                
                console.log(this.state.taskComments)
            })
            .catch(err => console.log(err))
            // this.setState({comments:[...this.state.comments, data]})
            // console.log(this.state.comments)
        }
    }

    componentDidMount() {
        this.getComments()
    }

    getComments = () => {
        axios.get(`/api/comments/${this.props.task_id}`)
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
        
        // console.log(this.props.comments)
        const {taskComments} = this.state
        console.log(taskComments)
        console.log(this.props)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Comments</div>
                                <hr />
                                <div className="messages">
                                {taskComments.map((message, i) => {
                                    console.log(message)
                                    return (
                                        <div>
                                            <img className='comment-pic' src={message.profile_pic}/> 
                                    <span>{`${message.first_name} ${message.last_name}: `}</span>
                                            {/* {message.author}:  */}
                                            {message.comment}
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                            <div className="card-footer">
                                <input 
                                    className="form-control"
                                    type="text" 
                                    placeholder="Username" 
                                    name='username'
                                    onChange={e => this.handleInput(e)}
                                     />
                                <br />
                                <input 
                                    className="form-control"
                                    type="text" 
                                    placeholder="Message" 
                                    name='message'
                                    onChange={e => this.handleInput(e)}
                                     />
                                <br />
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
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

export default connect(mapStateToProps)(Chat);