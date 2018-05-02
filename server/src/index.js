import express from 'express';
import cors from 'cors';
const { Pool } = require('pg');
import initConfigs from '../src/configs';
import initAPI from './api';

const app = express();
const PORT = 3333;
app.use('*', cors());

initConfigs(app);
initAPI(app);

app.listen(PORT, err => {
    if (err) {
        console.log('Error starting Express...', err);
    } else {
        console.log(
            `Express GraphQL Server is running. Access GraphiQL: http://localhost:${PORT}/graphiql`
        );
    }
});
