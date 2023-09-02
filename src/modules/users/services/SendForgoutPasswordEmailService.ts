import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  email: string;
}

class SendForgoutPasswordEmailService {
  public async execute({ email }: IRequest) : Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }
    let num: number = user.id;
    let str: string = num.toString();
    const token = await userTokenRepository.generateToken(str);
    console.log(token);
  }
}

export default SendForgoutPasswordEmailService;
