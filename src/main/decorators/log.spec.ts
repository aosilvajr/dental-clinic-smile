import { LogErrorRepository } from '@/data/protocols/log-error-repository'
import { serverError } from '@/presentation/helper/http-helper'
import { Controller, httpRequest, HttpResponse } from '@/presentation/protocols'

import { LogControllerDecorator } from './log'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: httpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          email: 'any_name',
          name: 'any_email',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        }
      }
      return Promise.resolve(httpResponse)
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
    const httpRequest = {
      body: {
        email: 'any_name',
        name: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenLastCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_name',
        name: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        email: 'any_name',
        name: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
  })

  test('Should call LogErrorRespository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRespositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    const logSpy = jest.spyOn(logErrorRespositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(Promise.resolve(error))
    const httpRequest = {
      body: {
        email: 'any_name',
        name: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
