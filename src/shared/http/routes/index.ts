import { Router } from "express";
import productsRouter from "@modules/products/routes/ProductsRoutes";
import usersRouter from "@modules/users/routes/UsersRoutes";
import sessionsRouter from "@modules/users/routes/SessionsRoutes";
import passwordRouter from "@modules/users/routes/PasswordRoutes";
import profileRouter from "@modules/users/routes/ProfileRoutes";

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/products', productsRouter);

export default routes;
