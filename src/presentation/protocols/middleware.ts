import { httpRequest, HttpResponse } from './http'

export interface Middleware {
  handle(httpRequest: httpRequest): Promise<HttpResponse>
}
