import faker from 'faker'

import { AddPatient } from '@/domain/usecases/patient/add-patient'
import { badRequest } from '@/presentation/helper/http/http-helper'
import { httpRequest, Validation } from '@/presentation/protocols'
import { mockValidation, mockAddPatient } from '@/presentation/test'

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
  addPatientStub: AddPatient
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addPatientStub = mockAddPatient()
  const sut = new AddPatientController(validationStub, addPatientStub)

  return {
    sut,
    validationStub,
    addPatientStub
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

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error())

    const httpRequest = await sut.handle(mockRequest())
    expect(httpRequest).toEqual(badRequest(new Error()))
  })

  test('Should call AddPatient with correct values', async () => {
    const { sut, addPatientStub } = makeSut()
    const validationSpy = jest.spyOn(addPatientStub, 'add')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
