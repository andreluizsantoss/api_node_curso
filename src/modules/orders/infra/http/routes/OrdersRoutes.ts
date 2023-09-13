import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import OrdersController from '../controllers/OrdersController'
import isAuthenticated from '@shared/infra/http/middlewares/IsAuthenticated'

const ordersRouter = Router()
const ordersController = new OrdersController()

ordersRouter.use(isAuthenticated)

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().id().required(),
    },
  }),
  ordersController.show,
)

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().id().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
)

export default ordersRouter
