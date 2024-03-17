import express from 'express';
import {getCustomer, createCustomer, getCustomers, updateCustomer, deleteCustomer } from '../controllers/customerContoller.js'

const router = express.Router();

router.route('/')
    .get(getCustomers)
    .post(createCustomer)

router.route('/:id')
    .get(getCustomer)
    .patch(updateCustomer)
    .delete(deleteCustomer)

export default router;