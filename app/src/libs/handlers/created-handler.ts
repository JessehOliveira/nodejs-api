import { Request, Response, NextFunction } from 'express';

const createdHandler = (request: Request, response: Response, next: NextFunction) => {
    response
        .status(201)
        .json(response.locals.data)
}

export default createdHandler;