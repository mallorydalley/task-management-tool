module.exports = {
    getEmployees: (req, res) => {
        const db = req.app.get('db')

        db.employees.get_employees()
        .then(employees => res.status(200).send(employees))
        .catch(err => res.status(500).send(err))
    }
}