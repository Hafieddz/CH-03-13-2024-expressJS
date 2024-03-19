const fs = require('fs');

const customers = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`, 'utf-8'));

const getCustomers = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        requestAt: req.requestTime,
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

module.exports =  { createCustomer, getCustomer, getCustomers, deleteCustomer, updateCustomer }