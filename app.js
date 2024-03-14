import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url'
import path from 'path'

const app = express();
const port = 8000;

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8'));

const defaultRouter = (req, res, next) => {
    res.send('<h1> Hello FSW 1 </h1>');
}

const getCustomers = (req, res, next) => {
    console.log(`req params : ${req.params}`);
    res.status(200).json({
        status: 'success',
        totalData: customers.length,
        data: {
            customers,
        },
    });
}

const getCustomer = (req, res, next) => {
    const { id } = req.params;

    const customer = customers.find((cust) => cust._id === id);

    res.status(200).json({
        status: 'success',
        data: {
            customer,
        },
    });
}

const updateCustomer = (req, res, next) => {
    const id = req.params.id;
    const customer = customers.find(cust => cust._id === id);
    const customerIndex = customers.findIndex(cust => cust._id === id);

    customers[customerIndex] = { ...customers[customerIndex], ...req.body }

    if (!customer) {
        return res.status(404).json({
            status: 'fail',
            message: 'id customer tidak ditemukan'
        })
    }

    fs.writeFile(`${__dirname}/data/data.json`, JSON.stringify(customers), (err) => {
        res.status(200).json({
            status: 'success',
            message: 'Berhasil update data',
            data: {
                customer: customers[customerIndex], customer
            }
        })
    })
}

const deleteCustomer = (req, res) => {
    const id = req.params.id
    const customer = customers.find(cust => cust._id === id);
    const customerIndex = customers.findIndex(cust => cust._id === id)

    if (!customer) {
        return res.status(404).json({
            status: 'fail',
            message: 'id customer tidak ditemukan'
        })
    }

    customers.splice(customerIndex, 1)

    fs.writeFile(`${__dirname}/data/data.json`, JSON.stringify(customers), (err) => {
        res.status(200).json({
            status: 'success',
            message: 'Berhasil delete data',
        })
    })
}

const createCustomer = (req, res) => {
    const newCustomer = req.body;

    customers.push(req.body);
    fs.writeFile(`${__dirname}/data/data.json`, JSON.stringify(customers), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                customer: newCustomer
            }
        })
    });
}

app.get('/', defaultRouter);

app.get('/api/v1/customers', getCustomers);

app.get('/api/v1/customers/:id', getCustomer);

app.patch('/api/v1/customers/:id', updateCustomer);

app.delete('/api/v1/customers/:id', deleteCustomer);

app.post('/api/v1/customers', createCustomer);

app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
});