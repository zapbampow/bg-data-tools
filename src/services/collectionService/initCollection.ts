import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "./config";

interface ResponseData {
    message: string;
    action: string;
}

interface Props {
    username: string;
    onSuccess?: ((data: ResponseData, variables: void, context: unknown) => Promise<unknown> | unknown) | undefined;
    onError?: ((error: Error, variables: void, context: unknown) => Promise<unknown> | unknown) | undefined;
}

export const useInitCollection = ({ username, onSuccess, onError }: Props) => {
    const mutation = useMutation({
        mutationKey: ["init", username],
        mutationFn: () => initCollection(username),
        onSuccess: onSuccess && onSuccess,
        onError: onError && onError
    })

    return mutation;
}

const initCollection = async (username: string) => {
    const url = `${baseUrl}/collection/${username}`
    const method = 'POST'

    try {
        const res = await fetch(url, {
            method
        })
        // Check if the response is not ok before trying to parse JSON
        if (!res.ok) {
            // Create an error with detailed information
            const errorBody = await res.text();
            throw new Error(
                JSON.stringify({
                    status: res.status,
                    statusText: res.statusText,
                    body: errorBody
                })
            );
        }
        const json = await res.json() as ResponseData;
        return json;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            console.log({ err })
            throw new Error(String(err));
        }
    }

}
