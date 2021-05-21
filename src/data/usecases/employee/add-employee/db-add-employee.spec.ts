import faker from 'faker'
import MockDate from 'mockdate'

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
  birthday: faker.date.past(),
  createdAt: new Date()
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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddEmployeeRepository with correct values', async () => {
    const { sut, addEmployeeRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addEmployeeRepositoryStub, 'add')
    const employeeData = fakeEmployeeData
    await sut.add(employeeData)
    expect(addSpy).toHaveBeenCalledWith(employeeData)
  })

  test('Should throw if AddEmployeeRepository throws', async () => {
    const { sut, addEmployeeRepositoryStub } = makeSut()

    jest
      .spyOn(addEmployeeRepositoryStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.add(fakeEmployeeData)
    await expect(promise).rejects.toThrow()
  })
})
