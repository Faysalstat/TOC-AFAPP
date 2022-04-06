import * as publisher from "./publisher"
export const statusChangeListner = async (user: any) => {
    publisher.publishChangedStatus(user);
    return user;
}