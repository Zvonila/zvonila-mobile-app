import * as SecureStore from "expo-secure-store";

const TOKEN_FIELD_NAME = "accesstoken";

export const setToken = async (data: string) => {
  await SecureStore.setItemAsync(TOKEN_FIELD_NAME, data);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_FIELD_NAME);
};

export const deleteToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_FIELD_NAME);
};