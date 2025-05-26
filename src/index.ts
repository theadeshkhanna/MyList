import app from "./app";
import { PORT } from "./secrets";

app.listen(PORT, () => {
  console.log(`App is working`);
});

//**
// 1. make all tables and relations ✅
// 2. crud of only Lists ✅
// 3. seeders ✅
// 4. every method in try and catch in controllers ✅
// 5. singleton service for every model ✅
// 6. commenting for better understanding
// 6.5. zod valdations ✅
// 7. proper error handling
// 7.5 add middlewares ✅
// 8. dockerization
// 8.5. remove chatgpt console logs ✅
// 9. write tests ✅
// 9.5 user service ✅
// 10. think of using redis for fast My List access
//*
