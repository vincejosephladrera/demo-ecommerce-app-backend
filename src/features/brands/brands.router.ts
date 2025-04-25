import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync";

import { getAllBrands, getAllActiveBrands, createBrand, getBrand, updateBrand, deleteBrand } from "./brands.controller"

const brandsRouter = Router()

brandsRouter.get('/', catchAsync(getAllActiveBrands))

brandsRouter.get('/data-table', catchAsync(getAllBrands))

brandsRouter.post('/', catchAsync(createBrand))

brandsRouter.get('/:id', catchAsync(getBrand))

brandsRouter.patch('/:id', catchAsync(updateBrand))

brandsRouter.delete('/:id', catchAsync(deleteBrand))


export default brandsRouter