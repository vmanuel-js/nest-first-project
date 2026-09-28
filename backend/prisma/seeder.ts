import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const [john, jane, organization] = await prisma.$transaction(
    async (prisma) => {
      const john = await prisma.user.create({
        data: {
          email: 'jhon.doe@gmail.com',
          firstName: 'Jhon',
          lastName: 'Doe',
          password: 'qwerty',
          role: 'USER',
          telephone: '123456789',
        },
      });

      const jane = await prisma.user.create({
        data: {
          email: 'jane.doe@gmail.com',
          firstName: 'Jane',
          lastName: 'Doe',
          password: 'qwerty',
          role: 'USER',
          telephone: '123456789',
        },
      });

      const organization = await prisma.organization.create({
        data: {
          name: 'Test Org',
          memberships: {
            create: [{ userId: john.id }, { userId: jane.id }],
          },
        },
      });

      return [john, jane, organization];
    },
  );

  console.log([john, jane, organization]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });