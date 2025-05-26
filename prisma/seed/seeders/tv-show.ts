import { Genre } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { prismaClient } from "../../../src/app";

export const seedTVShows = async () => {
  for (let i = 0; i < 5; i++) {
    // Step 1: Create content for TV show
    const content = await prismaClient.content.create({
      data: {
        title: faker.lorem.words(3),
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

    // Step 2: Create TV show with the above content
    const tvShow = await prismaClient.tVShow.create({
      data: {
        content: {
          connect: { id: content.id },
        },
      },
    });

    // Step 3: Add random episodes (8–21 per show)
    const numberOfEpisodes = faker.number.int({ min: 8, max: 21 });
    for (let j = 1; j <= numberOfEpisodes; j++) {
      await prismaClient.episode.create({
        data: {
          episodeNumber: j,
          seasonNumber: 1,
          releaseDate: faker.date.past(),
          director: faker.person.fullName(),
          actors: [faker.person.fullName(), faker.person.fullName()],
          tvShowId: tvShow.id,
        },
      });
    }
  }
};
