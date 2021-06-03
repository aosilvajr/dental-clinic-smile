import faker from 'faker'
import jwt from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

import { mockPatientParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

import app from '../config/app'
import env from '../config/env'

let accountCollection: Collection
let patientCollection: Collection

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

describe('Patient Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    patientCollection = await MongoHelper.getCollection('patients')
    await patientCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /patients', () => {
    test('Should return 403 on add patient without access token', async () => {
      await request(app)
        .post('/api/patients')
        .send(mockPatientParams)
        .expect(403)
    })

    test('Should return 204 on add patient with valid token', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/patients')
        .set('x-access-token', accessToken)
        .send(mockPatientParams)
        .expect(204)
    })
  })
})
