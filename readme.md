# 🎬 Stage API – My List Feature (Backend)

This project implements the **"My List" feature** for an OTT platform using **Node.js**, **Express**, **TypeScript**, **Prisma**, **PostgreSQL**, and **Redis**. It allows users to manage a personalized list of their favorite movies and TV shows — including adding, removing, and fetching content.

Deployed on: [Heroku](https://stage-api-my-list-3cd78d71a173.herokuapp.com)

---

## 📦 Features

- ✅ **Add to My List** — Add a movie or TV show to the user's personalized list.
- ✅ **Remove from My List** — Remove any saved item from the list.
- ✅ **List My Items** — View paginated saved content (used on Home screen).
- ✅ **Watch History** — Track watched movies and shows with ratings.
- ✅ **Genre Preferences** — Users can specify favorite and disliked genres.
- ✅ **Caching with Redis** — To optimize performance for frequent "List My Items" queries.

---

## ⚙️ Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Language      | TypeScript                          |
| Web Framework | Express.js                          |
| ORM           | Prisma                              |
| Database      | PostgreSQL (Heroku)                 |
| Caching       | Redis (Heroku Redis)     |
| Hosting       | Heroku                              |
| Auth          | JWT                                 |
| Testing       | Jest + Supertest                    |
| Validation    | Zod                                 |

---

## 🚀 Deployment

The service is deployed at:

> 🌐 [https://stage-api-my-list-3cd78d71a173.herokuapp.com](https://stage-api-my-list-3cd78d71a173.herokuapp.com)

You can test the public endpoints via Postman or browser. Use your JWT token in the `Authorization` header for authenticated routes.

---

## 🧪 Seeded Data

The database is already seeded with:

- ✅ 5 test users (password: `password`)
- ✅ 10 movies and 5 TV shows (with random 8–21 episodes each)
- ✅ Watch history entries
- ✅ Lists and List Items

> For details on structure and data formats, refer to the attached PDF below.

---

## 🚀 Setup Instructions

- Clone the repo
```
git clone https://github.com/your-username/stage-api.git
cd stage-api
```

- Install dependencies
```
npm install
```

- Set environment variables
```
DATABASE_URL=your_postgres_connection_url
REDIS_URL=your_redis_connection_url
JWT_SECRET=your_jwt_secret
```

- Run the server
```
npm run start:dev
```

- Seed the database (optional)
```
npm run seed
```

- Run tests
```
npm run test
```
---

## ⚡ Performance & Scalability

- Redis is used to cache results of "List My Items" to meet the <10ms response time requirement.
- Paginated endpoints prevent overload on large result sets.
- Indexed fields in PostgreSQL improve join & filter performance.
- Prisma queries are selectively optimized to avoid over-fetching.

---

## ✍️ Documentation

> 🌐 refer this link for postman documentation: [https://documenter.getpostman.com/view/32664279/2sB2qcE281](https://documenter.getpostman.com/view/32664279/2sB2qcE281)

---
