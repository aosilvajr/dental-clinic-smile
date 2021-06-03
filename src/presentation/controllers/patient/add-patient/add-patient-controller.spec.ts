import faker from 'faker'
import MockDate from 'mockdate'

import { throwError } from '@/domain/test'
import { badRequest, noContent, serverError } from '@/presentation/helper/http/http-helper'
import { mockValidation, mockAddPatient } from '@/presentation/test'

import { AddPatientController } from './add-patient-controller'
import { httpRequest, Validation, AddPatient } from './add-patient-controller-protocols'

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
    createdAt: new Date(),
    updatedAt: new Date(),
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

  test('Should return 500 if AddPatient throws', async () => {
    const { sut, addPatientStub } = makeSut()

    jest
      .spyOn(addPatientStub, 'add')
      .mockImplementationOnce(throwError)

    const httpRequest = await sut.handle(mockRequest())
    expect(httpRequest).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })
})
