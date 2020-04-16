import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './EmSearch.css'

class EmSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            startSearch: true,
            searchTerm: '',
            searchResults: [],
            employees: [],
            assigned: []
        }
    }
    getEmployee = () => {
        axios.get(`/api/employees`)
            .then(res => {
                // setEmployees(res.data)
                this.setState({employees: res.data})
            })
            .catch(err => console.log(err))
    }
    componentDidMount(){
        this.getEmployee()
    }
    handleChange = e => {
        this.setState({searchTerm: e.target.value})
        // setSearchTerm(e.target.value)
    }

    handleToggle = () => {
        this.setState({startSearch: !this.state.startSearch})
        // setStartSearch(!startSearch)
    }
    handleAssign = (person) => {
        this.setState({assigned: [...this.state.assigned, person]})
    }
    render(){
        const {searchResults, searchTerm, startSearch, employees, assigned} = this.state

        const filteredSearch = employees.filter((person, i) => {
            console.log(person)
            let name = `${person.first_name} ${person.last_name}`
            console.log(name)

            if(name.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
                return name
            } else {
                return null
            }
        })

        // console.log(employees)
        // console.log(filteredSearch)
        console.log(assigned)
        return(
            <div>
                {startSearch
                    ? (
                        <span onClick={this.handleToggle}>Assign Class</span>
                    ) : (
                        <div>
                            <input
                                type='text'
                                placeholder='Search'
                                value={searchTerm}
                                onChange={this.handleChange}
                            />
                            <button onClick={this.handleToggle}>Cancel</button>

                            {/* {employees} */}
                            {/* {showEmployees} */}
                            <ul>
                        {filteredSearch.map((person, i) => {
                            // console.log(person)
                            // let {first_name} = person
                            return <li key={i}>
                                <div className='search-result' onClick={this.handleAssign}>
                                    <img className = 'em-search-image' src={person.profile_pic} />
                                    <span className='name-result'>{person.first_name} {person.last_name} </span>
                                </div>
                            </li>
                            
                        })}
                    </ul>   

                    {/* onclick adds to array that maps and displays who is assigned */}
                         </div>
                    )}

            </div>
        )
    }
}

export default EmSearch;