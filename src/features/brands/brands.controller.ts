import { NextFunction, Request, Response } from "express";
import prisma from "../../db";


interface RequestWithPageAndLimit extends Request {
  query: {
    page?: string;
    limit?: string;
  };
}



async function getAllBrands(req: RequestWithPageAndLimit, res: Response, next: NextFunction) {
  const { page, limit } = req.query

  const pageNum = page ? Number(page) : 1;
  const limitNum = limit ? Number(limit) : 10;
  const totalItems = await prisma.brand.count()

  const totalPages = Math.ceil(totalItems / limitNum)
  const skip = (pageNum - 1) * limitNum

  const brands = await prisma.brand.findMany({
    skip: skip,
    take: limitNum
  })

  return void (res.status(200).json({ brands, totalPages }))



};

async function getAllActiveBrands(req: RequestWithPageAndLimit, res: Response, next: NextFunction) {

  const { page, limit } = req.query



  const pageNum = page ? Number(page) : 1;
  const limitNum = limit ? Number(limit) : 10;
  const totalItems = await prisma.brand.count({
    where: {
      isActive: true,
    }
  });

  const totalPages = Math.ceil(totalItems / limitNum)
  const skip = (pageNum - 1) * limitNum

  const brands = await prisma.brand.findMany({
    where: {
      isActive: true
    },
    skip: skip,
    take: limitNum
  })

  return void (res.status(200).json({ brands, totalPages }));
}

async function createBrand(req: Request, res: Response, next: NextFunction) {
  const brand = await prisma.brand.create({
    data: req.body
  })

  return void (res.status(200).json({ brand }));
}

async function getBrand(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const brandId = Number(id)

  const brand = await prisma.brand.findUnique({
    where: {
      id: brandId
    }
  })

  return void (res.status(200).json({ brand }))
}


async function updateBrand(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const brandId = Number(id)

  const updatedBrand = await prisma.brand.update({
    where: {
      id: brandId
    },
    data: req.body
  })

  return void (res.status(200).json({ updatedBrand }))
}

async function deleteBrand(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const brandId = Number(id)

  await prisma.brand.delete({
    where: {
      id: brandId
    }
  })

  return void (res.status(200).json("Brand was deleted successfully."))
}


export { getAllBrands, getAllActiveBrands, createBrand, getBrand, updateBrand, deleteBrand }