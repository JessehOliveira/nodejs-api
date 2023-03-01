/**
 * @openapi
 * components:
 *   schemas:
 *     errorsCode:
 *       description: Exception code.
 *       type: string
 *       enum:
 *       - UNKNOW_ERROR
 *       - INVALID_TOKEN
 *       - DATA_INTEGRITY_VIOLATION
 *       - EXAMPLE_NOT_FOUND
 *       - EXAMPLE_ALREADY_EXISTS
 */
export enum ErrorsType {
    UNKNOW_ERROR = 'UNKNOW_ERROR',
    INVALID_TOKEN = 'INVALID_TOKEN',
    DATA_INTEGRITY_VIOLATION = 'DATA_INTEGRITY_VIOLATION',
    EXAMPLE_NOT_FOUND = 'EXAMPLE_NOT_FOUND',
    EXAMPLE_ALREADY_EXISTS = 'EXAMPLE_ALREADY_EXISTS',
}