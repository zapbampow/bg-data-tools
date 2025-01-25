import { useGetCollection } from '../services/collectionService/getCollection'
import { useParams } from 'react-router-dom';

export function Component() {
    const { username = "" } = useParams();
    const collection = useGetCollection(username);

    return (
        <div>
            <h1>{username}'s Collection</h1>
            {collection.isLoading && <p>Loading...</p>}
            {collection.isError && <p>Error: {collection.error.message}</p>}
            {collection.data && <p>{JSON.stringify(collection.data)}</p>}
        </div>
    )
}
