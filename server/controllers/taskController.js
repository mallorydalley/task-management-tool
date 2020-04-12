module.exports = {
    getAllTasks: async(req, res) => {
        const db = req.app.get('db')

        db.tasks.get_all_tasks()
          .then(tasks => res.status(200).send(tasks))
          .catch((err) => res.status(500).send(err));
    }
}