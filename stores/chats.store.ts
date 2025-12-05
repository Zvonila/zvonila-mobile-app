import { ChatType, ICreateChatCred } from "@/entities/chats.entities";
import { ResponseType } from "@/hooks/useApi";
import { createChat, getChats } from "@/infrastructure/chat.api";
import { getToken } from "@/utils/access-token.utils";
import { create } from "zustand";

type Store = {
    chats: ChatType[];
    fetchChats: () => Promise<ResponseType<ChatType[]>>;
    createChat: (cred: ICreateChatCred) => Promise<ResponseType<ChatType>>;
}

export const useChatsStore = create<Store>((set, get) => ({
    chats: [],
    fetchChats: async () => {
        const token = await getToken() || "";
        const res = await getChats({ access_token: token })
        if (res.data && !res.error) {
            set({ chats: res.data })
        }

        return res
    },
    createChat: async (cred) => {
        const token = await getToken() || "";
        const res = await createChat({
            ...cred,
            access_token: token
        })

        if (!res.error && res.data !== undefined) {
            set(state => ({ chats: [res.data, ...state.chats] }))
        } 

        return res
    }
}))