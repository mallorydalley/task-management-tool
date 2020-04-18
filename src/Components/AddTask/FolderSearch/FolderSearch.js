import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import './EmSearch.css'

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

        // const showselectedFolder = selectedFolder.map((person, i) => (
        //     <div key={person.employee_id} className='search-result'>
        //         <img className='em-search-image' src={person.profile_pic} />
        //         <span className='name-result'>{person.first_name} {person.last_name} </span>
        //     </div>
        // ))

        // console.log(employees)
        // console.log(filteredSearch)
        console.log(selectedFolder)
        console.log(this.props)
        return (
            <div>
                {/* {showselectedFolder} */}
                {startSearch
                    ? (
                        <span onClick={this.handleToggle}>Select Folder</span>
                    ) : (
                        <div>
                            <input
                                type='text'
                                placeholder='Search'
                                value={searchTerm}
                                onChange={this.handleChange}
                            />
                            {/* <button onClick={this.handleAssign}>Assign</button> */}
                            <button onClick={this.handleToggle}>Cancel</button>

                            {/* {employees} */}
                            {/* {showEmployees} */}
                            <ul>
                                {filteredSearch.map((folder, i) => {
                                    // console.log(folder)
                                    // let {first_name} = folder
                                    return <li key={i}>
                                        <div className='search-result' onClick={() => { this.props.handleSelectFolder(folder) }}>
                                            
                                            <span className='name-result'>{folder.name} </span>
                                        </div>
                                    </li>

                                })}
                            </ul>

                            {/* onclick adds to array that maps and displays who is selectedFolder */}
                        </div>
                    )}

            </div>
        )
    }
}

export default FolderSearch;