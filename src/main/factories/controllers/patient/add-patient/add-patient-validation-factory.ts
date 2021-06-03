import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { Validation } from '@/presentation/protocols/validation'
import {
  EmailFieldValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'

export const makeAddPatientValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'startTreatment', 'endTreatment']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new EmailFieldValidation('email', new EmailValidatorAdapter())
  )
  return new ValidationComposite(validations)
}
