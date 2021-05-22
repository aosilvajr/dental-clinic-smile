import MockDate from 'mockdate'

import { mockAddEmployeeRepository } from '@/data/test'
import { throwError } from '@/domain/test'
import { mockEmployeeModel } from '@/domain/test/mock-employee'

import { DbAddEmployee } from './db-add-employee'
import {
  AddEmployeeRepository
} from './db-add-employee-protocols'

type SutTypes = {
  sut: DbAddEmployee,
  addEmployeeRepositoryStub: AddEmployeeRepository
}

const makeSut = (): SutTypes => {
  const addEmployeeRepositoryStub = mockAddEmployeeRepository()
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
    await sut.add(mockEmployeeModel)
    expect(addSpy).toHaveBeenCalledWith(mockEmployeeModel)
  })

  test('Should throw if AddEmployeeRepository throws', async () => {
    const { sut, addEmployeeRepositoryStub } = makeSut()

    jest
      .spyOn(addEmployeeRepositoryStub, 'add')
      .mockImplementationOnce(throwError)

    const promise = sut.add(mockEmployeeModel)
    await expect(promise).rejects.toThrow()
  })
})
