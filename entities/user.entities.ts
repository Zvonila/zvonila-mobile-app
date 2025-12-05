import { AuthCredType } from "./auth.entities";

// User
export type UserType = {
    id: number;
    name: string;
    email: string;
    avatar_url?: string;
}

// ChangePassword
export interface IChangePassCred {
    password: string;
    new_password: string;
}

export type ChangePassCredType = AuthCredType & IChangePassCred;

// ChangeName
export interface IChangeNameCred {
    name: string;
}

export type ChangeNameCredType = AuthCredType & IChangeNameCred;
