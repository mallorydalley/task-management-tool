import React, { useState, useEffect } from "react";

function FolderSearch(props){
    const [chooseFolder, setChooseFolder] = useState(true)
    const [searchFolder, setSearchFolder] = useState('')
    const [folderResults, setFolderResults] = useState([])

    const people = [
        "Siri",
        "Alexa",
        "Google",
        "Facebook",
        "Twitter",
        "Linkedin",
        "Sinkedin"
    ];
    useEffect(() => {
        const results = people.filter(person => person.toLowerCase().includes(searchFolder))
        setFolderResults(results)
    }, [searchFolder])

    const folderSearch = () => {
        setChooseFolder(!chooseFolder)
    }

    const handleFolder = e => {
        setSearchFolder(e.target.value)
    }

    return (
        <div>
        {chooseFolder
                ?(
              <span onClick = { folderSearch } > Search Folder</span>
            ) : (
        <div>
            <input
                placeholder='Search folders'
                value={searchFolder}
                onChange={handleFolder}
            />
            <button>Add</button>
            <ul>
                {folderResults.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    )
}
        </div>
    )
}

export default FolderSearch;