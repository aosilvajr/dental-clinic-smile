import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'

import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async log (stackError: string): Promise<void> {
    const errorColletion = await MongoHelper.getCollection('errors')
    await errorColletion.insertOne({
      stackError,
      date: new Date()
    })
  }
}
