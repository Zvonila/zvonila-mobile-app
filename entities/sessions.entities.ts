
// Common
export type SessionType = {
    id: number;
    user_id: number;
    ip: string;
    user_agent: string;
    created_at: string;
}

// GetSessions
export type SessionResType = SessionType[];

// DeleteSession
export type SessionCredType = {
    session_id: number;
}