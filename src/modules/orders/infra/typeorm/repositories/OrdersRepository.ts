import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository"
import Order from "../entities/Order"
import { Repository, getRepository } from "typeorm"
import { ICreateOrder } from "@modules/orders/domain/models/ICreateOrder";
import { IOrderPaginate } from "@modules/orders/domain/models/IOrderPaginate";

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

class OrdersRepository implements IOrdersRepository {

  private ormRepository: Repository<Order>
  constructor() {
    this.ormRepository = getRepository(Order)
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne(id, {
      relations: ['order_products', 'customer'],
    })
    return order
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IOrderPaginate> {
    const [orders, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };
    return result;
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    })
    await this.ormRepository.save(order)
    return order
  }
}

export default OrdersRepository
