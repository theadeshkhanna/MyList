import { Genre } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { prismaClient } from "../../app";

export const seedMovies = async () => {
  for (let i = 0; i < 10; i++) {
    // Create content first
    const content = await prismaClient.content.create({
      data: {
        title: faker.lorem.words(2),
        description: faker.lorem.sentences(2),
        genres: [faker.helpers.arrayElement(Object.values(Genre))],
        releaseDate: faker.date.past(),
        director: faker.person.fullName(),
        actors: [
          faker.person.fullName(),
          faker.person.fullName(),
          faker.person.fullName(),
        ],
      },
    });

    // Create movie with contentId
    await prismaClient.movie.create({
      data: {
        content: {
          connect: { id: content.id },
        },
      },
    });
  }
};
