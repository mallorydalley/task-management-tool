import React, {useState, useEffect} from "react";
import './Dashboard.css'
import axios from 'axios';
import Tasks from "../Tasks/Tasks";
import Folders from '../Folders/Folders'

function Dashboard(props){
  const [newTasks, setNewTasks] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [complete, setComplete] = useState([])

  const getAllTasks = () => {
    axios.get(`/api/all-tasks`)
    .then(response => {
      // console.log(response.data)
      response.data.filter(ele => {
        if(ele.status === 'Complete'){
          setComplete((complete) => [...complete, ele]);
        } else if (ele.status === 'In Progress'){
          setInProgress((inProgress) => [...inProgress, ele]);
        }else{
          // console.log(ele)
          setNewTasks((newTasks) => [...newTasks, ele]);
        }
      })

    })
    .catch(err => console.log(err))
}

  useEffect(() => {
    getAllTasks()
  }, [])
  
  let mappedNewTasks = newTasks.map((task, i) => (
    <Tasks key={i} task={task} />
  ))
  let mappedInProgress = inProgress.map((task, i) => (
    <Tasks key={i} task={task} />
  ))
  let mappedComplete = complete.map((task, i) => (
    <Tasks key={i} task={task} />
  ))

  // console.log(newTasks)
  // console.log(inProgress)
  // console.log(complete)
  return (
    <div>
      <Folders />
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
