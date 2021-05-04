import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async load (token: string, role?: string): Promise<AccountModel> {
    const accessToken = await this.decrypter.decrypt(token)
    if (accessToken) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    }
    return null
  }
}
