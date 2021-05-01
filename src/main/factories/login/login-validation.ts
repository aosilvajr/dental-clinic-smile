import { EmailFieldValidation } from '@/presentation/helper/validators/email-field-validation'
import { RequiredFieldValidation } from '@/presentation/helper/validators/required-field-validation'
import { ValidationComposite } from '@/presentation/helper/validators/validation-composite'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

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
