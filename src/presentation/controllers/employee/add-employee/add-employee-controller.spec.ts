import faker from 'faker'

import { AddEmployeeController } from './add-employee-controller'
import { httpRequest, Validation } from './add-employee-controller-protocols'

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

type SutTypes = {
  sut: AddEmployeeController,
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddEmployeeController(validationStub)

  return {
    sut,
    validationStub
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
})
