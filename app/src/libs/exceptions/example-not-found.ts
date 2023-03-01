import { BaseError } from './base-error';
import { ErrorsType } from './errors-type';

export class ExampleNotFoundError extends BaseError {
    constructor(id: number) {
        super(ErrorsType.EXAMPLE_NOT_FOUND, `Example ${id} not found`)
    }
}