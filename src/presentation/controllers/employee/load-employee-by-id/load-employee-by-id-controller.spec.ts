import faker from 'faker'

import { throwError, mockEmployeeModel } from '@/domain/test'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helper/http/http-helper'
import { mockLoadEmployeeById } from '@/presentation/test'

import { LoadEmployeeByIdController } from './load-employee-by-id-controller'
import { httpRequest, LoadEmployeeById } from './load-employee-by-id-controller-protocols'

const makeFakeRequest: httpRequest = {
  params: {
    employeeId: faker.datatype.uuid()
  }
}

type SutTypes = {
  sut: LoadEmployeeByIdController,
  loadEmployeeByIdStub: LoadEmployeeById
}

const makeSut = (): SutTypes => {
  const loadEmployeeByIdStub = mockLoadEmployeeById()
  const sut = new LoadEmployeeByIdController(loadEmployeeByIdStub)

  return {
    sut,
    loadEmployeeByIdStub
  }
}

describe('LoadEmployeeById Controller', () => {
  test('Should call LoadEmployeById with correct values', async () => {
    const { sut, loadEmployeeByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadEmployeeByIdStub, 'loadById')
    await sut.handle(makeFakeRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith(makeFakeRequest.params.employeeId)
  })

  test('Should return 403 if LoadEmployeById returns null', async () => {
    const { sut, loadEmployeeByIdStub } = makeSut()

    jest.spyOn(loadEmployeeByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(makeFakeRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('employeeId')))
  })

  test('Should return 500 if LoadEmployeById throws', async () => {
    const { sut, loadEmployeeByIdStub } = makeSut()

    jest
      .spyOn(loadEmployeeByIdStub, 'loadById')
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
