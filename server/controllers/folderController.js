module.exports = {
    getFolders: (req, res) => {
        const db = req.app.get('db')

        db.folders.get_folders()
        .then(folders => res.status(200).send(folders))
        .catch(err => res.status(500).send(err))
    },
    createFolder: (req, res) => {
        const {name} = req.body
        const db = req.app.get('db')

        db.folders.create_folder({name})
        .then(() => res.sendStatus(200))
        .catch(err => {
            res.status(500).send('Folder not created')
            console.log(err)
        })
    }
}