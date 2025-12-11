import { AuthCredType } from "./auth.entities";

export type MessageType = {
    id: number;
    chat_id: number;
    sender_id: number;
    text: string;
    created_at: string;
}

// GetMessages
export type GetMessagesCredType = {
    chat_id: number;
    limit: number;
    offset: number;
}

export type GetMessagesCred = GetMessagesCredType & AuthCredType;

export type GetMessagesResType = MessageType[];

// CreateChat
export type CreateMessageCredType = {
    chat_id: number;
    text: string;
}

export type CreateMessageCred = CreateMessageCredType & AuthCredType;

export type CreateMessageResType = MessageType;

// DeleteMessage
export type DeleteMessageCredType = {
    message_id: number;
}

// Get Last Chat Message
export type GetLastChatMessageCred = {
    chat_id: number;
}