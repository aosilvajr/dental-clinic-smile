import { EmailFieldValidation } from '@/presentation/helper/validators/email-field-validation'
import { RequiredFieldValidation } from '@/presentation/helper/validators/required-field-validation'
import { Validation } from '@/presentation/helper/validators/validation'
import { ValidationComposite } from '@/presentation/helper/validators/validation-composite'
import { EmailValidator } from '@/presentation/protocols/email-validator'

import { makeLoginValidation } from './login-validation'

jest.mock('@/presentation/helper/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailFieldValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
