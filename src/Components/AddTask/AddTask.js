import React, {useState, useEffect} from "react";
import './AddTask.scss'
import axios from 'axios'
import {Link, Route} from 'react-router-dom'
import FolderSearch from './FolderSearch/FolderSearch'
import EmSearch from './EmployeeSearch/EmSearch'
import Chat from './Chat/Chat'
import io from 'socket.io-client'


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
  const [taskComments, setTaskComments] = useState([])

  const socket = io('localhost:4600')

    const getOneTask = async () => {
      await axios.get(`/api/task/${props.match.params.task_id}`)
        .then(res => {
          // console.log(res.data)
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

    const deleteTask = () => {
      axios.delete(`/api/task/${props.match.params.task_id}`)
      .then(() => {
        props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
    }

    // const folderSearch = () => {
    //   setChooseFolder(!chooseFolder)
    // }

    // const assignEmployee = () => {
    //   setAssign(!assign)
    // }

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
    setSelectedFolder([])
    setTaskComments([])
  }, [props.match.params.task_id])

  const handleAssign = (person) => {
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

  const showSelectedFolder = selectedFolder.map((folder, i) => (
    <div key={i} className='search-result'>
      <span className='name-result'>{folder.name}</span>
      <button className='remove' onClick={cancelFolder}>X</button>
    </div>
  ))

  
  const showAssigned = assigned.map((person, i) => (
    <div key={i} className='search-result'>
      <img className='em-search-image' src={person.profile_pic} />
      <span className='name-result'>{person.first_name} {person.last_name} </span>
      <button className='remove' onClick={cancelAssign}>X </button>
    </div>
  )) 

  const getComments = async () => {
    await axios.get(`/api/comments/${props.match.params.task_id}`)
      .then(res => {
        // console.log(res.data)
        setTaskComments(...taskComments, res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getComments()
  }, [])

const [room_id, setRoomId] = useState('')
const [obj, setObj] = useState({})

 
    return (
      <div className="add-task-page">
        <div className="add-task-container">
          <input
            className="title-input"
            value={title}
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>

          <div className="selection-field">
            <div className="assign-folder-container">
              <div className="assign-and-folder">
                <FolderSearch
                  selectedFolder={selectedFolder}
                  handleSelectFolder={handleSelectFolder}
                  cancelFolder={cancelFolder}
                />
                {showSelectedFolder}
              </div>
            </div>

            <div className="line-spacing"></div>

            <div className="assign-folder-container">
              <div className="assign-and-folder">
                <EmSearch assigned={assigned} handleAssign={handleAssign} />
                {showAssigned}
              </div>
            </div>
          </div>

          <input
            className="img-input"
            value={img}
            placeholder="Attach image"
            onChange={(e) => setImg(e.target.value)}
          />
          <textarea
            className="desc-input"
            value={description}
            placeholder="Description..."
            onChange={(e) => setDescription(e.target.value)}
          />

          <div>
            <button className="add-task-btns" onClick={deleteTask}>
              Delete
            </button>
            <Route
              path="/add-task"
              render={() => (
                <button className="add-task-btns" onClick={createTask}>
                  Add Task
                </button>
              )}
            />

            <Route
              path="/edit/:task_id"
              render={() => (
                <button className="add-task-btns" onClick={editTask}>
                  Save
                </button>
              )}
            />
          </div>
          <br />
          <Chat
            taskComments={taskComments}
            getComments={getComments}
            task_id={props.match.params.task_id}
          />
        </div>
      </div>
    );
  
}

export default AddTask;
