import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { resolvers } from './src/resolvers';
import { expressMiddleware } from '@apollo/server/express4';
import fs from 'fs';
import BodyParser from 'body-parser'


const app = express();
const port = 3000;
dotenv.config();

const schema = fs.readFileSync(__dirname.concat('/schema/typedefs.graphql'), 'utf8');
export const typeDefs = `${schema}`;


const initialization = (async () => {
  const server = new ApolloServer({typeDefs,resolvers});
  await server.start();
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server));
  app.use(BodyParser.urlencoded({ extended: true }));


  app.listen(port, () => {
    console.log(`started Listening open at: http://localhost:${port}/graphql`);
  });
})();

