import React from 'react';
import axios from 'axios'
import './Search.scss'

class EmSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            startSearch: true,
            searchTerm: '',
            employees: [],
            assigned: this.props.assigned
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
    
    
    render(){
        const {searchTerm, startSearch, employees, assigned} = this.state

        const filteredSearch = employees.filter((person, i) => {
            let name = `${person.first_name} ${person.last_name}`

            if(name.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
                return name
            } else {
                return null
            }
        })

        return (
          <div>
            {/* {showAssigned} */}
            {startSearch 
            ? (
              <span className="toggle" onClick={this.handleToggle}>
                Assign +
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

                  <button className='close-button' onClick={this.handleToggle}>Close</button>
                </div>

                <ul>
                  {filteredSearch.map((person, i) => {
                    return (
                      <li key={i}>
                        <div
                          className="search-result"
                          onClick={() => {
                            this.props.handleAssign(person);
                          }}
                        >
                          <img
                            className="em-search-image"
                            src={person.profile_pic}
                          />
                          <span className="name-result">
                            {person.first_name} {person.last_name}{" "}
                          </span>
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

export default EmSearch;