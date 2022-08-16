import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { EmailValidator } from '../protocols/email-validator'

interface SutType {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutType => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return { sut, emailValidatorStub }
}

describe('SignUp Controller', () => {
  test('Deve retornar 400, se o nome não for fornecido', () => {
    const { sut } = makeSut()
    const httpRaquest = {
      // post
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponde = sut.handle(httpRaquest)
    expect(httpResponde.statusCode).toBe(400)
    expect(httpResponde.body).toEqual(new MissingParamError('name'))
  })

  test('Deve retornar 400, se o email não for fornecido', () => {
    const { sut } = makeSut()
    const httpRaquest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponde = sut.handle(httpRaquest)
    expect(httpResponde.statusCode).toBe(400)
    expect(httpResponde.body).toEqual(new MissingParamError('email'))
  })

  test('Deve retornar 400, se a senha não for fornecida', () => {
    const { sut } = makeSut()
    const httpRaquest = {

      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponde = sut.handle(httpRaquest)
    expect(httpResponde.statusCode).toBe(400)
    expect(httpResponde.body).toEqual(new MissingParamError('password'))
  })

  test('Deve retornar 400, se a confirmação de senha não for fornecida', () => {
    const { sut } = makeSut()
    const httpRaquest = {

      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
    const httpResponde = sut.handle(httpRaquest)
    expect(httpResponde.statusCode).toBe(400)
    expect(httpResponde.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Deve retornar 400, se o email fornecido for inválido', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false) // Mocando o validator
    const httpRaquest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponde = sut.handle(httpRaquest)
    expect(httpResponde.statusCode).toBe(400)
    expect(httpResponde.body).toEqual(new InvalidParamError('email'))
  })
})
