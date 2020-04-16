import React, {useState, useEffect} from 'react';
import axios from 'axios'

function EmployeeSearch(props){

    const people = [
        "Siri",
        "Alexa",
        "Google",
        "Facebook",
        "Twitter",
        "Linkedin",
        "Sinkedin"
    ];
    const [startSearch, setStartSearch] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [employees, setEmployees] = useState([])

    const getEmployee = () => {
        axios.get(`/api/employees`)
        .then(res => {
            setEmployees(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getEmployee()
    }, [])

   

    const handleChange = e => {
        setSearchTerm(e.target.value)
    }

    // let showEmployees = employees
    // .filter((person, i) => {
    //     return person.includes(searchTerm)
    // })
    // .map((person, i) => {
    //         return <h4 key={i}>{person}</h4>
    //     })

    const handleToggle = () => {
        setStartSearch(!startSearch)
    }

    // useEffect(() => {
    //     const results = employees.filter(person => {
            // console.log(person)
        //     const name = `${person.first_name} ${person.last_name}`
        //     console.log(name)

        //     if (name.toLowerCase().includes(searchTerm.toLowerCase())){
        //         return name
        //     } else{
        //         return null
        //     }
        // })
        // console.log(results)
        // console.log(searchResults)
        // setSearchResults(results)
        // setSearchResults([...results])
        // setSearchResults([...searchResults, results])
        // setSearchResults((searchResults) => [...searchResults, results])
    // }, [searchTerm])

    const handleSearch = () => {

    }

    // console.log(employees)
    console.log(searchResults)
    return (
        <div>
            {startSearch
            ?(
                <span onClick={handleToggle}>Assign +</span>
            ):(
                <div>
                    <input
                        type='text'
                        placeholder='Search'
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button onClick={handleToggle}>Cancel</button>

                    {employees}
                    {/* {showEmployees} */}
                    {/* <ul>
                        {searchResults.map((item, i) => (
                            <li key={i}>{item}</li> */}
                            {/* onclick adds to array that maps and displays who is assigned
                         ))}
                    </ul>    */}
                </div>
            )}
            
        </div>
    )
}

export default EmployeeSearch;