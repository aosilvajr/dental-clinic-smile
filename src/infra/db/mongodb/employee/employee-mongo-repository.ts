import { ObjectId } from 'mongodb'

import { LoadEmployeesRepository } from '@/data/protocols/db/account/load-employees-repository'
import { AddEmployeeRepository } from '@/data/usecases/employee/add-employee/db-add-employee-protocols'
import { LoadEmployeeByIdRepository } from '@/data/usecases/employee/load-employee-by-id/db-load-employee-by-id-protocols'
import { EmployeeModel } from '@/domain/models/employee'
import { AddEmployeeModel } from '@/domain/usecases/employee/add-employee'

import { MongoHelper } from '../helpers/mongo-helper'

export class EmployeeMongoRepository implements AddEmployeeRepository, LoadEmployeesRepository, LoadEmployeeByIdRepository {
  async add (employeeData: AddEmployeeModel): Promise<void> {
    const employeeCollection = await MongoHelper.getCollection('employees')
    await employeeCollection.insertOne(employeeData)
  }

  async loadAll (): Promise<EmployeeModel[]> {
    const employeeCollection = await MongoHelper.getCollection('employees')
    const employees = await employeeCollection.find().toArray()
    return MongoHelper.mapCollection(employees)
  }

  async loadById (id: string): Promise<EmployeeModel> {
    const employeeCollection = await MongoHelper.getCollection('employees')
    const employee = await employeeCollection.findOne({ _id: new ObjectId(id) })
    return employee && MongoHelper.map(employee)
  }
}
