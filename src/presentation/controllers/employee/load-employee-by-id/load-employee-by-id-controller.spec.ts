import faker from 'faker'

import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helper/http/http-helper'

import { LoadEmployeeByIdController } from './load-employee-by-id-controller'
import { httpRequest, LoadEmployeeById, EmployeeModel } from './load-employee-by-id-controller-protocols'

const makeFakeRequest: httpRequest = {
  params: {
    employeeId: faker.datatype.uuid()
  }
}

const makeFakeEmployee: EmployeeModel = {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past(),
  createdAt: new Date()
}

const makeLoadEmployeeById = (): LoadEmployeeById => {
  class LoadEmployeByIdStub implements LoadEmployeeById {
    async loadById (id: string): Promise<EmployeeModel> {
      return Promise.resolve(makeFakeEmployee)
    }
  }

  return new LoadEmployeByIdStub()
}

type SutTypes = {
  sut: LoadEmployeeByIdController,
  loadEmployeeByIdStub: LoadEmployeeById
}

const makeSut = (): SutTypes => {
  const loadEmployeeByIdStub = makeLoadEmployeeById()
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
      .mockReturnValueOnce(Promise.reject(new Error()))

    const httpResponse = await sut.handle(makeFakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
