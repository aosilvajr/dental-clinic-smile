import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import faker from 'faker'
import request from 'supertest'

import app from '../config/app'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'any_value',
        passwordConfirmation: 'any_value'
      })
      .expect(200)
  })
})
