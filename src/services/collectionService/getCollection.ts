import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { baseUrl } from "./config";
import { Game } from "~/utils/collection/groupCollectionByActionDate";

export const useGetCollection = (username: string): UseQueryResult<Game[], Error> => {
    const query = useQuery({
        queryKey: ["collection", username],
        queryFn: () => getCollection(username),
        retry: 0,
    })

    return query;

}

const getCollection = async (username = ""): Promise<Game[]> => {
    const url = `${baseUrl}/collection/${username}`
    const method = 'GET'

    if (!username.length) throw new Error('username is undefined')

    try {
        const res = await fetch(url, {
            method
        })
        const json = await res.json() as Game[];
        return json;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
}