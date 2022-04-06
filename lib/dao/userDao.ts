import { model } from "mongoose";
import { userSchema } from "../model/user";
import * as userRepo from "../repo/userRepo";
import * as statusRepo from "../repo/statusRepo";
const User = model("User", userSchema);

export const addUser = async (doc: any) => {
  const status = await statusRepo.findStatusByName("Active")
  const user = new User(
    { name: doc.body.name }
  );
  const userToUpdate = await userRepo.addUser(user);
  userToUpdate.status = status._id;
  return await userRepo.updateUserStatus(userToUpdate);
};


export const findUserById = async (id) => {
  return await userRepo.findUserById(id);
};
export const findUserByName = async (username: string) => {
  return await userRepo.findUserByName(username);
};
export const getAllUser = async (id: string) => {
  return userRepo.getAllUser(id);
};
export const updateUserStatus = async (doc: any) => {
  console.log("=======================Request===============================")
  console.log(doc);
  const userModel = new User(
    {
      _id: doc.body._id,
      name: doc.body.name,
      status: doc.body.status._id
    }
  );
  try {
    return await userRepo.updateUserStatus(userModel);
  } catch (error) {
    return error;
  }


};