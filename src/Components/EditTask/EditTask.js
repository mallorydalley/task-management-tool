import React, { useState, useEffect } from "react";
import './EditTask.css'
import axios from 'axios'

function EditTask(props){

    return (
        <div className='add-task-page'>
            <div className='add-task-container'>
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

                {/* <button onClick={createTask}>Add Task</button> */}

                {/* <Route 
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
          /> */}

            </div>
        </div>
    );
}