import { model } from "mongoose";
import { userSchema } from "../model/user";
import * as userRepo from "../repo/userRepo";
import * as statusRepo from "../repo/statusRepo";
const User = model("User", userSchema);

export const authenticateUser = async (username: any) => {
  let user = await userRepo.findUserByName(username);
  if (user.length == 0) {
    const newuser = new User({ name: username });
    return await userRepo.addUser(newuser);
  }
  return user[0];
};
export const postLogin = async (user: any) => {
  const status = await statusRepo.findStatusByName("Active");
  user.status = status._id;
  const activeUser = await userRepo.updateUserStatus(user);
  return activeUser;
};

export const logout = async (user: any) => {
  const status = await statusRepo.findStatusByName("Offline");
  user.status = status._id;
  const deactiveUser = await userRepo.updateUserStatus(user);
  return deactiveUser;
};
