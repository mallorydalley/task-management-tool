import React, {useState, useEffect} from "react";
import './AddTask.css'
import axios from 'axios'
import {Link, Route} from 'react-router-dom'
import FolderSearch from './FolderSearch/FolderSearch'
import EmployeeSearch from './EmployeeSearch/EmployeeSearch'
// import Dropdown from 'react-dropdown'
// import 'react-dropdown/style.css'


function AddTask(props) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [folder_id, setFolderId] = useState(1)
  const [employee_id, setEmpId] = useState(1)
  const [img, setImg] = useState('')
  const [description, setDescription] = useState('')
  const [chooseFolder, setChooseFolder] = useState(true)
  const [assign, setAssign] = useState(true)
  const [searchFolder, setSearchFolder] = useState('')
  const [folderResults, setFolderResults] = useState([])

  const people = [
    "Siri",
    "Alexa",
    "Google",
    "Facebook",
    "Twitter",
    "Linkedin",
    "Sinkedin"
  ];
  
  useEffect(() => {
    const results = people.filter(person => person.toLowerCase().includes(searchFolder))
    setFolderResults(results)
  }, [searchFolder])

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
        .catch(err => {
          console.log(err)
        });
    } 

     useEffect(() => {
      getOneTask()
    }, [])

    const createTask = () => {
      axios.post(`/api/create-task`, {title, img, description, status, employee_id, folder_id})
      .then(() => {
        props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
    }

  const editTask = () => {
      axios.put(`/api/task/${props.match.params.task_id}`, { title, img, description, status, employee_id, folder_id})
      .then(() => {
        props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
    }

    const folderSearch = () => {
      setChooseFolder(!chooseFolder)
    }

    const assignEmployee = () => {
      setAssign(!assign)
    }

    const handleFolder = e => {
      setSearchFolder(e.target.value)
    }

  

  console.log(chooseFolder)
  // console.log(status)
    return (
      <div className='add-task-page'>
        <div className='add-task-container'>
          <input
            value={title}
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <FolderSearch />
          <EmployeeSearch />
          {/* Folder Search */}
          {/* {chooseFolder
            ? (
              <span onClick={folderSearch}>Choose Folder</span>
            ) : (
              <div>
                <input 
                  placeholder='Search folders' 
                  value={searchFolder}
                  onChange={handleFolder}
                />
                <button>Add</button>
                <ul>
                  {folderResults.map(item => (
                    <li>{item}</li>
                  ))}
                </ul>
              </div>
            )
          } */}

          {/* Assign Employee */}
          {/* {assign
            ? (
              <span onClick={assignEmployee}>Assign +</span>
            ) : (
              <div>
                <input placeholder='Search' />
                <button>Add</button>
              </div>
            )
          } */}

          

          {/* <Dropdown options={options}  value={defaultOption} placeholder="Select an option" /> */}
          <select id="status" value={status} onChange={e => setStatus(e.target.value)}>
            <option value='New'>New</option>
            <option value='In Progress'>In Progress</option>
            <option value='Complete'>Complete</option>
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

          {/* socket.io */}
          {/* <div className='message-container'>
            <form className='send-container'>
              <input 
                type='text'    
                id='message-input' 
              />
              <button 
                type='submit' id='send-button'
                > Send
                </button>
            </form>
          </div> */}

         

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
