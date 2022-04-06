import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as db from "../lib/db-connector";
import * as authDao from "../lib/dao/authDao";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await db.init();
  context.res = {
    body: { data: await authDao.signout(req) },
  };

};

export default httpTrigger;