import faker from 'faker'

import { AddAccountParams } from '@/data/usecases/account/add-account/db-add-account-protocols'
import { AuthenticationParams } from '@/data/usecases/account/authentication/db-authentication-protocols'
import { AccountModel } from '@/presentation/middlewares/auth-middleware-protocols'

export const mockPassword = faker.internet.password()

export const mockAddAccountParams: AddAccountParams = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: mockPassword
}

export const mockAccountModel: AccountModel = Object.assign({}, mockAddAccountParams, {
  id: faker.datatype.uuid()
})

export const mockAuthentication: AuthenticationParams = {
  email: faker.internet.email(),
  password: mockPassword
}
