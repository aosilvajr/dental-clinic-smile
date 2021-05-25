import MockDate from 'mockdate'

import { DeleteEmployeeRepository } from '@/data/protocols/db/employee/delete-employee-repository'
import { mockDeleteEmployeeRepository } from '@/data/test'
import { mockEmployeeModel } from '@/domain/test'

import { DbDeleteEmployee } from './db-delete-employee'

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
})
