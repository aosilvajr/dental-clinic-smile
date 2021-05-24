import MockDate from 'mockdate'

import { mockUpdateEmployeeRepository } from '@/data/test'
import { mockEmployeeModel, throwError } from '@/domain/test'

import { DbUpdateEmployee } from './db-update-employee'
import { UpdateEmployeeRepository } from './db-update-employee-protocols'

type SutTypes = {
  sut: DbUpdateEmployee,
  updateEmployeeRepositoryStub: UpdateEmployeeRepository
}

const makeSut = (): SutTypes => {
  const updateEmployeeRepositoryStub = mockUpdateEmployeeRepository()
  const sut = new DbUpdateEmployee(updateEmployeeRepositoryStub)

  return {
    sut,
    updateEmployeeRepositoryStub
  }
}

describe('DbUpdateEmployee', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call UpdateEmployeeRepository', async () => {
    const { sut, updateEmployeeRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateEmployeeRepositoryStub, 'update')
    await sut.update(mockEmployeeModel)
    expect(updateSpy).toHaveBeenCalledWith(mockEmployeeModel)
  })

  test('Should return employee on success', async () => {
    const { sut } = makeSut()
    const employees = await sut.update(mockEmployeeModel)
    expect(employees).toEqual(mockEmployeeModel)
  })

  test('Should throw if UpdateEmployeeRepository throws', async () => {
    const { sut, updateEmployeeRepositoryStub } = makeSut()

    jest
      .spyOn(updateEmployeeRepositoryStub, 'update')
      .mockImplementationOnce(throwError)

    const promise = sut.update(mockEmployeeModel)
    await expect(promise).rejects.toThrow()
  })
})
