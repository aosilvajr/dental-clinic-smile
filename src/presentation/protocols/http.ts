export type HttpResponse = {
  statusCode: number
  body: any
}

export type httpRequest = {
  body?: any,
  headers?: any,
  params?: any,
  accountId?: string
}
