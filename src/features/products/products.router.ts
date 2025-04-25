import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync";

import { getAllActiveProducts, getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } from "./products.controller";

const productsRouter = Router()

productsRouter.get('/', catchAsync(getAllActiveProducts))

productsRouter.get('/data-table', catchAsync(getAllProducts))

productsRouter.post('/', catchAsync(createProduct))

productsRouter.get('/:id', catchAsync(getProduct))

productsRouter.patch('/:id', catchAsync(updateProduct))

productsRouter.delete('/:id', catchAsync(deleteProduct))


export default productsRouter