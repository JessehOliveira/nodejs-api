import { Request, Response, NextFunction } from 'express';

const successHandler = (request: Request, response: Response, next: NextFunction) => {
    response
        .status(200)
        .json(response.locals.data)
}

export default successHandler;