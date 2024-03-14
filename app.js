import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url'
import path from 'path'

const app = express();
const port = 8000;

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8'));

app.get('/', (req, res) => {
    res.send('<h1> Hello World <h1>');
});

// Get all data
app.get('/api/v1/customers', (req, res, next) => {
    console.log(`req params : ${req.params}`);
    res.status(200).json({
        status: 'success',
        totalData: customers.length,
        data: {
            customers,
        },
    });
});

// Get data by id
app.get('/api/v1/customers/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(id);

    const customer = customers.find((cust) => cust._id === id);
    console.log(customer);

    res.status(200).json({
        status: 'success',
        data: {
            customer,
        },
    });
});

// Create new data
app.post('/api/v1/customers', (req, res) => {
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
});

app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
});