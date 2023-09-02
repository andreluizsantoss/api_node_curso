import { Router } from "express";
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().id().required(),
  }
}), productsController.show);

productsRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required(),
  }
}), productsController.create);

productsRouter.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().id().required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required(),
  }
}), productsController.update);

productsRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().id().required(),
  }
}), productsController.delete);

export default productsRouter;
