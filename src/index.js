import 'source-map-support/register';
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress} from 'graphql-server-express';
import {makeExecutableSchema} from 'graphql-tools';

import resolvers from './resolvers';
import schema from './schema';

const app = express();

const executableSchema = makeExecutableSchema({
	typeDefs: schema,
	resolvers
});

app.post('/graphql', 
	bodyParser.json(),
	graphqlExpress(() => ({
			schema: executableSchema
		})
	)
);

app.get('/', function(req, res) {
	res.send('This GraphQL only supports <a href="/post" > POST </a>');
});
app.listen(3456, function() { console.log('App running at 3456 port'); });
