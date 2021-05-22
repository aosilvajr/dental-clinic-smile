import MockDate from 'mockdate'

import { UpdateEmployeeByIdRepository } from '@/data/protocols/db/employee/update-employee-by-id-repository '
import { mockUpdateEmployeeRepository } from '@/data/test'
import { mockEmployeeModel } from '@/domain/test'

import { DbUpdateEmployee } from './update-employee-by-id'

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
})
