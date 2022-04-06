import { model } from "mongoose";
import { StatusSchema } from "../model/status";
import { userSchema } from "../model/user";
import * as listener from "../listener";
const Status = model("Status", StatusSchema);
const User = model("User", userSchema);

export const addUser = (modelToInsert: any) => {
  return modelToInsert.save();
};

export const updateUserStatus = async (modelToUpdate: any) => {
  console.log({ status: "--------------------user repo----------------------------", modelToUpdate: modelToUpdate })
  // console.log(modelToUpdate);
  await User.updateOne({ _id: modelToUpdate._id }, { $set: modelToUpdate });
  const modelToPublish = await User.findById(modelToUpdate._id).populate("status");
  console.log({ status: "----------------------publish-------------------------", modelToPublish: modelToPublish })
  return listener.statusChangeListner(modelToPublish);
};

export const addStatus = async (doc) => {
  console.log(doc);
  const modelToInsert = new Status({
    name: doc.body.name,
    color: doc.body.color,
  });
  return await modelToInsert.save();
};
export const findUserById = async (id: string) => {
  return await User.findById(id).populate("status");
};
export const findUserByName = async (username: string) => {
  return await User.find({ name: username }).populate("status");
};
export const getAllUser = async (id: string) => {
  return await User.find({ _id: { $ne: id } }).populate("status");
};
