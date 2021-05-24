import faker from 'faker'

import { mockEmployeeModel, throwError } from '@/domain/test'
import { UpdateEmployee } from '@/domain/usecases/employee/update-employee-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helper/http/http-helper'
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

  test('Should return 403 if UpdateEmployee returns null', async () => {
    const { sut, updateEmployeeStub } = makeSut()

    jest.spyOn(updateEmployeeStub, 'update')
      .mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(makeFakeRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('employeeId')))
  })

  test('Should return 500 if UpdateEmployee throws', async () => {
    const { sut, updateEmployeeStub } = makeSut()

    jest
      .spyOn(updateEmployeeStub, 'update')
      .mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(makeFakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest)
    expect(httpResponse).toEqual(ok(mockEmployeeModel))
  })
})
