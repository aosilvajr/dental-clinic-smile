import faker from 'faker'
import jwt from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

import { mockEmployeeParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

import app from '../config/app'
import env from '../config/env'

let accountCollection: Collection
let employeeCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'admin'
  })
  const id = res.ops[0]._id
  const accessToken = jwt.sign({ id }, env.JWT_SECRET)

  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

describe('Employee Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    employeeCollection = await MongoHelper.getCollection('employees')
    await employeeCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /employees', () => {
    test('Should return 403 on add employee without access token', async () => {
      await request(app)
        .post('/api/employees')
        .send(mockEmployeeParams)
        .expect(403)
    })

    test('Should return 204 on add employee with valid token', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/employees')
        .set('x-access-token', accessToken)
        .send(mockEmployeeParams)
        .expect(204)
    })
  })

  describe('GET /employees', () => {
    test('Should return 403 on load employees without access token', async () => {
      await request(app)
        .get('/api/employees')
        .expect(403)
    })

    test('Should return 204 on load employees with valid access token', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .get('/api/employees')
        .set('x-access-token', accessToken)
        .send(mockEmployeeParams)
        .expect(204)
    })
  })

  describe('GET /employee/:employeeId', () => {
    test('Should return 403 on load employee by id without access token', async () => {
      await request(app)
        .get('/api/employee/any_id')
        .expect(403)
    })

    test('Should return 200 on load employee by id with valid access token', async () => {
      const accessToken = await makeAccessToken()
      const res = await employeeCollection.insertOne(mockEmployeeParams)

      await request(app)
        .get(`/api/employee/${res.ops[0]._id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('PUT /employee/:employeeId', () => {
    test('Should return 403 on update employee without access token', async () => {
      await request(app)
        .put('/api/employee/any_id')
        .expect(403)
    })

    test('Should return 200 on update employee with valid access token', async () => {
      const accessToken = await makeAccessToken()
      const res = await employeeCollection.insertOne(mockEmployeeParams)
      const employeeId = res.ops[0]._id
      const employeeData = Object.assign({}, { mockEmployeeParams }, { id: employeeId })

      await request(app)
        .put(`/api/employee/${employeeId}`)
        .set('x-access-token', accessToken)
        .send(employeeData)
        .expect(200)
    })
  })
})
