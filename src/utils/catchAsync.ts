import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from 'express';

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {

    Promise.resolve(fn(req, res, next))
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(400).json({
            error: {
              message: e.message || "Prisma Error",
            }
          });
        } else {
          return res.status(500).json({
            error: {
              message: e.message || "Internal Server Error"
            }
          });
        }
      });

  };
};
