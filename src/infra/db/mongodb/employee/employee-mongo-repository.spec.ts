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
  birthday: faker.date.past(),
  createdAt: new Date()
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

  describe('add()', () => {
    test('Should add a employee on success', async () => {
      const sut = makeSut()
      await sut.add(fakeEmployeeData)
      const employee = await employeeCollection.findOne({ name: fakeEmployeeData.name })
      expect(employee).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all employee on success', async () => {
      await employeeCollection.insertMany([
        {
          name: faker.internet.userName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          position: faker.name.jobTitle(),
          birthday: faker.date.past(),
          createdAt: new Date()
        },
        {
          name: faker.internet.userName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          position: faker.name.jobTitle(),
          birthday: faker.date.past(),
          createdAt: new Date()
        }
      ])
      const sut = makeSut()
      const employees = await sut.loadAll()
      expect(employees.length).toBe(2)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const employees = await sut.loadAll()
      expect(employees.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load employee by id on success', async () => {
      const res = await employeeCollection.insertOne(fakeEmployeeData)
      const sut = makeSut()
      const employees = await sut.loadById(res.ops[0]._id)
      expect(employees).toBeTruthy()
    })
  })
})
