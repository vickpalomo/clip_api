const express = require('express')
const { create, update, list, detail } = require('../controllers/dishesController')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: dishes
 *   description: dishes
 */

/**
 * @swagger
 * /api/v1/dishes/:
 *    get:
 *      summary: List dishes
 *      tags: [dishes]
 *      responses:
 *        '200':
 *          description: dish updated
 *        '404':
 *          description: dish not found
 *        '500':
 *          description: Internal Server Error
 */
router.get('/', list)

/**
 * @swagger
 * /api/v1/dishes/{uuid}:
 *    get:
 *      summary: dish detail
 *      tags: [dishes]
 *      parameters:
 *        - in: path
 *          name: uuid
 *          required: true
 *          schema:
 *            type: string
 *          description: uuid dish
 *      responses:
 *        '200':
 *          description: dish updated
 *        '400':
 *          description: bad request
 *        '404':
 *          description: dish not found
 *        '500':
 *          description: Internal Server Error
 */
router.get('/:uuid', detail)

/**
 * @swagger
 * /api/v1/dishes/:
 *    post:
 *      summary: Create dish
 *      tags: [dishes]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                price:
 *                  type: number
 *                  format: float
 *                kind_food:
 *                  type: string
 *                status:
 *                  type: string
 *              type: object
 *      responses:
 *        '200':
 *          description: dish updated
 *        '400':
 *          description: bad request
 *        '404':
 *          description: dish not found
 *        '500':
 *          description: Internal Server Error
 */
router.post('/', create)

/**
 * @swagger
 * /api/v1/dishes/{uuid}:
 *    put:
 *      summary: Update dish
 *      tags: [dishes]
 *      parameters:
 *        - in: path
 *          name: uuid
 *          required: true
 *          schema:
 *            type: string
 *          description: uuid dish to be updated
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                price:
 *                  type: number
 *                  format: float
 *                kind_food:
 *                  type: string
 *                status:
 *                  type: string
 *              type: object
 *      responses:
 *        '201':
 *          description: dish updated
 *        '400':
 *          description: bad request
 *        '404':
 *          description: dish not found
 *        '500':
 *          description: Internal Server Error
 */
router.put('/:uuid', update)

module.exports = router
