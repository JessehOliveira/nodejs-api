import Express, { Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import apiDoc from './api-doc';

const Router = Express.Router();

exports = module.exports = Router;

Router.get('/healthcheck', (request: Request, response: Response) => {
  response.status(200).send({
    ok: true,
   });
});

const openapiSpecification = swaggerJsdoc(apiDoc);

Router.get('/api-docs.json', (request: Request, response: Response) => {
  response.setHeader('Content-Type', 'application/json');
  response.send(openapiSpecification);
});

Router.use('/examples', require('./examples/routes'));