import faker from 'faker'
import jwt from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

import app from '../config/app'
import env from '../config/env'

let accountCollection: Collection
let employeeCollection: Collection

const fakeEmployeeData = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past()
}

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'aosilvajr',
    email: 'aosilvajr@gmail.com',
    password: '123',
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
        .send(fakeEmployeeData)
        .expect(403)
    })

    test('Should return 204 on add employee with valid token', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/employees')
        .set('x-access-token', accessToken)
        .send(fakeEmployeeData)
        .expect(204)
    })
  })

  describe('GET /employees', () => {
    test('Should return 403 on load employees without access token', async () => {
      await request(app)
        .post('/api/employees')
        .send(fakeEmployeeData)
        .expect(403)
    })
  })
})
