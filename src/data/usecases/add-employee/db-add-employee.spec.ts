import faker from 'faker'

import { DbAddEmployee } from './db-add-employee'
import {
  AddEmployeeModel,
  AddEmployeeRepository
} from './db-add-employee-protocols'

const fakeEmployeeData: AddEmployeeModel = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past()
}

describe('DbAddEmployee Usecase', () => {
  test('Should call AddEmployeeRepository with correct values', async () => {
    class AddEmployeeRepositoryStub implements AddEmployeeRepository {
      async add (employeeData: AddEmployeeModel): Promise<void> {
        return Promise.resolve()
      }
    }
    const addEmployeeRepositoryStub = new AddEmployeeRepositoryStub()
    const addSpy = jest.spyOn(addEmployeeRepositoryStub, 'add')
    const sut = new DbAddEmployee(addEmployeeRepositoryStub)
    const employeeData = fakeEmployeeData
    await sut.add(employeeData)
    expect(addSpy).toHaveBeenCalledWith(employeeData)
  })
})
