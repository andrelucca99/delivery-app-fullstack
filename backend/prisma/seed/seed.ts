import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123456", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@delivery.com",
        password,
        role: "ADMIN",
      },
      {
        name: "Seller",
        email: "seller@delivery.com",
        password,
        role: "SELLER",
      },
      {
        name: "Customer",
        email: "customer@delivery.com",
        password,
        role: "CUSTOMER",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Skol Lata 250ml",
        price: 2.20,
        urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
      },
      {
        name: "Heineken 600ml",
        price: 7.50,
        urlImage: "http://localhost:3001/images/heineken_600ml.jpg",
      },
      {
        name: "Antarctica Pilsen 300ml",
        price: 2.49,
        urlImage: "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed executed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());