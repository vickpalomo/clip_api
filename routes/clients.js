const express = require('express')
const { create, update, list, detail } = require('../controllers/clientsController')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Clients
 */

/**
 * @swagger
 * /api/v1/clients/:
 *    get:
 *      summary: List clients
 *      tags: [Clients]
 *      responses:
 *        '200':
 *          description: client updated
 *        '404':
 *          description: client not found
 *        '500':
 *          description: Internal Server Error
 */
router.get('/', list)

/**
 * @swagger
 * /api/v1/clients/{uuid}:
 *    get:
 *      summary: Client detail
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: uuid
 *          required: true
 *          schema:
 *            type: string
 *          description: uuid client
 *      responses:
 *        '200':
 *          description: client updated
 *        '400':
 *          description: bad request
 *        '404':
 *          description: client not found
 *        '500':
 *          description: Internal Server Error
 */
router.get('/:uuid', detail)

/**
 * @swagger
 * /api/v1/clients/:
 *    post:
 *      summary: Create client
 *      tags: [Clients]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                telephone:
 *                  type: string
 *                address:
 *                  type: object
 *                  properties:
 *                    [name]:
 *                      type: string
 *              type: object
 *      responses:
 *        '200':
 *          description: client updated
 *        '400':
 *          description: bad request
 *        '404':
 *          description: client not found
 *        '500':
 *          description: Internal Server Error
 */
router.post('/', create)

/**
 * @swagger
 * /api/v1/clients/{uuid}:
 *    put:
 *      summary: Update client
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: uuid
 *          required: true
 *          schema:
 *            type: string
 *          description: uuid client to be updated
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                telephone:
 *                  type: string
 *                address:
 *                  type: object
 *                  properties:
 *                    [name]:
 *                      type: string
 *              type: object
 *      responses:
 *        '201':
 *          description: client updated
 *        '400':
 *          description: bad request
 *        '404':
 *          description: client not found
 *        '500':
 *          description: Internal Server Error
 */
router.put('/:uuid', update)

module.exports = router
