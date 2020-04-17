module.exports = {
    getEmployees: (req, res) => {
        const db = req.app.get('db')

        db.employees.get_employees()
        .then(employees => res.status(200).send(employees))
        .catch(err => res.status(500).send(err))
    },
    getOneEmployee: (req, res) => {
        const db = req.app.get('db')
        const {employee_id} = req.params
        console.log(employee_id)

        db.employees.get_one_employee(employee_id)
        .then(person => res.status(200).send(person))
        .catch(err => {
            res.status(500).send('Failed to retrieve employee')
            console.log(err)
        })
    }
}