import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

import app from '../config/app'

let accountCollection: Collection
let patientCollection: Collection

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
        .send()
        .expect(403)
    })
  })
})
