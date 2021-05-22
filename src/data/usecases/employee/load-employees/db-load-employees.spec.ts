import MockDate from 'mockdate'

import { mockLoadEmployeesRepository } from '@/data/test'
import { throwError, mockEmployeesModel } from '@/domain/test'

import { DbLoadEmployees } from './db-load-employees'
import { LoadEmployeesRepository } from './db-load-employees-protocols'

type SutTypes = {
  sut: DbLoadEmployees,
  loadEmployeesRepositoryStub: LoadEmployeesRepository
}

const makeSut = (): SutTypes => {
  const loadEmployeesRepositoryStub = mockLoadEmployeesRepository()
  const sut = new DbLoadEmployees(loadEmployeesRepositoryStub)

  return {
    sut,
    loadEmployeesRepositoryStub
  }
}

describe('DbLoadEmployees', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadEmployeesRepository', async () => {
    const { sut, loadEmployeesRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadEmployeesRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of employees on success', async () => {
    const { sut } = makeSut()
    const employees = await sut.load()
    expect(employees).toEqual(mockEmployeesModel)
  })

  test('Should throw if LoadEmployeesRepository throws', async () => {
    const { sut, loadEmployeesRepositoryStub } = makeSut()

    jest
      .spyOn(loadEmployeesRepositoryStub, 'loadAll')
      .mockImplementationOnce(throwError)

    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
