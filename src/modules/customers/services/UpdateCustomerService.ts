import { getCustomRepository } from 'typeorm'
import Customer from '../typeorm/entities/Customer'
import CustomersRepository from '../typeorm/repositories/CustomerRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: string
  name: string
  email: string
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository)
    const customer = await customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found.')
    }
    const customerEmailExists = await customerRepository.findByEmail(email)
    if (customerEmailExists) {
      const num: number = customerEmailExists!.id
      const str: string = num.toString()
      if (customerEmailExists && str !== id) {
        throw new AppError('There is already one customer with this email.')
      }
    }
    customer.name = name
    customer.email = email
    await customerRepository.save(customer)
    return customer
  }
}

export default UpdateCustomerService
