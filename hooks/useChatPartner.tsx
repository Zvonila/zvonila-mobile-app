import { ChatType } from "@/entities/chats.entities";
import { UserType } from "@/entities/user.entities";
import { getUser } from "@/infrastructure/users.api";
import { getToken } from "@/utils/access-token.utils";
import { useEffect, useState } from "react";

export const useChatPartner = (chat?: ChatType, myId?: number) => {
    const [partner, setPartner] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            if (!chat) return;
            setLoading(true)
            const token = await getToken() || "";
            const userId = chat.initiator_id === myId ? chat.receiver_id : chat.initiator_id;
            const res = await getUser({
                id: userId,
                access_token: token
            })
            setLoading(false)

            if (res.error) setError(res.error);
            if (res.data) setPartner(res.data);
        }
        load()
    }, [chat, myId])

    return {
        loading,
        partner,
        error,
    }
}