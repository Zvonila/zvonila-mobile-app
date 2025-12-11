
export type CallType = {
    id: number;
    initiator_id: number;
    type: string;
    status: string;
    created_at: string;
    answered_at: string;
    ended_at: string;
    last_update_at: string;
}

export type CreateCallCred = {
    offer: string;
    to_user_id: number;
    type: "audio" | "video";
}

export type GetCallCred = {
    id: number
}

export type DeclineCallCred = {
    call_id: number
}

export type CancelCallCred = {
    call_id: number;
}

export type AcceptCallCred = {
    answer: string;
    call_id: number;
} 

export type EndCallCred = {
    call_id: number;
}
