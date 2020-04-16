import React, { useState, useEffect } from "react";
import axios from 'axios'

function FolderSearch(props){
    const [chooseFolder, setChooseFolder] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [folderResults, setFolderResults] = useState([])
    const [selectedFolder, setSelectedFolder] = useState('')
    const [folders, setFolders] = useState([])

    const people = [
        "Siri",
        "Alexa",
        "Google",
        "Facebook",
        "Twitter",
        "Linkedin",
        "Sinkedin"
    ];

    const getFolders = () => {
        axios
            .get(`/api/folders`)
            .then((res) => {
                // console.log(res.data)
                // const data = res.data
                setFolders(res.data);

                // const req = res.data.map((ele, i) => {
                //     console.log(ele.name)
                //     setFolders([...folders, {
                //         id: folders.length,
                //         value: ele.name
                //     }])
                // })
                // setFolders(req)
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getFolders()
    }, [])

    useEffect(() => {
        const results = folders.filter((ele, i) => {
            console.log(ele.name)
                ele.name.toLowerCase().includes(searchTerm)
        })
        setFolderResults(results)
    }, [searchTerm])

    // useEffect(() => {
    //     const results = folders.filter(folder => {
    //         console.log(folder)
    //         folder.map((ele, i) => {
    //             ele[i].name.toLowerCase().includes(searchTerm)
    //         })
    //     //    folder.name.toLowerCase().includes(searchTerm)})
    //     setFolderResults(results) 
    // }, [searchTerm])

    const folderSearch = () => {
        setChooseFolder(!chooseFolder)
    }

    const handleFolder = e => {
        setSearchTerm(e.target.value)
    }

    // console.log(folderResults)
    // console.log(folders)
    return (
        <div>
        {chooseFolder
                ?(
              <span onClick = { folderSearch } > Search Folder</span>
            ) : (
        <div>
            <input
                placeholder='Search folders'
                value={searchTerm}
                onChange={handleFolder}
            />
            <button onClick={folderSearch}>Add</button>
            <ul>
                {folderResults.map((item, i) => (
                    <li key={i} onClick={setSelectedFolder(item)}>{item}</li>
                ))}
            </ul>
            {selectedFolder}
        </div>
    )
}
        </div>
    )
}

export default FolderSearch;