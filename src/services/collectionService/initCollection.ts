import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import { baseUrl } from "./config";

export const useInitCollection = (username: string): UseMutationResult<Response, Error, void, unknown> => {
    const mutation = useMutation({
        mutationKey: ["init", username],
        mutationFn: () => initCollection(username)
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
        const json = await res.json() as Response;
        return json;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }

}
