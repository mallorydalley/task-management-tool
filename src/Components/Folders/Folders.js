import React from 'react';
import './Folders.scss'
import axios from 'axios'

class Folders extends React.Component{
    constructor(){
        super()
        this.state = {
            folders: [],
            name: '',
            newFolder: false
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

    createFolder = () => {
      const {name} = this.state
      axios.post(`/api/create-folder`, {name})
      .then(res => {
        this.setState({folders: [...this.state.folders, res.data], name: ''})
        console.log(this.state.folders)
      })
      .catch(err => console.log(err))
    }

    toggleNewFolder= ()=> {
      this.setState({newFolder: !this.state.newFolder})
    }

    handleChange = e => {
      this.setState({name: e.target.value})
    }

    componentDidUpdate(prevProps, prevState){
      if(prevState.folders !== this.state.folders){
        return this.state.folders;
      }
    }
    render(){
      const {name, folders, newFolder} = this.state
        // console.log(name)

        const mappedFolders = folders.map((folder, i) => (
          <div key={i} className="mapped-folders">
            <span
              className='shown-folders'
              onClick={() => {
                this.props.selectFolder(folder.folder_id);
              }}
            >
              {folder.name}
            </span>
          </div>
        ));
      return (
        <div className="folder-section">
          <div className="folder-container">
            <div className="folder-plus">
              <span className="folder-span">Folders</span>
              <button className='plus-btn' onClick={this.toggleNewFolder}></button>
            </div>
            {newFolder ? (
              <div className="input-and-btn">
                <input
                  className="folder-input"
                  placeholder="New folder"
                  value={name}
                  onChange={this.handleChange}
                  onSubmit={this.createFolder}
                />
               
                  <button className="folder-button" onClick={this.createFolder}>
                    Save
                  </button> 
               
              </div>
            ) : null}

            <div className="folders">
              <div className="folder">{mappedFolders}</div>
            </div>
          </div>
        </div>
      );
            }
}

export default Folders;