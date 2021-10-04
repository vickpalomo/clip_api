const { app } = require('../index')
const supertest = require('supertest')
const request = supertest(app)

let uuid

beforeAll(async () => {
  const response = await request
    .post('/api/v1/dishes')
    .send({
      name: 'Test',
      description: 'Description',
      price: 10.50,
      kind_food: 'Mexicana',
      status: 'Disponible'
    })
  uuid = response.body.data.uuid
})

describe('Dishes Controller', () => {
  describe('Create Dish', () => {
    test('Post Create dishes code 400 name,description are required', async () => {
      const response = await request
        .post('/api/v1/dishes/')
        .send({
          price: 10.50,
          kind_food: 'Mexicana',
          status: 'Disponible'
        })
        .expect(400)
      expect(response.body).toMatchObject({
        code: 400,
        data: {},
        msg: 'name,description are required'
      })
    })

    test('Post Create dishes code 200 Created', async () => {
      const response = await request
        .post('/api/v1/dishes/')
        .send({
          name: 'Test',
          description: 'Description',
          price: 10.50,
          kind_food: 'Mexicana',
          status: 'Disponible'
        })
        .expect(200)
      expect(response.body).toMatchObject({
        code: 200,
        data: {},
        msg: 'Created'
      })
    })
  })

  describe('Update Dish', () => {
    test('Put Update dishes code 400 Uuid bad formated', async () => {
      const response = await request
        .put('/api/v1/dishes/1')
        .send({
          name: 'Test',
          description: 'Description',
          price: 10.50,
          kind_food: 'Mexicana',
          status: 'Disponible'
        })
        .expect(400)
      expect(response.body).toMatchObject({
        code: 400,
        data: {},
        msg: 'Uuid bad formated'
      })
    })

    test('Put Update dishes code 400 No data for update', async () => {
      const response = await request
        .put('/api/v1/dishes/785e5b88-a194-4d4d-a8cb-18b83017c4df')
        .send({})
        .expect(400)
      expect(response.body).toMatchObject({
        code: 400,
        data: {},
        msg: 'No data for update'
      })
    })

    test('Put Update dishes code 404 Dish not found', async () => {
      const response = await request
        .put('/api/v1/dishes/785e5b88-a194-4d4d-a8cb-18b83017c4df')
        .send({
          name: 'Test',
          description: 'Description',
          price: 10.50,
          kind_food: 'Mexicana',
          status: 'Disponible'
        })
        .expect(404)
      expect(response.body).toMatchObject({
        code: 404,
        data: {},
        msg: 'dish not found'
      })
    })

    test('Put Update dishes code 201 Client updated', async () => {
      const response = await request
        .put(`/api/v1/dishes/${uuid}`)
        .send({
          name: 'Test',
          description: 'Description',
          price: 10.50,
          kind_food: 'Mexicana',
          status: 'Disponible'
        })
        .expect(201)
      expect(response.body).toMatchObject({
        code: 201,
        data: {},
        msg: 'dish updated'
      })
    })
  })
})
