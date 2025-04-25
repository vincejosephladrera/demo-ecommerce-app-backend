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

  const mockProducts = [
    {
      name: "T-Shirt Classic",
      brandId: 1,
      thumbnailUrl: "https://example.com/thumbnail1.jpg",
      photosUrl: [
        "https://example.com/photo1.jpg",
        "https://example.com/photo2.jpg"
      ],
      categories: {
        connect: [{ id: 1 }]  // connect to category 1
      }
    },
    {
      name: "Slim Fit Jeans",
      brandId: 1,
      thumbnailUrl: "https://example.com/thumbnail2.jpg",
      photosUrl: [
        "https://example.com/photo3.jpg",
        "https://example.com/photo4.jpg"
      ],
      categories: {
        connect: [{ id: 2 }]  // connect to category 2
      }
    },
    {
      name: "Floral Summer Dress",
      brandId: 2,
      thumbnailUrl: "https://example.com/thumbnail3.jpg",
      photosUrl: [
        "https://example.com/photo5.jpg",
        "https://example.com/photo6.jpg"
      ],
      categories: {
        connect: [{ id: 2 }]  // connect to category 2
      }
    },
    {
      name: "Basic White Sneakers",
      brandId: 3,
      thumbnailUrl: "https://example.com/thumbnail4.jpg",
      photosUrl: [
        "https://example.com/photo7.jpg",
        "https://example.com/photo8.jpg"
      ],
      categories: {
        connect: [{ id: 3 }]  // connect to category 3
      }
    },
    {
      name: "Denim Jacket",
      brandId: 2,
      thumbnailUrl: "https://example.com/thumbnail5.jpg",
      photosUrl: [
        "https://example.com/photo9.jpg",
        "https://example.com/photo10.jpg"
      ],
      categories: {
        connect: [{ id: 1 }]  // connect to category 1
      }
    },
    {
      name: "Leather Belt",
      brandId: 3,
      thumbnailUrl: "https://example.com/thumbnail6.jpg",
      photosUrl: [
        "https://example.com/photo11.jpg",
        "https://example.com/photo12.jpg"
      ],
      categories: {
        connect: [{ id: 3 }]  // connect to category 3
      }
    },
    {
      name: "V-neck Sweater",
      brandId: 1,
      thumbnailUrl: "https://example.com/thumbnail7.jpg",
      photosUrl: [
        "https://example.com/photo13.jpg",
        "https://example.com/photo14.jpg"
      ],
      categories: {
        connect: [{ id: 2 }]  // connect to category 2
      }
    },
    {
      name: "Sports Shorts",
      brandId: 2,
      thumbnailUrl: "https://example.com/thumbnail8.jpg",
      photosUrl: [
        "https://example.com/photo15.jpg",
        "https://example.com/photo16.jpg"
      ],
      categories: {
        connect: [{ id: 3 }]  // connect to category 3
      }
    },
    {
      name: "Plain Shirt",
      brandId: 3,
      thumbnailUrl: "https://example.com/thumbnail9.jpg",
      photosUrl: [
        "https://example.com/photo17.jpg",
        "https://example.com/photo18.jpg"
      ],
      categories: {
        connect: [{ id: 1 }]  // connect to category 1
      }
    },
    {
      name: "Chino Pants",
      brandId: 1,
      thumbnailUrl: "https://example.com/thumbnail10.jpg",
      photosUrl: [
        "https://example.com/photo19.jpg",
        "https://example.com/photo20.jpg"
      ],
      categories: {
        connect: [{ id: 2 }]
      }
    }
  ];

  for (const item of mockProducts) {
    await prisma.product.create({
      data: item
    });
  }

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