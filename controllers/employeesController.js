const data = {}
data.employees = require('../model/employees.json');

    const getAllEmployees = (req, res) => {
        res.json(data.employees);
    }

    const createEmployees = (req, res) => {
        res.json({
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname
        });
    }

    const updateEmployees = (req, res) => {
        res.json({
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname
        });
    }

    const deleteEmployes = ((req, res) => {
        res.json({ "id" : req.body.id });
    });

    const getEmployees = (req, res) => {
        res.json({ "id": req.params.id });
    }

module.exports = {
    getAllEmployees,
    createEmployees,
    updateEmployees,
    deleteEmployes,
    getEmployees
};
