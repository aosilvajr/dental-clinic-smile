import MockDate from 'mockdate'

import { mockDeleteEmployeeRepository } from '@/data/test'
import { mockEmployeeModel, throwError } from '@/domain/test'

import { DbDeleteEmployee } from './db-delete-employee'
import { DeleteEmployeeRepository } from './db-delete-employee-protocols'

type SutTypes = {
  sut: DbDeleteEmployee,
  deleteEmployeeRepositoryStub: DeleteEmployeeRepository
}

const makeSut = (): SutTypes => {
  const deleteEmployeeRepositoryStub = mockDeleteEmployeeRepository()
  const sut = new DbDeleteEmployee(deleteEmployeeRepositoryStub)

  return {
    sut,
    deleteEmployeeRepositoryStub
  }
}

describe('DbDeleteEmployee', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call DeleteEmployeeRepository', async () => {
    const { sut, deleteEmployeeRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteEmployeeRepositoryStub, 'delete')
    await sut.delete(mockEmployeeModel.id)
    expect(deleteSpy).toHaveBeenCalledWith(mockEmployeeModel.id)
  })

  test('Should throw if DeleteEmployeeRepository throws', async () => {
    const { sut, deleteEmployeeRepositoryStub } = makeSut()

    jest
      .spyOn(deleteEmployeeRepositoryStub, 'delete')
      .mockImplementationOnce(throwError)

    const promise = sut.delete(mockEmployeeModel.id)
    await expect(promise).rejects.toThrow()
  })
})
