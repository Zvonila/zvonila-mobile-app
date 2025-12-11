import { BACKEND_URL } from "@/constants"
import { AuthCred } from "@/entities/auth.entities"
import { AcceptCallCred, CallType, CancelCallCred, CreateCallCred, DeclineCallCred, EndCallCred, GetCallCred } from "@/entities/calls.entities"
import { useApi } from "@/hooks/useApi"

export const startCall = (cred: AuthCred<CreateCallCred>) => useApi<CallType>(() => {
    return fetch(`${BACKEND_URL}/call/start`, {
        method: "POST",
        body: JSON.stringify(cred),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})

export const cancelCall = (cred: AuthCred<CancelCallCred>) => useApi<CallType>(() => {
    return fetch(`${BACKEND_URL}/call/cancel`, {
        method: "POST",
        body: JSON.stringify(cred),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})

export const acceptCall = (cred: AuthCred<AcceptCallCred>) => useApi<CallType>(() => {
    return fetch(`${BACKEND_URL}/call/accept`, {
        method: "POST",
        body: JSON.stringify(cred),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})

export const declineCall = (cred: AuthCred<DeclineCallCred>) => useApi<CallType>(() => {
    return fetch(`${BACKEND_URL}/call/decline`, {
        method: "POST",
        body: JSON.stringify(cred),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})

export const endCall = (cred: AuthCred<EndCallCred>) => useApi<CallType>(() => {
    return fetch(`${BACKEND_URL}/call/decline`, {
        method: "POST",
        body: JSON.stringify(cred),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})

export const getCall = (cred: AuthCred<GetCallCred>) => useApi<CallType>(() => {
    return fetch(`${BACKEND_URL}/call/${cred.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cred.access_token}`
        }
    })
})
