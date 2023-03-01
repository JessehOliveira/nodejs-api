import Express, { Request, Response } from 'express';
import exceptionHandler from './libs/handlers/exception-handler';


let app = Express();

app.disable("x-powered-by");

app.use(Express.json())
app.use(Express.urlencoded({ extended: true}))

app.use('/', require('./routes'));
 
app.get('*', function (request: Request, response: Response) {
  response.sendStatus(404);
})

app.use(exceptionHandler)

let port = process.env.SERVER_PORT

// start to listen
app.listen(port, () => {
  console.log(`Server is listening on -p ${port}...\n`);
});

export default app;