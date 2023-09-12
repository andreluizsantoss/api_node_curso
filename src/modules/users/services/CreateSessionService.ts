import { getCustomRepository } from 'typeorm'
import User from '../typeorm/entities/user'
import UserRepository from '../typeorm/repositories/UserRepository'
import AppError from '@shared/errors/AppError'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }
    const passwordComfirmed = await compare(password, user.password)
    if (!passwordComfirmed) {
      throw new AppError('Incorrect email/password combination.', 401)
    }
    const num: number = user.id
    const str: string = num.toString()
    const token = sign({}, authConfig.jwt.secret, {
      subject: str,
      expiresIn: authConfig.jwt.expiresIn,
    })
    return { user, token }
  }
}

export default CreateSessionsService
