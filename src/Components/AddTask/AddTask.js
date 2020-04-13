import React, {useState} from "react";
import axios from 'axios'

function AddTask(props) {
    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')

    const createTask = () => {
      axios.post(`/api/create-task`, {title, img, description})
      .then(() => {
        props.history.push('/dashboard')
      })
    }
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
