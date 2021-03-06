import { 
    Router,
  } from "oak";
  

import {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
} from "../Controllers/UsersController.ts";


const userRouter = new Router();


userRouter.get("/users", getUsers);
userRouter.get("/users/:username", getUser);
userRouter.post("/users", postUser);
userRouter.put("/users/:username", putUser);
userRouter.delete("/users/:username", deleteUser);



export {userRouter}

