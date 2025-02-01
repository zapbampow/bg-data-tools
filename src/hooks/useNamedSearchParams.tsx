import { useSearchParams } from 'react-router-dom'

export default function useNamedSearchParams(params: string[]) {
    const [searchParams, setSearchParams] = useSearchParams();
    const results = params.reduce((acc: { [key: string]: string | null }, cur) => {
        acc[cur] = searchParams.get(cur)
        return acc;
    }, {})

    return [results, setSearchParams] as const;
}
