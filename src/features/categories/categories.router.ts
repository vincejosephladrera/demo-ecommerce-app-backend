import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync";

import { getAllCategories, getAllActiveCategories, createCategory, editCategory, deleteCategory } from "./categories.controller";

const categoriesRouter = Router()

categoriesRouter.get('/', catchAsync(getAllActiveCategories))

categoriesRouter.get('/data-table', catchAsync(getAllCategories))

categoriesRouter.post('/', catchAsync(createCategory))

categoriesRouter.patch('/:id', catchAsync(editCategory))

categoriesRouter.delete('/:id', catchAsync(deleteCategory))


export default categoriesRouter