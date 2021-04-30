import faker from 'faker'

import { LogErrorRepository } from '@/data/protocols/log-error-repository'
import { AccountModel } from '@/domain/models/account'
import { ok, serverError } from '@/presentation/helper/http-helper'
import { Controller, httpRequest, HttpResponse } from '@/presentation/protocols'

import { LogControllerDecorator } from './log'

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

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: httpRequest): Promise<HttpResponse> {
      return Promise.resolve(ok(fakeAccount))
    }
  }

  return new ControllerStub()
}

const makeErrorRespository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stackError: string): Promise<void> {
      return Promise.resolve()
    }
  }

  return new LogErrorRepositoryStub()
}

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator,
  controllerStub: Controller,
  logErrorRespositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRespositoryStub = makeErrorRespository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRespositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRespositoryStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handler', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(fakeRequest)
    expect(handleSpy).toHaveBeenLastCalledWith(fakeRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse).toEqual(ok(fakeAccount))
  })

  test('Should call LogErrorRespository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRespositoryStub } = makeSut()
    const logSpy = jest.spyOn(logErrorRespositoryStub, 'log')

    jest.spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(Promise.resolve(makeFakeServerError()))

    await sut.handle(fakeRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
