import { AuthCredType } from "./auth.entities";
import { UserType } from "./user.entities";

export type GetUsersResType = UserType[];


export interface IGetUserCred {
    id: number
}

export type GetUserCredType = AuthCredType & IGetUserCred;