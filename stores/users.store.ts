import { UserType } from "@/entities/user.entities";
import { ResponseType } from "@/hooks/useApi";
import { getUsers } from "@/infrastructure/users.api";
import { getToken } from "@/utils/access-token.utils";
import { create } from "zustand";

type Store = {
    users: UserType[];
    fetchUsers: () => Promise<ResponseType<UserType[]>>;
}

export const useUsersStore = create<Store>((set, get) => ({
    users: [],
    fetchUsers: async () => {
        const token = await getToken() || "";
        const res = await getUsers({ access_token: token })
        if (res.data && !res.error) {
            set({ users: res.data })
        }

        return res
    }
}))