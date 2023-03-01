import Express, { Request, Response, NextFunction } from 'express';
import { filterLimit, filterOffset } from '../helpers/filters';
import createdHandler from '../libs/handlers/created-handler';
import noContentHandler from '../libs/handlers/no-content-handler';
import successHandler from '../libs/handlers/success-handler';
import ExamplesController from './controller';

const Router = Express.Router();

exports = module.exports = Router;

const controller: ExamplesController = new ExamplesController()

/**
 * @openapi
 * /example/{id}:
 *   get:
 *     tags:
 *     - Examples
 *     description: Get a Examples.
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       description: Example Id.
 *       required: true
 *     responses:
 *       200:
 *         description: Returns a Example.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/example'
 *       404:
 *         description: Example not found.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: '#/components/schemas/exception'
 *               - properties:
 *                   code:
 *                     example: EXAMPLE_NOT_FOUND
 *       500:
 *         $ref: "#/components/responses/internalServerError"
 *     security:
 *     - bearer_auth: []
 */
Router.get('/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			response.locals.data = await controller.get(+request.params.id)
			next()
		} catch (error) {
			next(error)
		}
	},
	successHandler
);

type CustomFilter = {
	limit?: number,
	offset?: number
}

/**
 * @openapi
 * /example:
 *   get:
 *     tags:
 *     - Examples
 *     description: Paginated list of all examples.
 *     parameters:
 *     - in: query
 *       name: filter[limit]
 *       schema:
 *         type: integer
 *       description: Amount of record to be returned.
 *       required: false
 *     - in: query
 *       name: filter[offset]
 *       schema:
 *         type: integer
 *       description: Offset, based on the number of records to be returned.
 *       required: false
 *     responses:
 *       200:
 *         description: Returns all examples.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/example'
 *       500:
 *         $ref: "#/components/responses/internalServerError"
 *     security:
 *     - bearer_auth: []
 */
Router.get('/',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			response.locals.data = await controller.getAll(
				filterLimit(request),
				filterOffset(request)
			)
			next()
		} catch (error) {
			next(error)
		}
	},
	successHandler
);

/**
 * @openapi
 * /example:
 *   post:
 *     tags:
 *     - Examples
 *     description: Create a new Example.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createExample'
 *       required: true
 *     responses:
 *       201:
 *         description: Returns the created example.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/example'
 *       409:
 *         description: Example alredy exists.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: '#/components/schemas/exception'
 *               - properties:
 *                   code:
 *                     example: EXAMPLE_ALREADY_EXISTS
 *       500:
 *         $ref: "#/components/responses/internalServerError"
 *     security:
 *     - bearer_auth: []
 */
Router.post('/',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			response.locals.data = await controller.create(request.body)
			next()
		} catch (error) {
			next(error)
		}
	},
	createdHandler
);

/**
 * @openapi
 * /example/{id}:
 *   patch:
 *     tags:
 *     - Examples
 *     description: Update a Example.
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       description: Example Id.
 *       required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateExample'
 *       required: true
 *     responses:
 *       200:
 *         description: Returns the updated example.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/example'
 *       404:
 *         description: Example not found.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: '#/components/schemas/exception'
 *               - properties:
 *                   code:
 *                     example: EXAMPLE_NOT_FOUND
 *       409:
 *         description: Example alredy exists.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: '#/components/schemas/exception'
 *               - properties:
 *                   code:
 *                     example: EXAMPLE_ALREADY_EXISTS
 *       500:
 *         $ref: "#/components/responses/internalServerError"
 *     security:
 *     - bearer_auth: []
 */
Router.patch('/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			response.locals.data = await controller.update(+request.params.id, request.body)
			next()
		} catch (error) {
			next(error)
		}
	},
	successHandler
);

/**
 * @openapi
 * /example/{id}:
 *   delete:
 *     tags:
 *     - Examples
 *     description: Delete a Example.
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       description: Example Id.
 *       required: true
 *     responses:
 *       204:
 *         description: Example successfully removed.
 *       404:
 *         description: Example not found.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: '#/components/schemas/exception'
 *               - properties:
 *                   code:
 *                     example: EXAMPLE_NOT_FOUND
 *       500:
 *         $ref: "#/components/responses/internalServerError"
 *     security:
 *     - bearer_auth: []
 */
Router.delete('/:id',
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			response.locals.data = await controller.delete(+request.params.id)
			next()
		} catch (error) {
			next(error)
		}
	},
	noContentHandler
);