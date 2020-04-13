import React, {useState, useEffect} from "react";
import './Dashboard.css'
import axios from 'axios';
import Tasks from "../Tasks/Tasks";
import Folders from '../Folders/Folders'

class Dashboard extends React.Component{
  // const [tasks, setTasks] = useState([])
  // const getAllTasks = () => {
  //   axios.get(`/api/all-tasks`)
  //   .then(res => {
  //     console.log(res.data)
  //     setTasks([...tasks, {
  //       id: tasks.length,
  //       value: res.data
  //     }]);
  //   })
  //   .catch(err => console.log(err))
  // }

  constructor(props){
    super(props)
    this.state = {
      newTasks: []
    }
  }
  componentDidMount(){
    this.getAllTasks()
  }
  getAllTasks(){
    axios.get(`/api/all-tasks`)
    .then(response => {
      console.log(response.data)
      this.setState({newTasks: response.data})
    })
    .catch(err => console.log(err))
  }
  render(){
    // console.log(this.state.newTasks)
    const mappedTasks = this.state.newTasks.map((task, i) => (
      <Tasks key={i} task={task} />
    ))
            return (
              <div>
                <Folders />
                <div className="dash">
                  <div className="posts-column">
                    <span>New</span>
                    {mappedTasks}
                  </div>
                  <div className="posts-column">
                    <span>In Progress</span>
                  </div>
                  <div className="posts-column">
                    <span>Completed</span>
                  </div>
                </div>
              </div>
            );
          }
}

export default Dashboard;
