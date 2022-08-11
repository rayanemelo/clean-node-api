import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Deve retornar 400, se o nome não for fornecido', () => {
    const sut = new SignUpController();
    const httpRaquest = {
      //post
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponde = sut.handle(httpRaquest)
    expect(httpResponde.statusCode).toBe(400)
  })
})