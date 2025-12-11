import { BACKEND_URL } from "@/constants"
import { AuthCredType } from "@/entities/auth.entities"
import { ChatWithDetailsType, CreateChatCredType, CreateChatResType, DeleteChatCredType } from "@/entities/chats.entities"
import { useApi } from "@/hooks/useApi"

export const getChats = (cred: AuthCredType) => useApi<ChatWithDetailsType[]>(() => {
    return fetch(`${BACKEND_URL}/chats`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})

export const createChat = (cred: CreateChatCredType) => useApi<CreateChatResType>(() => {
    return fetch(`${BACKEND_URL}/chats`, {
        method: "POST",
        body: JSON.stringify(cred),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})

export const deleteChat = (cred: DeleteChatCredType) => useApi<string>(() => {
    return fetch(`${BACKEND_URL}/chats/${cred.chat_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})