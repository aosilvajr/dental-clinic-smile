import { AccountModel } from '@/data/usecases/add-account/db-add-account-protocols'

export interface LoadAccountByToken {
  load(token: string, role?: string): Promise<AccountModel>
}
