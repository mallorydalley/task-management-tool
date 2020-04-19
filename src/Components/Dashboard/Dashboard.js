import React, {useState, useEffect} from "react";
import './Dashboard.css'
import axios from 'axios';
import Tasks from "../Tasks/Tasks";
import Folders from '../Folders/Folders'

function Dashboard(props){
  const [newTasks, setNewTasks] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [complete, setComplete] = useState([])
  const [folder_id, setFolderId] = useState(1)

  const getAllTasks = () => {
    axios.get(`/api/all-tasks/${folder_id}`)
    .then(response => {

      response.data.filter(ele => {
        if(ele.status === 'Complete'){
          setComplete((complete) => [...complete, ele]);
        } else if (ele.status === 'In Progress'){
          setInProgress((inProgress) => [...inProgress, ele]);
        }else{
          setNewTasks((newTasks) => [...newTasks, ele]);
        }
      })

    })
    .catch(err => console.log(err))
}

  const clearDash = () => {
    setComplete((complete) => []);
    setInProgress((inProgress) => []);
    setNewTasks((newTasks) => []);
  }

  useEffect(() => {
    clearDash();
    getAllTasks();
  }, [folder_id])
  
  let mappedNewTasks = newTasks.map((task, i) => (
    <Tasks key={i} task={task} />
  ))
  let mappedInProgress = inProgress.map((task, i) => (
    <Tasks key={i} task={task} />
  ))
  let mappedComplete = complete.map((task, i) => (
    <Tasks key={i} task={task} />
  ))

  const selectFolder = (id) => {
    setFolderId(id)
  }

  // console.log(folder_id)
  return (
    <div>
      <Folders 
        // folder_id = {folder_id}
        selectFolder={selectFolder}
      />
      <div className="dash">
        <div className="posts-column">
          <span>New</span>
          {mappedNewTasks}
        </div>
        <div className="posts-column">
          <span>In Progress</span>
          {mappedInProgress}
        </div>
        <div className="posts-column">
          <span>Complete</span>
          {mappedComplete}
        </div>
      </div>
    </div>
  )         
}

export default Dashboard;
