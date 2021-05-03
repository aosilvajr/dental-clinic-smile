import faker from 'faker'
import { Collection } from 'mongodb'

import { AddEmployeeModel } from '@/domain/usecases/add-employee'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

import { EmployeeMongoRepository } from './employee-mongo-repository'

const fakeEmployeeData: AddEmployeeModel = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past()
}

const makeSut = (): EmployeeMongoRepository => {
  return new EmployeeMongoRepository()
}

describe('Employee Mongo Respository', () => {
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

  test('Should add a employee on success', async () => {
    const sut = makeSut()
    await sut.add(fakeEmployeeData)
    const employee = await employeeCollection.findOne({ name: fakeEmployeeData.name })
    expect(employee).toBeTruthy()
  })
})
