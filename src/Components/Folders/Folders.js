import React from 'react';
import './Folders.scss'
import axios from 'axios'

class Folders extends React.Component{
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
        // console.log(this.props)
        const mappedFolders = this.state.folders.map((folder, i) => (
          // console.log(folder.folder_id),
            <div key={i}>
            <span onClick={() => {this.props.selectFolder(folder.folder_id)}}>{folder.name}</span>
            </div>
        ))
              return (
                <div className="folder-section">
                  <div className='folder-container'>
                    <span className='folder-span'>Folders</span>
                    <div 
                      className='folders'>
                      <div className='folder'>{mappedFolders}</div>
                    </div>
                  </div>
                </div>
              );
            }
}

export default Folders;