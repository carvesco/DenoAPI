import {
  Application
} from "https://deno.land/x/oak@v9.0.1/mod.ts";

import logger from "./Middlewares/logger.ts";
import header from "./Middlewares/header.ts";
import notFound from "./Middlewares/notFound.ts";
import errorHandler from "./Middlewares/errorHandler.ts";
import { userRouter } from "./Routes/userRouter.ts";

const app = new Application();

app.use(logger);
app.use(header);
app.use(notFound);
app.use(errorHandler);


app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

console.log("Deno se esta ejecutando en http://localhost:8000");

await app.listen({ port: 8000 });
