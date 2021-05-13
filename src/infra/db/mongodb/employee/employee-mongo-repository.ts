import { LoadEmployeesRepository } from '@/data/protocols/db/account/load-employees-repository'
import { AddEmployeeRepository } from '@/data/usecases/add-employee/db-add-employee-protocols'
import { EmployeeModel } from '@/domain/models/employee'
import { AddEmployeeModel } from '@/domain/usecases/add-employee'

import { MongoHelper } from '../helpers/mongo-helper'

export class EmployeeMongoRepository implements AddEmployeeRepository, LoadEmployeesRepository {
  async add (employeeData: AddEmployeeModel): Promise<void> {
    const employeeCollection = await MongoHelper.getCollection('employees')
    await employeeCollection.insertOne(employeeData)
  }

  async loadAll (): Promise<EmployeeModel[]> {
    const employeeCollection = await MongoHelper.getCollection('employees')
    const employees: EmployeeModel[] = await employeeCollection.find().toArray()
    return employees
  }
}
