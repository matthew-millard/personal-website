import { prisma } from "~/.server/db";
import { ENV } from "~/env";
import { hashPassword } from "~/utils";

async function seed(): Promise<void> {
  console.log("Seeding database...");
  console.time("Seeded database");

  try {
    console.time("Cleaning database");
    await prisma.admin.deleteMany();
    console.timeEnd("Cleaning database");

    console.time("Created admin user");
    await prisma.admin.create({
      data: {
        firstName: ENV.ADMIN_FIRSTNAME,
        lastName: ENV.ADMIN_LASTNAME,
        email: ENV.ADMIN_EMAIL,
        password: {
          create: {
            hash: hashPassword(ENV.ADMIN_PASSWORD),
          },
        },
      },
    });
    console.timeEnd("Created admin user");

    console.log("Database seeded successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Seeding error:", error.message);
    } else {
      console.error("An unknown error occurred during seeding:", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.timeEnd("Seeded database");
  }
}

seed();
