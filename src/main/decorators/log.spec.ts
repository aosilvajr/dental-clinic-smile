import { Controller, httpRequest, HttpResponse } from '@/presentation/protocols'
import faker from 'faker'

import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  test('Should call controller handler', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: httpRequest): Promise<HttpResponse> {
        const httpResponse = {
          statusCode: 200,
          body: {
            email: faker.internet.userName(),
            name: faker.internet.email(),
            password: 'any_name',
            passwordConfirmation: 'any_name'
          }
        }
        return Promise.resolve(httpResponse)
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
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
