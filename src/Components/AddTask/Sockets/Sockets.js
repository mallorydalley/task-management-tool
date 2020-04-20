import React from 'react'
import './Sockets.css'
import socketIOClient from 'socket.io-client'



class Sockets extends React.Component{
    constructor(){
        super()
        this.state = {
            message: ''
        }
    }

    socket = () => {
            socketIOClient.connect('http://localhost:3000')
    }

    //Emit events
    handleInput = e => {
        this.setState({message: e.target.value})
    }

    handleSend = () => {
        const {message} = this.state
        this.socket.emit('chat', {
            message: message.value
        })
    }

    //Listen for events
    // handleMessage = socket.on('chat', (data) => {
    //     output.innerHTML += '<p><strong>' + data.message + ' </strong>'
    // })

    // socket.emit()

    // componentDidMount(){
    //     const socket = socketIOClient()
    // }

    render(){
        const {message} = this.state
        console.log(message)
    return (
        <div id="message-container">
            <div id="chat-window">
                <div id="output"></div>
            </div>
            {/* <form id='send-container'> */}
            <div>
                <input 
                    id="comment-box"
                    type='text' 
                    placeholder='Add a comment'
                    value={message}
                    onChange={e => this.handleInput(e)}
                />
                <button type='submit' id='send' onClick={this.handleSend}>Send</button>
            </div>
            {/* </form> */}
        </div>
    )
    }
} 

export default Sockets