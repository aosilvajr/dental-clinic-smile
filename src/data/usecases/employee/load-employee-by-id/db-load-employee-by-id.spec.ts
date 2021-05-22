import MockDate from 'mockdate'

import { mockLoadEmployeeByIdRepository } from '@/data/test'
import { throwError } from '@/domain/test'
import { mockEmployeeModel } from '@/domain/test/mock-employee'

import { DbLoadEmployeeById } from './db-load-employee-by-id'
import {
  LoadEmployeeByIdRepository
} from './db-load-employee-by-id-protocols'

type SutTypes = {
  sut: DbLoadEmployeeById,
  loadEmployeeByIdRepositoryStub: LoadEmployeeByIdRepository
}

const makeSut = (): SutTypes => {
  const loadEmployeeByIdRepositoryStub = mockLoadEmployeeByIdRepository()
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
    await sut.loadById(mockEmployeeModel.id)
    expect(loadByIdSpy).toHaveBeenCalledWith(mockEmployeeModel.id)
  })

  test('Should return employee on success', async () => {
    const { sut } = makeSut()
    const employee = await sut.loadById(mockEmployeeModel.id)
    expect(employee).toEqual(mockEmployeeModel)
  })

  test('Should throw if LoadEmployeeByIdRepository throws', async () => {
    const { sut, loadEmployeeByIdRepositoryStub } = makeSut()

    jest
      .spyOn(loadEmployeeByIdRepositoryStub, 'loadById')
      .mockImplementationOnce(throwError)

    const promise = sut.loadById(mockEmployeeModel.id)
    await expect(promise).rejects.toThrow()
  })
})
