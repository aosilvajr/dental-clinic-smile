import faker from 'faker'
import MockDate from 'mockdate'

import { DbLoadEmployeeById } from './db-load-employee-by-id'
import {
  LoadEmployeeByIdRepository,
  EmployeeModel
} from './db-load-employee-by-id-protocols'

const makeFakeEmployee: EmployeeModel = {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past(),
  createdAt: new Date()
}

const makeLoadEmployeeByIdRepository = (): LoadEmployeeByIdRepository => {
  class LoadEmployeeByIdRepositoryStub implements LoadEmployeeByIdRepository {
    async loadById (id: string): Promise<EmployeeModel> {
      return Promise.resolve(makeFakeEmployee)
    }
  }

  return new LoadEmployeeByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadEmployeeById,
  loadEmployeeByIdRepositoryStub: LoadEmployeeByIdRepository
}

const makeSut = (): SutTypes => {
  const loadEmployeeByIdRepositoryStub = makeLoadEmployeeByIdRepository()
  const sut = new DbLoadEmployeeById(loadEmployeeByIdRepositoryStub)

  return {
    sut,
    loadEmployeeByIdRepositoryStub
  }
}

describe('DbLoadEmployeeById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadEmployeeByIdRepository', async () => {
    const { sut, loadEmployeeByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadEmployeeByIdRepositoryStub, 'loadById')
    await sut.loadById(makeFakeEmployee.id)
    expect(loadByIdSpy).toHaveBeenCalledWith(makeFakeEmployee.id)
  })

  test('Should return employee on success', async () => {
    const { sut } = makeSut()
    const employee = await sut.loadById(makeFakeEmployee.id)
    expect(employee).toEqual(makeFakeEmployee)
  })

  test('Should throw if LoadEmployeeByIdRepository throws', async () => {
    const { sut, loadEmployeeByIdRepositoryStub } = makeSut()

    jest
      .spyOn(loadEmployeeByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.loadById(makeFakeEmployee.id)
    await expect(promise).rejects.toThrow()
  })
})
