import React, {useState, useEffect} from 'react';

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

    const handleChange = e => {
        setSearchTerm(e.target.value)
    }

    const handleToggle = () => {
        setStartSearch(!startSearch)
    }

    useEffect(() => {
        const results = people.filter(person => person.toLowerCase().includes(searchTerm))
        setSearchResults(results)
    }, [searchTerm])

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
                    <ul>
                        {searchResults.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>   
                </div>
            )}
            
        </div>
    )
}

export default EmployeeSearch;