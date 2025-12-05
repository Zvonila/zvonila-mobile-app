
export type ResponseType<T> = {
    data?: T;
    error?: string;
}

export const useApi = async <ResT>(
    fetchFunc: () => Promise<Response>
): Promise<ResponseType<ResT>> => {
    try {
        const response = await fetchFunc()
        if (!response.ok) throw Error("Request Error")
        const data = await response.json() as ResT
    console.log(data)
        return { data }
    } catch (error) {
        console.log(error)
        return { error: "Request Error" }
    }
} 