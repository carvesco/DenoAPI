import { IUser, Users } from "../Models/User.ts";
import { helpers, RouterContext } from "https://deno.land/x/oak@v9.0.1/mod.ts";

export const getUsers = (context: RouterContext) => {
  const { response, request } = context;
  response.status = 200;
  response.body = {
    sucess: true,
    msg: "Metodo GET HTPP que actua sobre el recurso  /users",
    data: Users,
  };
};

export const getUser = (context: RouterContext) => {
  const { response, params } = context;
  const user: IUser | undefined =
    Users.filter((user: IUser) => user.username === params.username)[0];
  const data: any = user ? user : `No existe ${params.username}`;
  response.status = user ? 200 : 404;
  response.body = {
    sucess: true,
    msg:
      `Metodo GET HTPP que actua sobre el recurso  /users/${params.username}`,
    data: data,
  };
};

export const postUser = async (context: RouterContext) => {
  const { response, request } = context;
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "no se enviaron datos en el cuerpo",
    };
    return;
  }
  const result = await request.body({ type: "json" });
  console.log(result);
  const userBody = await result.value;
  console.log(userBody);
  Users.push(userBody);
  response.status = 201;
  response.body = {
    sucess: true,
    msg: `Metodo POST HTPP que actua sobre el recurso  /users`,
    data: userBody,
  };
};

export const putUser = async (context: RouterContext) => {
  const { response, request } = context;
  const { username } = helpers.getQuery(context, { mergeParams: true });
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "no se enviaron datos en el cuerpo",
    };
    return;
  }
  let user: IUser | undefined =
    Users.filter((usr: IUser) => usr.username === username)[0];
  if (!user) {
    response.status = 404;
    response.body = {
      success: false,
      msg: `No exixte el recurso ${username}`,
    };
    return;
  }
  const result = await request.body({ type: "json" });
  const userBody: IUser = await result.value;
  response.status = 201;
  user = { ...user, ...userBody };
  //Users = [...Users.filter((usr: IUser)=>usr.username !== username),user];
  const filteredUsers: Array<IUser> = Users.filter((usr: IUser) =>
    usr.username !== username
  );
  Users.splice(0, Users.length);
  Users.push(...filteredUsers);
  Users.push(user);
  response.status = 2000;
  response.body = {
    sucess: true,
    msg: `Metodo PUT  HTPP que actua sobre el recurso  /users/${username}`,
    data: userBody,
  };
};

export const deleteUser = (context: RouterContext) => {
  const { response, params } = context;
  let user: IUser | undefined =
    Users.filter((usr: IUser) => usr.username === params.username)[0];
  if (!user) {
    response.status = 404;
    response.body = {
      success: false,
      msg: `No exixte el recurso ${params.username}`,
    };
    return;
  }
  //Users = [...Users.filter((usr: IUser)=>usr.username !== params.username)];
  const filteredUsers: Array<IUser> = Users.filter((usr: IUser) =>
    usr.username !== params.username
  );
  Users.splice(0, Users.length);
  Users.push(...filteredUsers);
  response.status = 200;
  response.body = {
    sucess: true,
    msg:
      `Metodo DELETE HTPP que actua sobre el recurso  /users${params.username}`,
  };
};
