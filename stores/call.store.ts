import { CallType } from "@/entities/calls.entities";
import { create } from "zustand";

type CallStore = {
    currentCall: CallType | null;     // активный звонок
    incomingOffer: string | null;     // SDP offer от инициатора
    localOffer: string | null;        // SDP offer (если мы инициатор)
    answer: string | null;            // SDP answer
    iceCandidates: any[];             // ICE кандидаты
    pc: RTCPeerConnection | null;

    // setters
    setCurrentCall: (call: CallType | null) => void;
    setIncomingOffer: (offer: string | null) => void;
    setLocalOffer: (offer: string | null) => void;
    setAnswer: (answer: string | null) => void;
    addIceCandidate: (candidate: any) => void;
    setPC: (pc: RTCPeerConnection | null) => void;


    // очистка звонка
    resetCall: () => void;
};

export const useCallStore = create<CallStore>((set, get) => ({
    currentCall: null,
    incomingOffer: null,
    localOffer: null,
    answer: null,
    iceCandidates: [],
    pc: null,

    setCurrentCall: (call) => set({ currentCall: call }),
    setIncomingOffer: (offer) => set({ incomingOffer: offer }),
    setLocalOffer: (offer) => set({ localOffer: offer }),
    setAnswer: (answer) => set({ answer }),
    setPC: (pc) => set({ pc }),

  addIceCandidate: (candidate) =>
        set((state) => ({
            iceCandidates: [...state.iceCandidates, candidate],
        })),

    resetCall: () =>
        set({
            currentCall: null,
            incomingOffer: null,
            localOffer: null,
            answer: null,
            iceCandidates: [],
            pc: null,
        }),
}));
