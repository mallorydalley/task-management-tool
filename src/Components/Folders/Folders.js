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
    componentDidMount(){
        this.getFolders()
    }

    getFolders(){
        axios
          .get(`/api/folders`)
          .then((response) => {
            this.setState({ folders: response.data });
          })
          .catch((err) => console.log(err));
    }
    render(){
        console.log(this.state.folders)
        const mappedFolders = this.state.folders.map((folder, i) => (
            <div key={i}>
                {folder.name}
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