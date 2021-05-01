import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { TokenGenerator } from '@/data/protocols/criptography/toke-generator'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '@/domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) { }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository
      .load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer
        .comparer(authentication.password, account.password)

      if (isValid) {
        const token = await this.tokenGenerator
          .generate(account.id)
        return token
      }
    }
    return null
  }
}
