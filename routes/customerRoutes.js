const express = require('express');
const {getCustomer, createCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/customerContoller.js');

const router = express.Router();

router.route('/')
    .get(getCustomers)
    .post(createCustomer)

router.route('/:id')
    .get(getCustomer)
    .patch(updateCustomer)
    .delete(deleteCustomer)

module.exports = router;