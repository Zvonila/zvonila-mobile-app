import { CreateMessageCredType, MessageType } from "@/entities/messsages.entities";
import { ResponseType } from "@/hooks/useApi";
import { create } from "zustand";

type Store = {
    messages: MessageType[];

    fetchMessages: () => Promise<ResponseType<MessageType[]>>;
    createMessage: (cred: CreateMessageCredType) => Promise<ResponseType<MessageType>>;

    addMessage: (msg: MessageType) => void;
}

export const useChatsStore = create<Store>((set, get) => ({
    messages: [],
    fetchMessages: async () => {

    },
    createMessage: async () => {},
}));