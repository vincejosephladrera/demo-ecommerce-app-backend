import { Request, Response, NextFunction } from "express";
import prisma from "../../db";



async function getAllProducts(req: Request, res: Response, next: NextFunction) {
  const { page, limit } = req.query

  const pageNum = page ? Number(page) : 1;
  const limitNum = limit ? Number(limit) : 10;
  const totalItems = await prisma.category.count()

  const totalPages = Math.ceil(totalItems / limitNum)
  const skip = (pageNum - 1) * limitNum

  const products = await prisma.product.findMany({
    skip: skip,
    take: limitNum
  })

  return void (res.status(200).json({
    products, totalPages
  }))
}

async function getAllActiveProducts(req: Request, res: Response, next: NextFunction) {
  const { page, limit } = req.query

  const pageNum = page ? Number(page) : 1;
  const limitNum = limit ? Number(limit) : 10;
  const totalItems = await prisma.category.count()

  const totalPages = Math.ceil(totalItems / limitNum)
  const skip = (pageNum - 1) * limitNum

  const products = await prisma.product.findMany({
    where: {
      isActive: true
    },
    skip: skip,
    take: limitNum
  });

  return void (res.status(200).json({
    products, totalPages
  }))
}


async function createProduct(req: Request, res: Response, next: NextFunction) {
  const createdProduct = await prisma.product.create({
    data: {
      name: req.body.name,
      categories: {
        connect: req.body.categoryIds.map((id: number) => ({ id }))
      },
      brandId: req.body.brandId,
      thumbnailUrl: req.body.thumbnailUrl,
      photosUrl: req.body.photosUrl,
    }
  })

  return void (res.status(200).json({ createdProduct }))
}

async function getProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const productId = Number(id)

  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  })

  return void (res.status(200).json({ product }))
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const productId = Number(id)

  const updatedProduct = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      name: req.body.name,
      categories: {
        connect: req.body.categoryIds.map((id: number) => ({ id }))
      },
      brandId: req.body.brandId,
      thumbnailUrl: req.body.thumbnailUrl,
      photosUrl: req.body.photosUrl,
    }
  })

  return void (res.status(200).json({ updatedProduct }))
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const productId = Number(id)

  await prisma.product.delete({
    where: {
      id: productId
    }
  })

  return void (res.status(200).json("Product was deleted successfully."))
}

export { getAllProducts, getAllActiveProducts, createProduct, getProduct, updateProduct, deleteProduct }