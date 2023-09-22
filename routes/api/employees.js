const express = require('express')
const router = express.Router();
const employeesController = require('../../controllers/employeesController')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createEmployees)
    .put(employeesController.updateEmployees)
    .delete(employeesController.deleteEmployes)

router.route('/:id')
    .get(employeesController.getEmployees);

module.exports = router;
