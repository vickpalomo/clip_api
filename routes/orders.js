const express = require('express')
const { create, report } = require('../controllers/ordersController')
const { validateSchema } = require('../middlewares/validationData')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Orders
 */

/**
 * @swagger
 * /api/v1/orders/:
 *    post:
 *      summary: Create order
 *      tags: [Orders]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                client_uuid:
 *                  type: string
 *                client_address:
 *                  type: string
 *                dishes:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      quantity:
 *                        type: number
 *                        format: integer
 *                      uuid:
 *                        type: string
 *              type: object
 *      responses:
 *        '201':
 *          description: order updated
 *        '400':
 *          description: bad request
 *        '404':
 *          description: not found
 *        '500':
 *          description: Internal Server Error
 */
router.post('/', validateSchema, create)

/**
 * @swagger
 * /api/v1/orders/report:
 *    get:
 *      summary: Service to check the amount of dishes sold by kind food that are within a range of dates passed as parameters
 *      tags: [Orders]
 *      parameters:
 *        - in: query
 *          name: start_date
 *          required: true
 *          schema:
 *            type: string
 *          description: start date
 *        - in: query
 *          name: end_date
 *          required: true
 *          schema:
 *            type: string
 *          description: end date
 *      responses:
 *        '200':
 *          description: dish list group by kind food
 *        '400':
 *          description: missing params
 *        '500':
 *          description: Internal Server Error
 */
router.get('/report', report)

module.exports = router
