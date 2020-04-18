import React, {useState, useEffect} from 'react';
import './Folders.css'
import axios from 'axios'

class Folders extends React.Component{
    // const [folders, setFolders] = useState([])

    // useEffect(() => {
    //     getFolders()
    // }, [])

    // getFolders= () => {
    //     axios.get(`/api/folders`)
    //     .then(response => {
    //         setFolders([...folders, {
    //             id: folders.length,
    //             value: response.data
    //         }])
    //     })
    // }
    constructor(){
        super()
        this.state = {
            folders: []
        }
    }
    

    getFolders(){
        axios
          .get(`/api/folders`)
          .then((response) => {
            this.setState({ folders: response.data });
          })
          .catch(err => {
            console.log(err)
          });
    }
    componentDidMount() {
      this.getFolders()
    }
    render(){
        console.log(this.props)
        const mappedFolders = this.state.folders.map((folder, i) => (
          console.log(folder.folder_id),
            <div key={i}>
            <span onClick={() => {this.props.selectFolder(folder.folder_id)}}>{folder.name}</span>
            </div>
        ))
              return (
                <div className="folder-container">
                  <div className='folders'>{mappedFolders}</div>
                </div>
              );
            }
}

export default Folders;