import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/add-account'

import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRespository implements AddAccount {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper
      .getCollection('accounts')
    const result = await accountCollection
      .insertOne(accountData)
    const account = result.ops[0]
    const { _id, ...rest } = account
    return Object.assign({}, rest, { id: _id })
  }
}
