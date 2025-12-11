import { ChatWithDetailsType, ICreateChatCred } from "@/entities/chats.entities";
import { ResponseType } from "@/hooks/useApi";
import { createChat, getChats } from "@/infrastructure/chat.api";
import { getToken } from "@/utils/access-token.utils";
import { create } from "zustand";

type Store = {
    chats: ChatWithDetailsType[];
    fetchChats: () => Promise<ResponseType<ChatWithDetailsType[]>>;
    createChat: (cred: ICreateChatCred) => Promise<ResponseType<ChatWithDetailsType>>;
    addChat: (cred: ChatWithDetailsType) => void;
    removeChat: (chatId: number) => void;
    updateLastChatMessage: (chatId: number, lastMessage: ChatWithDetailsType["last_message"]) => void;
}

export const useChatsStore = create<Store>((set, get) => ({
    chats: [],
    fetchChats: async () => {
        const token = await getToken() || "";
        const res = await getChats({ access_token: token })
        if (res.data && !res.error) {
            console.log(res.data)
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
            set(state => ({ chats: [res.data as ChatWithDetailsType, ...state.chats] }))
        }

        return res
    },
    addChat: (cred) => {
        const exists = get().chats.some(el => el.id === cred.id);
        if (!exists) {
            set(state => ({ chats: [cred, ...state.chats] }));
        }
    },
    removeChat: (chatId) => {
        set(state => ({
            chats: state.chats.filter(el => el.id !== chatId)
        }))
    },
    updateLastChatMessage: (chatId, lastMessage) => {
        set(state => ({
            chats: state.chats.map(chat =>
                chat.id === chatId
                    ? { ...chat, last_message: lastMessage }
                    : chat
            )
        }));
    }
}))