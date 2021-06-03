import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '@/validation/protocols/email-validator'
import {
  EmailFieldValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'

import { makeAddPatientValidation } from './add-patient-validation-factory'

jest.mock('@/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('AddPatientValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddPatientValidation()

    const validations: Validation[] = []
    for (const field of ['name', 'email', 'startTreatment', 'endTreatment']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailFieldValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
