import React, {useState, useEffect} from "react";
import './AddTask.css'
import axios from 'axios'
import {Link, Route} from 'react-router-dom'
import FolderSearch from './FolderSearch/FolderSearch'
import EmployeeSearch from './EmployeeSearch/EmployeeSearch'
import EmSearch from './EmployeeSearch/EmSearch'


function AddTask(props) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [folder_id, setFolderId] = useState(0)
  const [employee_id, setEmpId] = useState(0)
  const [img, setImg] = useState('')
  const [description, setDescription] = useState('')
  const [chooseFolder, setChooseFolder] = useState(true)
  const [assign, setAssign] = useState(true)
  const [selectedFolder, setSelectedFolder] = useState([])
  const [searchFolder, setSearchFolder] = useState('')
  
  const [assigned, setAssigned] = useState([])
  
  // useEffect(() => {
  //   const results = people.filter(person => person.toLowerCase().includes(searchFolder))
  //   setFolderResults(results)
  // }, [searchFolder])

    const getOneTask = async () => {
      await axios.get(`/api/task/${props.match.params.task_id}`)
        .then(res => {
          console.log(res.data)
          const {employee_id, first_name, last_name, profile_pic, folder_id, name} = res.data[0]
          setTitle(res.data[0].title)
          setStatus(res.data[0].status)
          setFolderId(res.data[0].folder_id)
          setEmpId(res.data[0].employee_id)
          setAssigned([...assigned, {employee_id, first_name, last_name, profile_pic}])
          setSelectedFolder([...selectedFolder, {folder_id, name}])
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
      const {employee_id} = assigned[0]
      const {folder_id} = selectedFolder[0]
      axios.post(`/api/create-task`, {title, img, description, status, employee_id, folder_id})
      .then(() => {
        props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
    }

  const editTask = () => {
    const { employee_id } = assigned[0]
    const { folder_id } = selectedFolder[0]
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

  useEffect(() => {
    setTitle('')
    setStatus('New')
    setFolderId(0)
    setEmpId(0)
    setAssigned([])
    setImg('')
    setDescription('')
  }, [props.match.params.task_id])

  const handleAssign = (person) => {
    //if statement that doesn't allow you to add people twice
    setAssigned((assigned) => [...assigned, person]);
  }
  const cancelAssign = () => {
    setAssigned((assigned) => ([]))
  }

  const handleSelectFolder = (folder) => {
    setSelectedFolder((selectedFolder) => [folder]);
  }
  const cancelFolder = () => {
    setSelectedFolder((selectedFolder) => ([]))
  }

  console.log(selectedFolder)
  console.log(assigned)


  const showSelectedFolder = selectedFolder.map((folder, i) => (
    <div key={i} className='search-result'>
      <span className='name-result'>{folder.name}</span>
      <button onClick={cancelFolder}>X</button>
    </div>
  ))

  
  const showAssigned = assigned.map((person, i) => (
    <div key={i} className='search-result'>
      <img className='em-search-image' src={person.profile_pic} />
      <span className='name-result'>{person.first_name} {person.last_name} </span>
      <button onClick={cancelAssign}>X</button>
    </div>
  )) 

  
  console.log(assigned)
    return (
      <div className='add-task-page'>
        <div className='add-task-container'>
          <input
            value={title}
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />

          {showSelectedFolder}
          <FolderSearch 
            selectedFolder={selectedFolder}
            handleSelectFolder={handleSelectFolder}
            
          />
        {showAssigned}
          <EmSearch 
            assigned={assigned}
            handleAssign={handleAssign}
          />
          

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
