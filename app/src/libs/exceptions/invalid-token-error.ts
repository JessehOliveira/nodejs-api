import { BaseError } from './base-error';
import { ErrorsType } from './errors-type';

export class InvalidTokenError extends BaseError {
    constructor() {
        super(ErrorsType.INVALID_TOKEN, `Invalid token`)
    }
}