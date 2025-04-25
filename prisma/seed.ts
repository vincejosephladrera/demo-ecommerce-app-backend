import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/auth";

const prisma = new PrismaClient()


async function main() {
  const hash = await hashPassword("password")

  await prisma.admin.create({
    data: {
      name: "Superuser Admin",
      email: "admin@mail.com",
      password: hash
    }
  })

  await prisma.category.create({
    data: {
      isActive: true,
      name: "Men's Fashion",
    },
  });

  await prisma.category.create({
    data: {
      isActive: true,
      name: "Women's Fashion",
    },
  });

  await prisma.category.create({
    data: {
      isActive: true,
      name: "Kids' Clothing",
    },
  });


  await prisma.brand.create({
    data: {
      isActive: true,
      name: "Nike",
    },
  });

  await prisma.brand.create({
    data: {
      isActive: true,
      name: "Zara",
    },
  });

  await prisma.brand.create({
    data: {
      isActive: true,
      name: "Uniqlo",
    },
  });

  await prisma.brand.create({
    data: {
      isActive: true,
      name: "Levi's",
    },
  });

  await prisma.brand.create({
    data: {
      isActive: true,
      name: "H&M",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })