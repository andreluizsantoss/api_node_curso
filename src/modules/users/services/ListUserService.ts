import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/user";
import UserRepository from "../typeorm/repositories/UserRepository";

class ListUserService {
  public async execute() : Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();
    return users;
  }
}

export default ListUserService;
