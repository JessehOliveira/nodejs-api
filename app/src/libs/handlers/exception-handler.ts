import { ErrorsType } from "../exceptions/errors-type";
import { InvalidTokenError } from "../exceptions/invalid-token-error";
import { ExampleAlreadyExistsError } from "../exceptions/example-already-exists-error";
import { Request, Response, NextFunction } from 'express';
import { ExampleNotFoundError } from "../exceptions/example-not-found";
import ORMExceptions from "../orm/exceptions";
import Log from "../core/log";
import { BaseErrorMetadata } from "../exceptions/base-error";

/**
 * @openapi
 * components:
 *   schemas:
 *     exception:
 *       type: object
 *       required:
 *       - code
 *       - message
 *       properties:
 *         code:
 *           $ref: '#/components/schemas/errorsCode'
 *         message:
 *           type: string
 *           description: Exception message.
 *         details:
 *           type: string
 *           example: guilherme.portugues@superlogica.com
 */

/**
 * @openapi
 * components:
 *   responses:
 *     internalServerError:
 *       description: Unknow server error.
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *             - $ref: '#/components/schemas/exception'
 *             - properties:
 *                 code:
 *                   example: UNKNOW_ERROR
 */
const exceptionHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {

    const isORMException = ORMExceptions.analize(error, {
        dataIntegrity: (ormError) => {
            generateResponse(
                ErrorsType.DATA_INTEGRITY_VIOLATION,
                "Record is linked to another record.",
                ormError.message,
                request,
                response.status(400)
            )
        }
    })

    if (isORMException) return

    if (error instanceof InvalidTokenError) {
        generateResponse(
            error.code,
            error.message,
            undefined,
            request,
            response.status(401)
        )
        return
    }

    if (error instanceof ExampleNotFoundError) {
        generateResponse(
            error.code,
            error.message,
            undefined,
            request,
            response.status(404)
        )
        return
    }

    if (error instanceof ExampleAlreadyExistsError) {
        generateResponse(
            error.code,
            error.message,
            undefined,
            request,
            response.status(409)
        )
        return
    }

    generateResponse(
        ErrorsType.UNKNOW_ERROR,
        error.message,
        undefined,
        request,
        response.status(500)
    )
}

interface ExceptionRestLog extends BaseErrorMetadata {
    method: string,
    request: string
    httpCode: number
}

const generateResponse = (code: ErrorsType, message: string, details: string | undefined, request: Request, response: Response): Response => {

    log(
        response.statusCode >= 500,
        {
            method: request.method,
            request: request.url,
            code: code,
            message: message,
            details: details,
            httpCode: response.statusCode
        }
    )
    
    return response.json(
        {code: code, message: message, details: details}
    )
}

const log = (serverError: boolean, restLog: ExceptionRestLog) => {
    const tags = ['REST']

    if (serverError) {
        Log.taggedCritical(tags, restLog)
        return 
    }

    Log.taggedDebug(tags, restLog)
}

export default exceptionHandler;