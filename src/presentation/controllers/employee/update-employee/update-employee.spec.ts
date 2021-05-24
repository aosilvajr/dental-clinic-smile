import faker from 'faker'

import { UpdateEmployee } from '@/domain/usecases/employee/update-employee-by-id'
import { httpRequest } from '@/presentation/protocols'
import { mockUpdateEmployee } from '@/presentation/test'

import { UpdateEmployeeController } from './update-employee'

const makeFakeRequest: httpRequest = {
  params: {
    employeeId: faker.datatype.uuid()
  }
}

type SutTypes = {
  sut: UpdateEmployeeController,
  updateEmployeeStub: UpdateEmployee
}

const makeSut = (): SutTypes => {
  const updateEmployeeStub = mockUpdateEmployee()
  const sut = new UpdateEmployeeController(updateEmployeeStub)

  return {
    sut,
    updateEmployeeStub
  }
}

describe('UpdateEmployee Controller', () => {
  test('Should call UpdateEmployee with correct values', async () => {
    const { sut, updateEmployeeStub } = makeSut()
    const updatedSpy = jest.spyOn(updateEmployeeStub, 'update')
    await sut.handle(makeFakeRequest)
    expect(updatedSpy).toHaveBeenCalledWith(makeFakeRequest.params.employeeId)
  })
})
