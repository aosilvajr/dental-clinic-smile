import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRespository } from '@/infra/db/mongodb/account/account-mongo-repository'

export const makeDbAddAccount = (): DbAddAccount => {
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRespository = new AccountMongoRespository()
  return new DbAddAccount(bcryptAdapter, accountMongoRespository, accountMongoRespository)
}
