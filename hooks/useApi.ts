export type ResponseType<T> = {
    data?: T;
    error?: string;
};

export const useApi = async <ResT>(
    fetchFunc: () => Promise<Response>
): Promise<ResponseType<ResT>> => {
    try {
        const response = await fetchFunc();

        if (!response.ok) {
            let errorMessage = "Ошибка запроса";

            try {
                const errorData = await response.json();
                if (typeof errorData === "object" && errorData?.detail) {
                    errorMessage = errorData.detail;
                }
                if (typeof errorData === "string") {
                    errorMessage = errorData;
                }
            } catch (_) {
            }

            return { error: errorMessage };
        }

        const data = (await response.json()) as ResT;
        return { data };
    } catch (err) {
        console.log("API ERROR:", err);
        return { error: "Network error" };
    }
};
