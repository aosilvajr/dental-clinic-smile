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

const makeAddEmployeeRepository = (): AddEmployeeRepository => {
  class AddEmployeeRepositoryStub implements AddEmployeeRepository {
    async add (employeeData: AddEmployeeModel): Promise<void> {
      return Promise.resolve()
    }
  }

  return new AddEmployeeRepositoryStub()
}

type SutTypes = {
  sut: DbAddEmployee,
  addEmployeeRepositoryStub: AddEmployeeRepository
}

const makeSut = (): SutTypes => {
  const addEmployeeRepositoryStub = makeAddEmployeeRepository()
  const sut = new DbAddEmployee(addEmployeeRepositoryStub)

  return {
    sut,
    addEmployeeRepositoryStub
  }
}

describe('DbAddEmployee Usecase', () => {
  test('Should call AddEmployeeRepository with correct values', async () => {
    const { sut, addEmployeeRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addEmployeeRepositoryStub, 'add')
    const employeeData = fakeEmployeeData
    await sut.add(employeeData)
    expect(addSpy).toHaveBeenCalledWith(employeeData)
  })
})
