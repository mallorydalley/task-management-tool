import React, {useState, useEffect} from "react";
import axios from 'axios'

function AddTask(props) {
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('')
    const [folder_id, setFolderId] = useState('')
    const [employee_id, setEmpId] = useState('')
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')


    useEffect(() => {
      getOneTask()
    }, [])

    const getOneTask = async () => {
      axios.get(`/api/task/${props.match.params.task_id}`)
        .then(res => {
          console.log(res.data),
          setTitle(res.data[0].title),
          setStatus(res.data[0].status),
          setFolderId(res.data[0].folder_id),
          setEmpId(res.data[0].employee_id),
          setImg(res.data[0].img),
          setDescription(res.data[0].description)
        })
        .catch(err => console.log(err))
    }

    const createTask = () => {
      axios.post(`/api/create-task`, {title, img, description})
      .then(() => {
        props.history.push('/dashboard')
      })
    }

    const editTask = (title, img, description) => {
      axios.put(`/api/task/${props.match.params.task_id}`)
    }

    console.log(props)
    return (
      <div>
        <div>
          <input
            value={title}
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />
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
          <button onClick={createTask}>Save</button>
        </div>
      </div>
    );
  
}

export default AddTask;
