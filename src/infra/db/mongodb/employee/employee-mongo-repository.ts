import { AddEmployeeRepository } from '@/data/usecases/add-employee/db-add-employee-protocols'
import { AddEmployeeModel } from '@/domain/usecases/add-employee'

import { MongoHelper } from '../helpers/mongo-helper'

export class EmployeeMongoRepository implements AddEmployeeRepository {
  async add (employeeData: AddEmployeeModel): Promise<void> {
    const employeeCollection = await MongoHelper.getCollection('employees')
    await employeeCollection.insertOne(employeeData)
  }
}
