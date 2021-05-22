import { Collection } from 'mongodb'

import { mockEmployeeModel, mockEmployeesModel } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

import { EmployeeMongoRepository } from './employee-mongo-repository'

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
      await sut.add(mockEmployeeModel)
      const employee = await employeeCollection.findOne({ name: mockEmployeeModel.name })
      expect(employee).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all employee on success', async () => {
      await employeeCollection.insertMany(mockEmployeesModel)
      const sut = makeSut()
      const employees = await sut.loadAll()
      expect(employees.length).toBe(2)
      expect(employees[0].id).toBeTruthy()
      expect(employees[0].name).toBe(mockEmployeesModel[0].name)
      expect(employees[1].name).toBe(mockEmployeesModel[1].name)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const employees = await sut.loadAll()
      expect(employees.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load employee by id on success', async () => {
      const res = await employeeCollection.insertOne(mockEmployeeModel)
      const sut = makeSut()
      const employees = await sut.loadById(res.ops[0]._id)
      expect(employees).toBeTruthy()
      expect(employees.id).toBeTruthy()
    })
  })
})
