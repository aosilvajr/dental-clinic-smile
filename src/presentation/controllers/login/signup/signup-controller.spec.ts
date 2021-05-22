import faker from 'faker'

import { ServerError, MissingParamError, EmailAlreadyExists } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper/http/http-helper'

import { SignUpController } from './signup-controller'
import {
  AddAccount,
  AccountModel,
  AddAccountParams,
  Validation,
  httpRequest,
  Authentication,
  AuthenticationParams
} from './signup-controller-protocols'

const fakePassword = faker.internet.password()

const fakeRequest: httpRequest = {
  body: {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: fakePassword,
    passwordConfirmation: fakePassword
  }
}

const fakeAccount: AccountModel = {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: fakePassword
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(fakeAccount)
    }
  }

  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    auth (authentication: AuthenticationParams): Promise<string> {
      return Promise.resolve('any_token')
    }
  }

  return new AuthenticationStub()
}

type SutTypes = {
  sut: SignUpController,
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication,
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()
  const sut = new SignUpController(
    addAccountStub,
    validationStub,
    authenticationStub
  )

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()

    jest
      .spyOn(addAccountStub, 'add')
      .mockImplementationOnce(() => Promise.reject(new Error()))

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest
      .spyOn(addAccountStub, 'add')

    await sut.handle(fakeRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: fakeRequest.body.name,
      email: fakeRequest.body.email,
      password: fakeRequest.body.password
    })
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()

    jest
      .spyOn(addAccountStub, 'add')
      .mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(forbidden(new EmailAlreadyExists()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(ok({ token: 'any_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(fakeRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call Authentication with correct email', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(fakeRequest)
    expect(authSpy).toHaveBeenCalledWith({
      email: fakeRequest.body.email,
      password: fakeRequest.body.password
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()

    // Mocka o metodo inteiro e não apenas o retorno
    jest.spyOn(authenticationStub, 'auth')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
