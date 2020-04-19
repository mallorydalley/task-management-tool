import React from 'react'

function Sockets(props){

    return (
        <div id="message-container">
            <form id='send-container'>
                <input 
                    type='text' 
                    id='message-input' 
                    placeholder='Add a comment'
                />
                <button type='submit' id='send-button'>Send</button>
            </form>
        </div>
    )
} 

export default Sockets