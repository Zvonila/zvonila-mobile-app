
export const transofrmConnectionState = (state: string): string => {
    switch (state) {
        case "new":
        case "connecting":
            return "Connecting…";
        case "connected":
            return "Online";
        case "disconnected":
            return "Disconnecting…";
        case "closed":
            return "Offline";
        case "failed":
            return "Error";
        default:
            return "Unknown";
    }
}