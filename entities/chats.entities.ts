import { AuthCredType } from "./auth.entities";

export type ChatType = {
    id: number;
    initiator_id: number;
    receiver_id: number;
    created_at: string;
}

// CreateChat
export interface ICreateChatCred {
    receiver_id: number;
}
export type CreateChatCredType = AuthCredType & ICreateChatCred;

export type CreateChatResType = ChatType;

// DeleteChat
export interface DeleteChatCredType extends AuthCredType {
    chat_id: number;
}