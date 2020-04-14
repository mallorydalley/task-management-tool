import React, {useState, useEffect} from "react";
import './AddTask.css'
import axios from 'axios'
import {Link, Route} from 'react-router-dom'
// import Dropdown from 'react-dropdown'
// import 'react-dropdown/style.css'


function AddTask(props) {
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('')
    const [folder_id, setFolderId] = useState('')
    const [employee_id, setEmpId] = useState('')
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')
  const options = [
    'New', 'In Progress', 'Complete'
  ]
  const defaultOption = options[0]


    
    // useEffect(() => {
    //   getOneTask()
    // }, [])

    const getOneTask = () => {
      axios.get(`/api/task/${props.match.params.task_id}`)
        .then(res => {
          console.log(res.data)
          setTitle(res.data[0].title)
          setStatus(res.data[0].status)
          setFolderId(res.data[0].folder_id)
          setEmpId(res.data[0].employee_id)
          setImg(res.data[0].img)
          setDescription(res.data[0].description)
        })
        .catch(err => console.log(err))
    }

    const createTask = () => {
      axios.post(`/api/create-task`, {title, img, description, status, employee_id, folder_id})
      .then(() => {
        props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
    }

    const editTask = (task_id, title, img, description) => {
      axios.put(`/api/task/${task_id}`, {title, img, description})
      .then(() => {
        props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
    }

    console.log(props)
    console.log(title)
    return (
      <div className='add-task-page'>
        <div className='add-task-container'>
          <input
            value={title}
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* <Dropdown options={options}  value={defaultOption} placeholder="Select an option" /> */}
          <select id="status">
            <option value={options[0]}>New</option>
            <option value={options[1]}>In Progress</option>
            <option value={options[2]}>Complete</option>
          </select>
          <input
            value={img}
            placeholder="Attach image"
            onChange={(e) => setImg(e.target.value)}
          />
          <input 
            value={description}
            placeholder='Description'
            onChange={e => setDescription(e.target.value)}
          />

          {/* <button onClick={createTask}>Add Task</button> */}

          <Route 
            path='/add-task'
            render={() => (
              <button onClick={createTask}>Add Task</button>
            )}
          />

          <Route
            path='/edit/:task_id'
            render={() => (
              <button onClick={editTask}>Save</button>
            )}
          />
          
        </div>
      </div>
    );
  
}

export default AddTask;
