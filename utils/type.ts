export interface APIResponse<T> {
    data?: T;
    error?: string;
}

export interface IRoom {
    id: string;
}

export interface LogCandidateType {
    candidate: RTCIceCandidate;
    date: Date;
}

export interface ZvonilaContextProps {
    isCreator: boolean;
    onlineStatus: string;
    localCandidates: LogCandidateType[];
    remoteCandidates: LogCandidateType[];
    remoteStream: MediaStream | undefined;
    localStream: MediaStream | undefined;
    createRoom: () => Promise<string | undefined>;
    connectToRoom: (id: string) => void;
}

export interface SignalingChannelCallback {
    offer?: RTCSessionDescriptionInit;
    iceCandidate?: RTCIceCandidate;
}