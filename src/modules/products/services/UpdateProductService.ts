import redisCache from '@shared/cache/RedisCache';
import { getCustomRepository } from 'typeorm'
import Product from '../typeorm/entities/product'
import AppError from '@shared/errors/AppError'
import ProductRepository from '../typeorm/repositories/ProductRepository'

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)
    if (!product) {
      throw new AppError('Product not found.')
    }
    const productExists = await productRepository.findByName(name)
    if (productExists && name != product.name) {
      throw new AppError('The is already one product with this name.')
    }
    product.name = name
    product.price = price
    product.quantity = quantity
    await redisCache.invalidate('api-vendas-PRODUCT_LIST')
    await productRepository.save(product)
    return product
  }
}

export default UpdateProductService
