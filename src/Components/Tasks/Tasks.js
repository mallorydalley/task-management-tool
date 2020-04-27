import React from 'react';
import './Tasks.scss';

function Tasks(props){
  const {title, description, profile_pic, img} = props.task
    return (
      // <Link to={`/edit/${props.task.task_id}`} >
      <div
        className="task-card"
        onClick={() => {
          props.joinRoom(props.task.task_id);
        }}
      >
        <img id="task-img" src={img} alt="" />
        <span className="title">{title}</span>
        <p>{description}</p>
          <img className="assigned-thumbnail" src={profile_pic} alt="" />
      </div>
      // </Link>
    );
}

export default Tasks;