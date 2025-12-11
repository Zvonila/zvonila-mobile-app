import { CreateMessageCredType, GetMessagesCredType, MessageType } from "@/entities/messsages.entities";
import { ResponseType } from "@/hooks/useApi";
import { createChatMessage, getChatMessages } from "@/infrastructure/message.api";
import { getToken } from "@/utils/access-token.utils";
import { create } from "zustand";

type Store = {
    messages: MessageType[];

    fetchMessages: (cred: GetMessagesCredType) => Promise<ResponseType<MessageType[]>>;
    createMessage: (cred: CreateMessageCredType) => Promise<ResponseType<MessageType>>;

    addMessage: (msg: MessageType) => void;
    removeMessage: (messageId: number) => void;
}

export const useMessagesStore = create<Store>((set, get) => ({
    messages: [],
    fetchMessages: async (cred) => {
        const token = await getToken() || "";
        const res = await getChatMessages({ ...cred, access_token: token })
        if (res.data && !res.error) {
            set({ messages: res.data })
        }

        return res
    },
    createMessage: async (cred) => {
        const token = await getToken() || "";
        const res = await createChatMessage({ ...cred, access_token: token })
        if (res.data && !res.error) {
            set(state => ({ messages: [res.data as MessageType, ...state.messages] }))
        }

        return res
    },
    addMessage: (cred) => {
        const exists = get().messages.some(el => el.id === cred.id);
        if (!exists) {
            set(state => ({ messages: [cred, ...state.messages] }))
        }
    },
    removeMessage: (messageId) => {
        set(state => ({
            messages: state.messages.filter(el => el.id !== messageId)
        }))
    }
}));