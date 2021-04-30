import { Controller, httpRequest, HttpResponse } from '@/presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    await this.controller.handle(httpRequest)
    return null
  }
}
