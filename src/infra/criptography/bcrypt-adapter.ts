import { Encrypter } from '@/data/protocols/encryter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  constructor (
    private readonly salt: number
  ) { }

  async encrypt (value: string): Promise<string> {
    bcrypt.hash(value, this.salt)
    return Promise.resolve('')
  }
}
