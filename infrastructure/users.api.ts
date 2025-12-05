import { BACKEND_URL } from "@/constants";
import { AuthCredType } from "@/entities/auth.entities";
import { UserType } from "@/entities/user.entities";
import { GetUserCredType, GetUsersResType } from "@/entities/users.entities";
import { useApi } from "@/hooks/useApi";

export const getUsers = (cred: AuthCredType) => useApi<GetUsersResType>(() => {
    return fetch(`${BACKEND_URL}/users`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})

export const getUser = (cred: GetUserCredType) => useApi<UserType>(() => {
    return fetch(`${BACKEND_URL}/users/${cred.id}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})
