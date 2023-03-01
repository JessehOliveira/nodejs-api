/**
 * @openapi
 * components:
 *   schemas:
 *     example:
 *       type: object
 *       required:
 *       - id
 *       - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The example ID.
 *           example: 1
 *         name:
 *           type: string
 *           description: The examplo's name.
 *           example: Guilherme Portugues
 *         email:
 *           type: string
 *           description: The examplo's e-mail.
 *           example: guilherme.portugues@superlogica.com
 */
export interface ExampleResponseDTO {
    id: number,
    name?: string | null,
    email: string
}

export type ExampleResponseCollectionDTO = ExampleResponseDTO[]