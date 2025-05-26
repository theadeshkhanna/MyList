import { faker } from "@faker-js/faker";
import { prismaClient } from "../../../src/app";

export const seedWatchHistory = async () => {
  const users = await prismaClient.user.findMany();
  const movies = await prismaClient.movie.findMany({
    include: { content: true },
  });
  const shows = await prismaClient.tVShow.findMany({
    include: { content: true },
  });

  for (const user of users) {
    // Pick 2–3 random movies
    const randomMovies = faker.helpers.arrayElements(
      movies,
      faker.number.int({ min: 2, max: 3 })
    );

    for (const movie of randomMovies) {
      await prismaClient.watchHistory.create({
        data: {
          watchedOn: faker.date.recent(),
          rating: faker.number.int({ min: 1, max: 5 }),
          userId: user.id,
          contentId: movie.content.id,
        },
      });
    }

    // Pick 1–2 random TV shows
    const randomShows = faker.helpers.arrayElements(
      shows,
      faker.number.int({ min: 1, max: 2 })
    );

    for (const show of randomShows) {
      await prismaClient.watchHistory.create({
        data: {
          watchedOn: faker.date.recent(),
          rating: faker.number.int({ min: 1, max: 5 }),
          userId: user.id,
          contentId: show.content.id,
        },
      });
    }
  }
};
