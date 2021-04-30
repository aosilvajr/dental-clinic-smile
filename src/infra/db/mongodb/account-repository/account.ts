import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/add-account'

import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRespository implements AddAccount {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper
      .getCollection('accounts')
    const result = await accountCollection
      .insertOne(accountData)

    return MongoHelper.map(result.ops[0])
  }
}
