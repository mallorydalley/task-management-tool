module.exports = {
    getAllTasks: async (req, res) => {
        const db = req.app.get('db')

        await db.tasks.get_all_tasks()
          .then(tasks => res.status(200).send(tasks))
          .catch((err) => res.status(500).send(err));
    },
    getOneTask: async (req, res) => {
      const db = req.app.get('db')
      const {task_id} = req.params

      await db.tasks.get_one_task(task_id)
      .then(result => res.status(200).send(result))
      .catch(err => {
        res.status(500).send('Oops!')
        console.log(err)
      })
    },
    createTask: (req, res) => {
        const {title, img, description, status, employee_id, folder_id} = req.body
        const db = req.app.get('db')

        db.tasks.create_task({ title, img, description, status, employee_id, folder_id })
          .then(() => res.sendStatus(200))
          .catch((err) => {
            res.status(500).send(`Oops! Task couldn't be created.`);
            console.log(err);
          });
    },
    editTask: (req, res) => {
      const {task_id} = req.params
      const { title, img, description, status, employee_id, folder_id } = req.body
      const db = req.app.get('db')
      
      db.tasks.edit_task({ task_id, title, img, description, status, employee_id, folder_id })
      .then(result => {
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(500).send('Oops!')
        console.log(err)
      })
    }
}