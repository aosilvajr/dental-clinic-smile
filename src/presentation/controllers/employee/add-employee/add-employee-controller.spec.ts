import faker from 'faker'
import MockDate from 'mockdate'

import { throwError } from '@/domain/test'
import { badRequest, noContent, serverError } from '@/presentation/helper/http/http-helper'
import { mockAddEmployee, mockValidation } from '@/presentation/test'

import { AddEmployeeController } from './add-employee-controller'
import {
  httpRequest,
  Validation,
  AddEmployee
} from './add-employee-controller-protocols'

const mockRequest = (): httpRequest => ({
  body: {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    position: faker.name.jobTitle(),
    birthday: faker.date.past(),
    createdAt: new Date()
  }
})

type SutTypes = {
  sut: AddEmployeeController,
  validationStub: Validation,
  addEmployeeStub: AddEmployee
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addEmployeeStub = mockAddEmployee()
  const sut = new AddEmployeeController(validationStub, addEmployeeStub)

  return {
    sut,
    validationStub,
    addEmployeeStub
  }
}

describe('AddEmployee Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error())

    const HttpResponse = await sut.handle(mockRequest())
    expect(HttpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddEmployee with correct values', async () => {
    const { sut, addEmployeeStub } = makeSut()
    const addSpy = jest.spyOn(addEmployeeStub, 'add')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddEmployee throws', async () => {
    const { sut, addEmployeeStub } = makeSut()

    jest
      .spyOn(addEmployeeStub, 'add')
      .mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
