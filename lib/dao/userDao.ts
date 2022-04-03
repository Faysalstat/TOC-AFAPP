import { Schema, model, connect, Types } from "mongoose";
import { userSchema } from "../model/user";
import * as userRepo from "../repo/userRepo";
import * as statusRepo from "../repo/statusRepo";
const User = model("User", userSchema);


export const addUser = async (doc:any) => {
    const status = await statusRepo.findStatusByName("Active")
    const user = new User(
        {name:doc.body.name}
        );
    const userToUpdate = await userRepo.addUser(user);
    userToUpdate.status = status._id;
    return await userRepo.updateUserStatus(userToUpdate);
  };
  
  
  export const findUserById = async (id) => {
    return await userRepo.findUserById(id);
  };
  export const getAllUser = async (id:string)=>{
    return userRepo.getAllUser(id);
  };
  export const updateUserStatus = async (doc:any) => {
    const userModel = new User(
        {name:doc.body.name,
        status:doc.body.status._id}
        );
    return await userRepo.addUser(userModel);
  };