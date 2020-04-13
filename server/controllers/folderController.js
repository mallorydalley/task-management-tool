module.exports = {
    getFolders: async (req, res) => {
        const db = req.app.get('db')

        db.folders.get_folders()
        .then(folders => res.status(200).send(folders))
        .catch(err => res.status(500).send(err))
    }
}