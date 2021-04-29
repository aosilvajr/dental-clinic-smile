import { AddAccountModel } from '@/domain/usecases/add-account'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import faker from 'faker'

import { AccountMongoRespository } from './account'

const fakeAccount: AddAccountModel = ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

describe('Account Mongo Respository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRespository()
    const account = await sut.add(fakeAccount)

    expect(account).toBeTruthy() // Não seja nulo, tendo valor tá ok
    expect(account.id).toBeTruthy() // Não seja nulo, tendo valor tá ok
    expect(account.name).toBe(fakeAccount.name)
    expect(account.email).toBe(fakeAccount.email)
    expect(account.password).toBe(fakeAccount.password)
  })
})
