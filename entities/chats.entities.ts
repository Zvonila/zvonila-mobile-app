import { AuthCredType } from "./auth.entities";
import { MessageType } from "./messsages.entities";
import { UserType } from "./user.entities";

export type ChatType = {
    id: number;
    username: string;
    initiator_id: number;
    receiver_id: number;
    created_at: string;
}

export type ChatWithDetailsType = ChatType & {
    companion: UserType;
    last_message?: MessageType;
}

// CreateChat
export interface ICreateChatCred {
    receiver_id: number;
}
export type CreateChatCredType = AuthCredType & ICreateChatCred;

export type CreateChatResType = ChatWithDetailsType;

// DeleteChat
export interface DeleteChatCredType extends AuthCredType {
    chat_id: number;
}