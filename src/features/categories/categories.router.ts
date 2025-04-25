import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync";

import { getAllCategories, getAllActiveCategories, createCategory, getCategory, editCategory, deleteCategory } from "./categories.controller";

const categoriesRouter = Router()

categoriesRouter.get('/', catchAsync(getAllActiveCategories))

categoriesRouter.get('/data-table', catchAsync(getAllCategories))

categoriesRouter.post('/', catchAsync(createCategory))

categoriesRouter.get('/:id', catchAsync(getCategory))

categoriesRouter.patch('/:id', catchAsync(editCategory))

categoriesRouter.delete('/:id', catchAsync(deleteCategory))


export default categoriesRouter