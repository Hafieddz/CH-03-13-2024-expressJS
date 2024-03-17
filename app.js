import express from 'express';
import morgan from 'morgan';
import router from './routes/customerRoutes.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello FSW 1 ini adalah middleware kita sendiri....');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use(morgan('dev'));

const defaultRouter = (req, res, next) => {
    res.send('<h1> Hello FSW 1 </h1>');
}

app.use('/api/v1/customers', router);

export default app;