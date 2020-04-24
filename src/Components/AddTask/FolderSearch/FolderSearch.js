import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import './FolderSearch.scss'

class FolderSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startSearch: true,
            searchTerm: '',
            folders: [],
            selectedFolder: this.props.selectedFolder
        }
    }
    getFolders = () => {
        axios.get(`/api/folders`)
            .then(res => {
                // setEmployees(res.data)
                this.setState({ folders: res.data })
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        this.getFolders()
    }
    handleChange = e => {
        this.setState({ searchTerm: e.target.value })
        // setSearchTerm(e.target.value)
    }

    handleToggle = () => {
        this.setState({ startSearch: !this.state.startSearch })
        // setStartSearch(!startSearch)
    }

    
    render() {
        const { searchTerm, startSearch, folders, selectedFolder } = this.state

        const filteredSearch = folders.filter((folder, i) => {

            if (folder.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                return folder.name
            } else {
                return null
            }
        })
       
        // console.log(selectedFolder)
        // console.log(this.props)
        return (
          <div>
            {startSearch ? (
              <span
                className="toggle"
                onClick={this.handleToggle}
              >
                Select Folder
              </span>
            ) : (
              <div className="search-input-and-results">
                  <div className='search-bar-and-button'>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={this.handleChange}
                />

                <button className="close-button" onClick={this.handleToggle}>
                  Close
                </button>
                </div>

                <ul>
                  {filteredSearch.map((folder, i) => {
                    return (
                      <li key={i}>
                        <div
                          className="search-result"
                          onClick={() => {
                            this.props.handleSelectFolder(folder);
                          }}
                        >
                          <span className="name-result">{folder.name} </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
    }
}

export default FolderSearch;