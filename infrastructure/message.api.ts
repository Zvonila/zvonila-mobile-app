import { BACKEND_URL } from "@/constants";
import { CreateMessageCred, CreateMessageResType, GetMessagesCred, GetMessagesResType } from "@/entities/messsages.entities";
import { useApi } from "@/hooks/useApi";

export const getChatMessages = (cred: GetMessagesCred) => useApi<GetMessagesResType>(() => {
    const params = new URLSearchParams({
        chat_id: cred.chat_id.toString(),
        limit: cred.limit.toString(),
        offset: cred.offset.toString(),
    });
    return fetch(`${BACKEND_URL}/messages/?${params.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})

export const createChatMessage = (cred: CreateMessageCred) => useApi<CreateMessageResType>(() => {
    return fetch(`${BACKEND_URL}/messages`, {
        method: "POST",
        body: JSON.stringify(cred),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})