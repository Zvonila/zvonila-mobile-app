import { UserType } from "./user.entities";

// Common 
export interface TokenType {
    access_token: string;
    token_type: "bearer";
}

export type AuthCredType = {
    access_token: string;
}

// Login
export type LoginCredType = {
    email: string;
    password: string;
}

export type LoginResType = TokenType;

// Register
export type RegisterCredType = {
    email: string;
    name: string;
    password: string;
}

export type RegisterResType = TokenType;

// Verify
export type VerifyCredType = AuthCredType;

export type VerifyResType = UserType;

// Logout 
export type LogoutCredType = AuthCredType;