import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '@/validation/protocols/email-validator'
import {
  EmailFieldValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'

import { makeAddEmployeeValidation } from './add-employee-validation-factory'

jest.mock('@/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('AddEmployeeValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddEmployeeValidation()

    const validations: Validation[] = []
    for (const field of ['name', 'email']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailFieldValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
