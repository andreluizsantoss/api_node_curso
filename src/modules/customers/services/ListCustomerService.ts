import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomerRepository";

class ListCustomerService {
  public async execute() : Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const costumers = await customerRepository.find();
    return costumers;
  }
}

export default ListCustomerService;
