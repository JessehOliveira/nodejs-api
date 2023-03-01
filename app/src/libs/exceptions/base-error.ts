import { CustomError } from 'ts-custom-error'
import { ErrorsType } from './errors-type'

export interface BaseErrorMetadata {
    code: ErrorsType
    message: string
    details?: string
}

export class BaseError extends CustomError implements BaseErrorMetadata {
    public constructor(
        public code: ErrorsType,
        message?: string,
        public details?: string,
    ) {
        super(message)
    }
}