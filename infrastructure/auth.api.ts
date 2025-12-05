import { BACKEND_URL } from "@/constants";
import { LoginCredType, LoginResType, LogoutCredType, RegisterCredType, RegisterResType, VerifyCredType, VerifyResType } from "@/entities/auth.entities";
import { useApi } from "@/hooks/useApi";

export const login = (cred: LoginCredType) => useApi<LoginResType>(() => {
    return fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(cred),
        headers: { "Content-Type": "application/json" }
    })
})

export const register = (cred: RegisterCredType) => useApi<RegisterResType>(() => {
    return fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(cred),
        headers: { "Content-Type": "application/json" }
    })
})

export const verify = (cred: VerifyCredType) => useApi<VerifyResType>(() => {
    return fetch(`${BACKEND_URL}/auth/verify`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})

export const logout = (cred: LogoutCredType) => useApi<string>(() => {
    return fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${cred.access_token}`
        }
    })
})