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
      name: "Men's Fashion",
    },
  });

  await prisma.category.create({
    data: {
      name: "Women's Fashion",
    },
  });

  await prisma.category.create({
    data: {
      name: "Kids' Clothing",
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