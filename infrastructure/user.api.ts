import { BACKEND_URL } from "@/constants";
import { ChangeNameCredType, ChangePassCredType } from "@/entities/user.entities";
import { useApi } from "@/hooks/useApi";

export const changePassword = (cred: ChangePassCredType) => useApi<string>(() => {
    return fetch(`${BACKEND_URL}/users/change-password`, {
        method: "PUT",
        body: JSON.stringify(cred),
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})

export const changeName = (cred: ChangeNameCredType) => useApi<string>(() => {
    return fetch(`${BACKEND_URL}/users/change-name`, {
        method: "PUT",
        body: JSON.stringify(cred),
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})