import React from 'react';
import './Tasks.css';
import axios from 'axios';

function Tasks(props){
  const {title, description, profile_pic, img} = props.task
console.log(props.task)
    return (
      <div className='task-container'>
        <img id='task-img' src={img} alt=''/>
        <span>{title}</span>
        <p>{description}</p>
        <img className='assigned-thumbnail' src={profile_pic} />
      </div>
    );
}

export default Tasks;