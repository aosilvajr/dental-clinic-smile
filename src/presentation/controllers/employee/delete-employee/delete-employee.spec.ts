import faker from 'faker'

import { throwError } from '@/domain/test'
import { DeleteEmployee } from '@/domain/usecases/employee/delete-employee'
import { serverError } from '@/presentation/helper/http/http-helper'
import { httpRequest } from '@/presentation/protocols'
import { mockDeleteEmployee } from '@/presentation/test'

import { DeleteEmployeeController } from './delete-employee'

const makeFakeRequest: httpRequest = {
  params: {
    employeeId: faker.datatype.uuid()
  }
}

type SutTypes = {
  sut: DeleteEmployeeController,
  deleteEmployeeStub: DeleteEmployee
}

const makeSut = (): SutTypes => {
  const deleteEmployeeStub = mockDeleteEmployee()
  const sut = new DeleteEmployeeController(deleteEmployeeStub)

  return {
    sut,
    deleteEmployeeStub
  }
}

describe('DeleteEmployee Controller', () => {
  test('Should call DeleteEmployee with correct values', async () => {
    const { sut, deleteEmployeeStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteEmployeeStub, 'delete')
    await sut.handle(makeFakeRequest)
    expect(deleteSpy).toHaveBeenCalledWith(makeFakeRequest.params.employeeId)
  })

  test('Should return 500 if DeleteEmployee throws', async () => {
    const { sut, deleteEmployeeStub } = makeSut()

    jest
      .spyOn(deleteEmployeeStub, 'delete')
      .mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(makeFakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
