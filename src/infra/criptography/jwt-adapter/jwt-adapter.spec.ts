import faker from 'faker'
import jwt from 'jsonwebtoken'

import { JwtAdapter } from './jwt-adapter'

const fakeAccountId: string = faker.datatype.uuid()

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.encrypt(fakeAccountId)
    expect(signSpy).toHaveBeenCalledWith({
      id: fakeAccountId
    }, 'secret')
  })
})
