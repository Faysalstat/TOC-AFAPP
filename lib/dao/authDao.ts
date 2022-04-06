import * as authHandler from "../handler/authHandler";

export const authenticate = async (doc: any) => {
  const user = await authHandler.authenticateUser(doc.body.name);
  console.log(user);
  return authHandler.postLogin(user);
};

export const signout = async (doc: any) => {
  const user = await authHandler.authenticateUser(doc.body.name);
  console.log(user);
  return authHandler.logout(user);
}
