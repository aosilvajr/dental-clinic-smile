import faker from 'faker'

import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/load-account-token'

import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helper/http/http-helper'
import { AuthMiddleware } from './auth-middleware'

const fakeAccount: AccountModel = {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in header', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (token: string, role?: string): Promise<AccountModel> {
        return Promise.resolve(fakeAccount)
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct token', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (token: string, role?: string): Promise<AccountModel> {
        return Promise.resolve(fakeAccount)
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
