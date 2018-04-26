import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema';

const app = express();
const PORT = 3333;

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: '/graphql'
    })
);

app.listen(PORT, err => {
    if (err) {
        console.log('Error starting Express...', err);
    } else {
        console.log(
            `Express GraphQL Server is running. Access GraphiQL: http://localhost:${PORT}/graphiql`
        );
    }
});
