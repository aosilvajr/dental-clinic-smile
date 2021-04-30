import { Controller, httpRequest, HttpResponse } from '@/presentation/protocols'
import faker from 'faker'

import { LogControllerDecorator } from './log'

type SutTypes = {
  sut: LogControllerDecorator,
  controllerStub: Controller
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: httpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          email: faker.internet.userName(),
          name: faker.internet.email(),
          password: 'any_password',
          passwordConfirmation: 'any_password'
        }
      }
      return Promise.resolve(httpResponse)
    }
  }

  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)

  return {
    sut,
    controllerStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handler', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        email: faker.internet.userName(),
        name: faker.internet.email(),
        password: 'any_name',
        passwordConfirmation: 'any_name'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenLastCalledWith(httpRequest)
  })
})
