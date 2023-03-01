import { Request, Response, NextFunction } from 'express';

const noContentHandler = (request: Request, response: Response, next: NextFunction) => {
    response
        .status(204)
        .end()
}

export default noContentHandler;