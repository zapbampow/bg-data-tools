import React from 'react'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage';
import { useSessionStorage } from './useSessionStorage';

export default function useLastUsername() {
    const params = useParams()
    const usernameFromUrl = params?.username;

    const [lastUsername, setLastUsername] = useLocalStorage("lastUsername", "") as [string, React.Dispatch<React.SetStateAction<string>>];
    const [hasAutoRedirected, setHasAutoRedirected] = useSessionStorage("hasAutoRedirected", false) as [boolean, React.Dispatch<React.SetStateAction<boolean>>];

    if (usernameFromUrl && usernameFromUrl !== lastUsername) {
        console.log({ usernameFromUrl, lastUsername })
        setLastUsername(usernameFromUrl);
        setHasAutoRedirected(true);
    }

    return { lastUsername, setLastUsername, hasAutoRedirected, setHasAutoRedirected };
}
