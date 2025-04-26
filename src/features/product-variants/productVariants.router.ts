import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { createProductVariant, getAllActiveProductVariants, getAllProductVariants, getProductVariant, updateProductVariant, deleteProductVariant } from "./productVariants.controller"

const productVariantsRouter = Router()

productVariantsRouter.get('/', catchAsync(getAllActiveProductVariants))

productVariantsRouter.get('/data-table', catchAsync(getAllProductVariants))

productVariantsRouter.post('/', catchAsync(createProductVariant))

productVariantsRouter.patch('/:id', catchAsync(updateProductVariant))

productVariantsRouter.delete(':id', catchAsync(deleteProductVariant))

export default productVariantsRouter;