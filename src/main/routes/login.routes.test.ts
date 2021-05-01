import { hash } from 'bcrypt'
import faker from 'faker'
import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

import app from '../config/app'

const fakePassword = faker.internet.password()

const fakeAccount = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: fakePassword,
  passwordConfirmation: fakePassword
}

describe('Login Routes', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send(fakeAccount)
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      await accountCollection.insertOne({
        name: 'aosilvajr',
        email: 'aosilvajr@gmail.com',
        password: await hash(fakeAccount.password, 12)
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'aosilvajr@gmail.com',
          password: fakeAccount.password
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'aosilvajr@gmail.com',
          password: fakeAccount.password
        })
        .expect(200)
    })
  })
})
