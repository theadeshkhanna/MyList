import { Genre } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { prismaClient } from "../../app";

export const seedPreferences = async () => {
  const users = await prismaClient.user.findMany();

  for (const user of users) {
    const favoriteGenres = faker.helpers.arrayElements(
      Object.values(Genre),
      faker.number.int({ min: 2, max: 3 })
    );
    let dislikedGenres = faker.helpers.arrayElements(
      Object.values(Genre).filter((g) => !favoriteGenres.includes(g)),
      faker.number.int({ min: 1, max: 2 })
    );

    // Ensure there's no overlap
    dislikedGenres = dislikedGenres.filter(
      (genre) => !favoriteGenres.includes(genre)
    );

    await prismaClient.preferance.create({
      data: {
        userId: user.id,
        favoriteGenres,
        dislikedGenres,
      },
    });
  }
};
