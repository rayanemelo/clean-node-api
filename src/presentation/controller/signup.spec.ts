import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'
describe('SignUp Controller', () => {
  test('Deve retornar 400, se o nome não for fornecido', () => {
    const sut = new SignUpController()
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
    const sut = new SignUpController()
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
    const sut = new SignUpController()
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
})
