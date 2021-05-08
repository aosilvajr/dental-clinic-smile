import faker from 'faker'

import { LoadEmployeesRepository } from '@/data/protocols/db/account/load-employees-repository'
import { EmployeeModel } from '@/domain/models/employee'

import { DbLoadEmployees } from './db-load-employees'

const makeFakeEmployees: EmployeeModel[] = [{
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

const makeLoadEmployeesRepository = (): LoadEmployeesRepository => {
  class LoadEmployeesRepositoryStub implements LoadEmployeesRepository {
    async loadAll (): Promise<EmployeeModel[]> {
      return Promise.resolve(makeFakeEmployees)
    }
  }

  return new LoadEmployeesRepositoryStub()
}

type SutTypes = {
  sut: DbLoadEmployees,
  loadEmployeesRepositoryStub: LoadEmployeesRepository
}

const makeSut = (): SutTypes => {
  const loadEmployeesRepositoryStub = makeLoadEmployeesRepository()
  const sut = new DbLoadEmployees(loadEmployeesRepositoryStub)

  return {
    sut,
    loadEmployeesRepositoryStub
  }
}

describe('DbLoadEmployees', () => {
  test('Should call LoadEmployeesRepository', async () => {
    const { sut, loadEmployeesRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadEmployeesRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of employees on success', async () => {
    const { sut } = makeSut()
    const employees = await sut.load()
    expect(employees).toEqual(makeFakeEmployees)
  })

  test('Should throw if LoadEmployeesRepository throws', async () => {
    const { sut, loadEmployeesRepositoryStub } = makeSut()

    jest
      .spyOn(loadEmployeesRepositoryStub, 'loadAll')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
