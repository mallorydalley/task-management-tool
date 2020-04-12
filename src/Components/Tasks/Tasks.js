import React from 'react';
import './Tasks.css';
import axios from 'axios';

function Tasks(props){
  const {title, description, profile_pic} = props.task
console.log(props.task)
    return (
      <div className='task-container'>
        <span>{title}</span>
        <p>{description}</p>
        <img className='assigned-thumbnail' src={profile_pic} />
      </div>
    );
}

export default Tasks;