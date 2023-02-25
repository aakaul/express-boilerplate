	/**
	 * @swagger
	 * /api/v1/users:
	 *   post:
	 *     summary: Get all Template objects
	 *     description: Get an array of all Template objects
	 *     operationId: getAllTemplates
	 *     tags: [Users]
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: Authorization
	 *         in: header
	 *         description: jwt access token
	 *         required: true
	 *         type: string
	 *     responses:
	 *       200:
	 *         description: An array of Template objects
	 *         schema:
	 *           type: array
	 *           items:
	 *             $ref: '#/definitions/TemplateResponse'
	 *       400:
	 *         $ref: '#/responses/BadRequest'
	 *       401:
	 *         $ref: '#/responses/Unauthorized'
	 *       403:
	 *         $ref: '#/responses/Forbidden'
	 *       404:
	 *         $ref: '#/responses/NotFound'
	 *       405:
	 *         $ref: '#/responses/MethodNotAllowed'
	 *       406:
	 *         $ref: '#/responses/NotAcceptable'
	 *       500:
	 *         $ref: '#/responses/InternalServerError'
	 *       504:
	 *         $ref: '#/responses/GatewayTimeout'
	 *       default:
	 *         $ref: '#/responses/DefaultError'
	 */


   