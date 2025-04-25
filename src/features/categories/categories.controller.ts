import { NextFunction, Request, Response } from "express";
import prisma from "../../db";


interface RequestWithPageAndLimit extends Request {
  query: {
    page?: string;
    limit?: string;
  };
}



async function getAllCategories(req: RequestWithPageAndLimit, res: Response, next: NextFunction) {
  const { page, limit } = req.query

  const pageNum = page ? Number(page) : 1;
  const limitNum = limit ? Number(limit) : 10;
  const totalItems = await prisma.category.count()

  const totalPages = Math.ceil(totalItems / limitNum)
  const skip = (pageNum - 1) * limitNum

  const categories = await prisma.category.findMany({
    skip: skip,
    take: limitNum
  })

  return void (res.status(200).json({ categories, totalPages }))



};

async function getAllActiveCategories(req: RequestWithPageAndLimit, res: Response, next: NextFunction) {

  const { page, limit } = req.query



  const pageNum = page ? Number(page) : 1;
  const limitNum = limit ? Number(limit) : 10;
  const totalItems = await prisma.category.count({
    where: {
      isActive: true,
    }
  });

  const totalPages = Math.ceil(totalItems / limitNum)
  const skip = (pageNum - 1) * limitNum

  const categories = await prisma.category.findMany({
    where: {
      isActive: true
    },
    skip: skip,
    take: limitNum
  })

  return void (res.status(200).json({ categories, totalPages }));
}

async function createCategory(req: Request, res: Response, next: NextFunction) {
  const category = await prisma.category.create({
    data: req.body
  })

  return void (res.status(200).json({ category }));
}


async function editCategory(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const categoryId = Number(id)

  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId
    },
    data: req.body
  })

  return void (res.status(200).json({ updatedCategory }))
}

async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const categoryId = Number(id)

  await prisma.category.delete({
    where: {
      id: categoryId
    }
  })

  return void (res.status(200).json("Category was deleted successfully"))
}


export { getAllCategories, getAllActiveCategories, createCategory, editCategory, deleteCategory }