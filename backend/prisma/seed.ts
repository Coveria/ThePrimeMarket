import { PrismaClient } from '@prisma/client';
import { categories } from './data/categories';
import { products } from './data/products';

const prisma = new PrismaClient();

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  const dbCategories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(
    dbCategories.map((c) => [c.name, c.id]),
  );

  for (const { categoryName, ...product } of products) {
    await prisma.product.upsert({
      where: { title: product.title },
      update: {},
      create: {
        ...product,
        categoryId: categoryMap[categoryName],
      },
    });
  }

  console.log('Seed завершено');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
