import typeDefs from './schema';
import createLoaders from './loaders';
import createResolvers from './resolvers';
import initPostgres from './resources/postgres';
import initJson from './resources/jsonServer';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import initFirebase from './resources/firebase';

export default function(app) {
    const jsonResources = initJson(app);
    const pgResources = initPostgres(app);
    const firebaseResources = initFirebase(app);
    const resolvers = createResolvers({
        jsonResources,
        pgResources,
        firebaseResources
    });

    const graphQLSchema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    app.use(
        '/graphiql',
        graphiqlExpress({
            endpointURL: '/graphql'
        })
    );

    app.use(
        '/graphql',
        bodyParser.json(),
        graphqlExpress({
            schema: graphQLSchema,
            context: {
                fun: true,
                loaders: createLoaders({
                    jsonResources,
                    pgResources,
                    firebaseResources
                })
            }
        })
    );
}
