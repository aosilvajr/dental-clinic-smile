import { EmailValidatorAdapter } from '@/main/adapter/validators/email-validator-adapter'
import {
  EmailFieldValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/presentation/helper/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new EmailFieldValidation('email', new EmailValidatorAdapter())
  )
  return new ValidationComposite(validations)
}
