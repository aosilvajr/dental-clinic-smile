import { EmailValidatorAdapter } from '@/main/adapter/validators/email-validator-adapter'
import {
  CompareFieldValidation,
  ValidationComposite,
  RequiredFieldValidation,
  EmailFieldValidation
} from '@/presentation/helper/validators'
import { Validation } from '@/presentation/protocols/validation'

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
