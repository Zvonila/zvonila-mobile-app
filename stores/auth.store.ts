import { LoginCredType, RegisterCredType, TokenType } from "@/entities/auth.entities";
import { IChangeNameCred, IChangePassCred, UserType } from "@/entities/user.entities";
import { ResponseType } from "@/hooks/useApi";
import { login, logout, register, verify } from "@/infrastructure/auth.api";
import { changeName, changePassword } from "@/infrastructure/user.api";
import { deleteToken, getToken, setToken } from "@/utils/access-token.utils";
import { create } from "zustand";

type Store = {
    user: UserType | null;
    isAuth: () => Promise<boolean>;
    verify: () => Promise<ResponseType<UserType>>;
    login: (cred: LoginCredType) => Promise<ResponseType<TokenType>>;
    register: (cred: RegisterCredType) => Promise<ResponseType<TokenType>>;
    logout: () => Promise<ResponseType<string>>;
    changePassword: (cred: IChangePassCred) => Promise<ResponseType<string>>;
    changeName: (cred: IChangeNameCred) => Promise<ResponseType<string>>;
}

export const useAuthStore = create<Store>((set, get) => ({
    user: null,
    isAuth: async () => !!(await getToken()),
    verify: async () => {
        const token = await getToken() || "";
        const res = await verify({ access_token: token });
        if (res.data && !res.error) {
            set({ user: res.data })
        }

        return res
    },
    login: async (cred) => {
        const res = await login(cred);
        if (res.data && !res.error) {
            setToken(res.data.access_token);
            get().verify()
        }
        return res
    },
    register: async (cred) => {
        const res = await register(cred);
        if (res.data && !res.error) {
            setToken(res.data.access_token);
            get().verify()
        }
        return res
    },
    logout: async () => {
        const token = await getToken() || "";
        const res = await logout({ access_token: token });
        if (res.data && !res.error) {
            set({ user: null })
        }
        await deleteToken()
        return res
    },
    changePassword: async (cred) => {
        const token = await getToken() || "";
        return await changePassword({...cred, access_token: token})
    },
    changeName: async (cred) => {
        const token = await getToken() || "";
        const res = await changeName({...cred, access_token: token})

        if (!res.error) {
            set(state => ({ 
                ...state, 
                user: state.user && { ...state.user, name: cred.name} 
            }))
        }

        return res
    }
}))