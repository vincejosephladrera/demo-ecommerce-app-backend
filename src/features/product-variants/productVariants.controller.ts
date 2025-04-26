import { Request, Response, NextFunction } from "express";
import prisma from "../../db";



async function getAllProductVariants(req: Request, res: Response, next: NextFunction) {
  const { page, limit } = req.query

  const pageNum = page ? Number(page) : 1;
  const limitNum = limit ? Number(limit) : 10;
  const totalItems = await prisma.category.count()

  const totalPages = Math.ceil(totalItems / limitNum)
  const skip = (pageNum - 1) * limitNum

  const productVariants = await prisma.productVariant.findMany({
    skip: skip,
    take: limitNum
  })

  return void (res.status(200).json({
    productVariants, totalPages
  }))
}

async function getAllActiveProductVariants(req: Request, res: Response, next: NextFunction) {
  const { page, limit } = req.query

  const pageNum = page ? Number(page) : 1;
  const limitNum = limit ? Number(limit) : 10;
  const totalItems = await prisma.category.count()

  const totalPages = Math.ceil(totalItems / limitNum)
  const skip = (pageNum - 1) * limitNum

  const productVariants = await prisma.productVariant.findMany({
    where: {
      isActive: true
    },
    skip: skip,
    take: limitNum
  });

  return void (res.status(200).json({
    productVariants, totalPages
  }))
}


async function createProductVariant(req: Request, res: Response, next: NextFunction) {
  const createdProductVariant = await prisma.productVariant.create({
    data: {
      color: req.body.color,
      size: req.body.size,
      quantity: req.body.quantity,
      productId: req.body.productId
    }
  })

  return void (res.status(200).json({ createdProductVariant }))
}

async function getProductVariant(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const productVariantId = Number(id)

  const product = await prisma.productVariant.findUnique({
    where: {
      id: productVariantId
    }
  })

  return void (res.status(200).json({ product }))
}

async function updateProductVariant(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const productVariantId = Number(id)

  const updatedProductVariant = await prisma.productVariant.update({
    where: {
      id: productVariantId
    },
    data: {
      isActive: req.body.isActive,
      quantity: req.body.quantity
    }
  })

  return void (res.status(200).json({ updatedProductVariant }))
}

async function deleteProductVariant(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const productVariantId = Number(id)

  await prisma.productVariant.delete({
    where: {
      id: productVariantId
    }
  })

  return void (res.status(200).json("Product Variant was deleted successfully."))
}

export { getAllProductVariants, getAllActiveProductVariants, createProductVariant, getProductVariant, updateProductVariant, deleteProductVariant }