module.exports = {
    getComments: (req, res) => {
        const {task_id} = req.params
        const db = req.app.get('db')

        db.comments.get_comments(task_id)
        .then(comment => res.status(200).send(comment))
        .catch(err => res.status(500).send(err))
    },
    createComment: (req, res) => {
        console.log(req.body)
        const {comment, task_id, employee_id} = req.body
        const db = req.app.get('db')

        db.comments.create_comment({comment, task_id, employee_id})
        .then(() => res.sendStatus(200))
        .catch(err => {
            res.status(500).send('Comment not added')
            console.log(err)
        })
    }
}