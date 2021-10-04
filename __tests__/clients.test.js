const { app } = require('../index')
const supertest = require('supertest')
const request = supertest(app)

let uuid

beforeAll(async () => {
  const response = await request
    .post('/api/v1/clients')
    .send({
      name: 'Test',
      address: {
        casa: 'Domicilio conocido'
      },
      email: 'test@test.correo',
      telephone: '9999112233'
    })
  uuid = response.body.data.uuid
})

describe('Clients Controller', () => {
  describe('Create Client', () => {
    test('Post Create Clients code 400 email, name are required', async () => {
      const response = await request
        .post('/api/v1/clients/')
        .send({
          address: {
            casa: 'Domicilio conocido'
          },
          telephone: '9999001122'
        })
        .expect(400)
      expect(response.body).toMatchObject({
        code: 400,
        data: {},
        msg: 'name,email are required'
      })
    })

    test('Post Create Clients code 400 Email exist already', async () => {
      const response = await request
        .post('/api/v1/clients/')
        .send({
          name: 'Test',
          address: {
            casa: 'Domicilio conocido'
          },
          email: 'test@test.correo',
          telephone: '9999112233'
        })
        .expect(400)
      expect(response.body).toMatchObject({
        code: 400,
        data: {},
        msg: 'Email exist already'
      })
    })

    test('Post Create Clients code 200 Created', async () => {
      const response = await request
        .post('/api/v1/clients/')
        .send({
          name: 'Test',
          address: {
            casa: 'Domicilio conocido'
          },
          email: 'ok@test.correo',
          telephone: '9999112233'
        })
        .expect(200)
      expect(response.body).toMatchObject({
        code: 200,
        data: {},
        msg: 'Created'
      })
    })
  })

  describe('Update Client', () => {
    test('Put Update Clients code 400 Uuid bad formated', async () => {
      const response = await request
        .put('/api/v1/clients/1')
        .send({
          name: 'Test',
          address: {
            casa: 'Domicilio conocido'
          },
          telephone: '9999112244'
        })
        .expect(400)
      expect(response.body).toMatchObject({
        code: 400,
        data: {},
        msg: 'Uuid bad formated'
      })
    })

    test('Put Update Clients code 400 No data for update', async () => {
      const response = await request
        .put('/api/v1/clients/785e5b88-a194-4d4d-a8cb-18b83017c4df')
        .send({})
        .expect(400)
      expect(response.body).toMatchObject({
        code: 400,
        data: {},
        msg: 'No data for update'
      })
    })

    test('Put Update Clients code 404 Client not found', async () => {
      const response = await request
        .put('/api/v1/clients/785e5b88-a194-4d4d-a8cb-18b83017c4df')
        .send({
          name: 'Test',
          address: {
            casa: 'Domicilio conocido'
          },
          telephone: '9999112244'
        })
        .expect(404)
      expect(response.body).toMatchObject({
        code: 404,
        data: {},
        msg: 'Client not found'
      })
    })

    test('Put Update Clients code 201 Client updated', async () => {
      const response = await request
        .put(`/api/v1/clients/${uuid}`)
        .send({
          name: 'Test',
          address: {
            casa: 'Domicilio conocido'
          },
          telephone: '9999112244'
        })
        .expect(201)
      expect(response.body).toMatchObject({
        code: 201,
        data: {},
        msg: 'Client updated'
      })
    })
  })
})
