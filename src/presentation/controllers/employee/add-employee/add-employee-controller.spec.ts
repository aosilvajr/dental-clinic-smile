import faker from 'faker'

import { badRequest, serverError } from '@/presentation/helper/http/http-helper'

import { AddEmployeeController } from './add-employee-controller'
import {
  httpRequest,
  Validation,
  AddEmployee,
  AddEmployeeModel
} from './add-employee-controller-protocols'

const fakeRequest: httpRequest = {
  body: {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    position: faker.name.jobTitle(),
    birthday: faker.date.past()
  }
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeAddEmployee = (): AddEmployee => {
  class AddEmployeeStub implements AddEmployee {
    async add (data: AddEmployeeModel): Promise<void> {
      return Promise.resolve()
    }
  }

  return new AddEmployeeStub()
}

type SutTypes = {
  sut: AddEmployeeController,
  validationStub: Validation,
  addEmployeeStub: AddEmployee
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addEmployeeStub = makeAddEmployee()
  const sut = new AddEmployeeController(validationStub, addEmployeeStub)

  return {
    sut,
    validationStub,
    addEmployeeStub
  }
}

describe('AddEmployee Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = fakeRequest
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error())

    const HttpResponse = await sut.handle(fakeRequest)
    expect(HttpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddEmployee with correct values', async () => {
    const { sut, addEmployeeStub } = makeSut()
    const addSpy = jest.spyOn(addEmployeeStub, 'add')
    const httpRequest = fakeRequest
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddEmployee throws', async () => {
    const { sut, addEmployeeStub } = makeSut()

    jest
      .spyOn(addEmployeeStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
