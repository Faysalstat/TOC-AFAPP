import { Schema, model, connect, Types } from "mongoose";
import { StatusSchema } from "../model/status";
import { userSchema } from "../model/user";
const Status = model("Status", StatusSchema);

export const addStatus = async (modelToInsert) => {
  return await modelToInsert.save();
};
export const findStatusByName = async (statusName:string) => {
    return await Status.findOne({name:statusName});
  };

export const findStatusById =async (id:any) => {
  return await Status.findById({_id:id});
}

export const fetchAllStatus = async () => {
    return await Status.find();
  };