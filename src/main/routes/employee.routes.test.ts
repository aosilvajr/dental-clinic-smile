import faker from 'faker'
import { Collection } from 'mongodb'
import request from 'supertest'

import { AddEmployeeModel } from '@/domain/usecases/add-employee'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

import app from '../config/app'

const fakeEmployeeData: AddEmployeeModel = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past()
}

describe('Employee Routes', () => {
  let employeeCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    employeeCollection = await MongoHelper.getCollection('employees')
    await employeeCollection.deleteMany({})
  })

  describe('POST /employees', () => {
    test('Should return 403 on add employee without access token', async () => {
      await request(app)
        .post('/api/employees')
        .send(fakeEmployeeData)
        .expect(403)
    })
  })
})
