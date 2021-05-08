import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { Validation } from '@/presentation/protocols/validation'
import {
  CompareFieldValidation,
  ValidationComposite,
  RequiredFieldValidation,
  EmailFieldValidation
} from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new CompareFieldValidation('password', 'passwordConfirmation')
  )
  validations.push(
    new EmailFieldValidation('email', new EmailValidatorAdapter())
  )
  return new ValidationComposite(validations)
}
