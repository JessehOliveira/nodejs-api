import { BaseError } from './base-error';
import { ErrorsType } from './errors-type';

export class ExampleAlreadyExistsError extends BaseError {
    constructor() {
        super(ErrorsType.EXAMPLE_ALREADY_EXISTS, `Example already exists.`)
    }
}