import faker from 'faker'

import { httpRequest, Validation } from '@/presentation/protocols'
import { mockValidation } from '@/presentation/test'

import { AddPatientController } from './add-patient-controller'

const mockRequest = (): httpRequest => ({
  body: {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    whatsapp: faker.phone.phoneNumber(),
    occupation: faker.name.jobType(),
    indication: faker.name.firstName(),
    acceptMessage: true,
    startTreatment: faker.date.past(),
    endTreatment: faker.date.recent(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    profile: {
      city: faker.address.city(),
      number: faker.datatype.number(),
      state: faker.address.state(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode(),
      complement: faker.lorem.words(4)
    }
  }
})

type SutTypes = {
  sut: AddPatientController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new AddPatientController(validationStub)

  return {
    sut,
    validationStub
  }
}

describe('AddPatient Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
