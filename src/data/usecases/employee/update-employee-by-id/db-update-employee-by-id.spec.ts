import MockDate from 'mockdate'

import { mockUpdateEmployeeRepository } from '@/data/test'
import { mockEmployeeModel, throwError } from '@/domain/test'

import { DbUpdateEmployee } from './db-update-employee-by-id'
import { UpdateEmployeeByIdRepository } from './db-update-employee-by-id-protocols'

type SutTypes = {
  sut: DbUpdateEmployee,
  updateEmployeeByIdRepositoryStub: UpdateEmployeeByIdRepository
}

const makeSut = (): SutTypes => {
  const updateEmployeeByIdRepositoryStub = mockUpdateEmployeeRepository()
  const sut = new DbUpdateEmployee(updateEmployeeByIdRepositoryStub)

  return {
    sut,
    updateEmployeeByIdRepositoryStub
  }
}

describe('DbUpdateEmployeeById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call UpdateEmployeeByIdRepository', async () => {
    const { sut, updateEmployeeByIdRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateEmployeeByIdRepositoryStub, 'updateById')
    await sut.updateById(mockEmployeeModel.id)
    expect(updateSpy).toHaveBeenCalledWith(mockEmployeeModel.id)
  })

  test('Should return employee on success', async () => {
    const { sut } = makeSut()
    const employees = await sut.updateById(mockEmployeeModel.id)
    expect(employees).toEqual(mockEmployeeModel)
  })

  test('Should throw if UpdateEmployeeByIdRepository throws', async () => {
    const { sut, updateEmployeeByIdRepositoryStub } = makeSut()

    jest
      .spyOn(updateEmployeeByIdRepositoryStub, 'updateById')
      .mockImplementationOnce(throwError)

    const promise = sut.updateById(mockEmployeeModel.id)
    await expect(promise).rejects.toThrow()
  })
})
