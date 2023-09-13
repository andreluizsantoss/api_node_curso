import customersRouter from '@modules/customers/infra/http/routes/CustomersRoutes'
import ordersRouter from '@modules/orders/infra/http/routes/OrdersRoutes'
import productsRouter from '@modules/products/infra/http/routes/ProductsRoutes'
import passwordRouter from '@modules/users/routes/PasswordRoutes'
import profileRouter from '@modules/users/routes/ProfileRoutes'
import sessionsRouter from '@modules/users/routes/SessionsRoutes'
import usersRouter from '@modules/users/routes/UsersRoutes'
import { Router } from 'express'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/products', productsRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)

export default routes
