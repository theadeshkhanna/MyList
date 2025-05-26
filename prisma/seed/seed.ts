import { seedUsers } from "./seeders/user";
import { seedMovies } from "./seeders/movie";
import { seedTVShows } from "./seeders/tv-show";
import { seedWatchHistory } from "./seeders/watch-history";
import { seedPreferences } from "./seeders/preference";

async function main() {
  console.log("seeding Users...");
  await seedUsers();
  console.log("seeding Movies...");
  await seedMovies();
  console.log("seeding TV Shows and Episodes...");
  await seedTVShows();
  console.log("seeding Watch History...");
  await seedWatchHistory();
  console.log("seeding preference...");
  await seedPreferences();
  console.log("seeding complete");
}

main().catch((e) => {
  console.log("seeding error:", e);
  process.exit(1);
});
