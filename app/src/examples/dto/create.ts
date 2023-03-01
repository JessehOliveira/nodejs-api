/**
 * @openapi
 * components:
 *   schemas:
 *     createExample:
 *       type: object
 *       required:
 *       - email
 *       properties:
 *         name:
 *           type: string
 *           description: The examplo's name.
 *           example: Guilherme Portugues
 *         email:
 *           type: string
 *           description: The examplo's e-mail.
 *           example: guilherme.portugues@superlogica.com
 */
export interface ExampleCreateDTO {
    name?: string
    email: string
}