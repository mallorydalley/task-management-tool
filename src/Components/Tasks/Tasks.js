import React from 'react';
import './Tasks.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

function Tasks(props){
  const {title, description, profile_pic, img} = props.task
// console.log(props.task)
    return (
      
      <Link to={`/edit/${props.task.task_id}`} >
        <div className='task-container'>
          <img id='task-img' src={img} alt=''/>
          <span>{title}</span>
          <p>{description}</p>
          <img className='assigned-thumbnail' src={profile_pic} alt=''/>
        </div>
      </Link>
    );
}

export default Tasks;