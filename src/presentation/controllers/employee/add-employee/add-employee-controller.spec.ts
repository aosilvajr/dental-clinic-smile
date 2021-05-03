import faker from 'faker'

import { Validation } from '@/presentation/protocols'

import { AddEmployeeController } from './add-employee-controller'
import { httpRequest } from './add-employee-controller-protocols'

const fakeRequest: httpRequest = {
  body: {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    position: faker.name.jobTitle(),
    birthday: faker.date.past()
  }
}
describe('AddEmployee Controller', () => {
  test('Should call validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddEmployeeController(validationStub)
    const httpRequest = fakeRequest
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
