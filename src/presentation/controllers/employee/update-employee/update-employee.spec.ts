import faker from 'faker'
import MockDate from 'mockdate'

import { mockEmployeeModel, throwError } from '@/domain/test'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helper/http/http-helper'
import { mockUpdateEmployee } from '@/presentation/test'

import { UpdateEmployeeController } from './update-employee'
import { httpRequest, UpdateEmployee } from './update-employee-protocols'

const employeeId = faker.datatype.uuid()

const mockRequest: httpRequest = {
  params: {
    employeeId
  },
  body: {
    id: employeeId,
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    position: faker.name.jobTitle(),
    birthday: faker.date.past(),
    createdAt: new Date()
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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call UpdateEmployee with correct values', async () => {
    const { sut, updateEmployeeStub } = makeSut()
    const updatedSpy = jest.spyOn(updateEmployeeStub, 'update')
    await sut.handle(mockRequest)
    expect(updatedSpy).toHaveBeenCalledWith(mockRequest.body)
  })

  test('Should return 403 if UpdateEmployee returns null', async () => {
    const { sut, updateEmployeeStub } = makeSut()

    jest.spyOn(updateEmployeeStub, 'update')
      .mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('employeeId')))
  })

  test('Should return 500 if UpdateEmployee throws', async () => {
    const { sut, updateEmployeeStub } = makeSut()

    jest
      .spyOn(updateEmployeeStub, 'update')
      .mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(mockEmployeeModel))
  })
})
