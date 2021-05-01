import faker from 'faker'

import { Authentication } from '@/domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helper/http-helper'
import { httpRequest } from '@/presentation/protocols'
import { EmailValidator } from '@/presentation/protocols/email-validator'

import { LoginController } from './login'

const fakeRequest: httpRequest = {
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    auth (email: string, password: string): Promise<string> {
      return Promise.resolve('any_token')
    }
  }

  return new AuthenticationStub()
}

type SutTypes = {
  sut: LoginController,
  emailValidatorStub: EmailValidator,
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const authenticationStub = makeAuthentication()
  const sut = new LoginController(emailValidatorStub, authenticationStub)

  return {
    sut,
    emailValidatorStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: faker.internet.password()
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: faker.internet.email()
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest
      .spyOn(emailValidatorStub, 'isValid')
      .mockReturnValueOnce(false)

    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(fakeRequest)
    expect(isValidSpy).toHaveBeenCalledWith(fakeRequest.body.email)
  })

  test('Should return 500 if EmailValidator throw', async () => {
    const { sut, emailValidatorStub } = makeSut()

    // Mocka o metodo inteiro e não apenas o retorno
    jest.spyOn(emailValidatorStub, 'isValid')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call Authentication with correct email', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(fakeRequest)
    expect(authSpy).toHaveBeenCalledWith(fakeRequest.body.email, fakeRequest.body.password)
  })
})
