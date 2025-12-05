
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

export type GetMessagesResType = MessageType[];

// CreateChat
export type CreateMessageCredType = {
    chat_id: number;
    text: string;
}

export type CreateMessageResType = MessageType;

// DeleteMessage
export type DeleteMessageCredType = {
    message_id: number;
}