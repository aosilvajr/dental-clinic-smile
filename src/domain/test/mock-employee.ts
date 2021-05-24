import faker from 'faker'

import { AddEmployeeParams } from '@/data/usecases/employee/add-employee/db-add-employee-protocols'
import { EmployeeModel } from '@/data/usecases/employee/load-employee-by-id/db-load-employee-by-id-protocols'

export const mockEmployeeParams: AddEmployeeParams = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past(),
  createdAt: new Date()
}

export const mockEmployeeModel: EmployeeModel = {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past(),
  createdAt: new Date()
}

export const mockEmployeesModel: EmployeeModel[] = [{
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past(),
  createdAt: new Date()
}, {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past(),
  createdAt: new Date()
}]
