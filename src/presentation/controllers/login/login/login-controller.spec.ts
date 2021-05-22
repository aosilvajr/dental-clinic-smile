import faker from 'faker'

import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helper/http/http-helper'
import { mockAuthentication } from '@/presentation/test'
import { mockValidation } from '@/validation/test/mock-validation'

import { LoginController } from './login-controller'
import {
  httpRequest,
  Validation,
  Authentication
} from './login-controller-protocols'

const mockRequest: httpRequest = {
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

type SutTypes = {
  sut: LoginController,
  authenticationStub: Authentication,
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new LoginController(authenticationStub, validationStub)

  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct email', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest)
    expect(authSpy).toHaveBeenCalledWith({
      email: mockRequest.body.email,
      password: mockRequest.body.password
    })
  })

  test('Should return 401 if an invalid credentials provided', async () => {
    const { sut, authenticationStub } = makeSut()

    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()

    // Mocka o metodo inteiro e não apenas o retorno
    jest.spyOn(authenticationStub, 'auth')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok({ token: 'any_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(mockRequest)
    expect(validateSpy).toHaveBeenCalledWith(mockRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
