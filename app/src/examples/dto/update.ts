/**
 * @openapi
 * components:
 *   schemas:
 *     updateExample:
 *       type: object
 *       required:
 *       - email
 *       properties:
 *         name:
 *           type: string
 *           description: The examplo's name.
 *           example: Guilherme Portugues
 */
export interface ExampleUpdateDTO {
    name?: string
}