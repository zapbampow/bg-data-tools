import { useEffect, useState } from 'react';
import { useGetCollection } from '../services/collectionService/getCollection'
import { useParams } from 'react-router-dom';
import CollectionByDate from '~/components/collection/CollectionByDate';
import ListTypeSelector from '~/components/collection/ListTypeSelector';
import { Container } from '~/components/pages/layout';
import CollectionByGame from '~/components/collection/CollectionByGame';
import useNamedSearchParams from '~/hooks/useNamedSearchParams';
import CollectionBeingPrepared from '~/components/collection/CollectionBeingPrepared';

export function Component() {
    const [listType, setListType] = useState<'date' | 'game'>('date');

    const { username = "" } = useParams();
    const [params, setSearchParams] = useNamedSearchParams(["action", "message"])
    const { data, isLoading, isError, isSuccess, error } = useGetCollection({ username });

    useEffect(() => {
        if (isSuccess) {
            const newParams = new URLSearchParams();
            setSearchParams(newParams);
        }
    }, [isSuccess, setSearchParams, data])


    const collectionBeingPrepared = params.message === "collection_still_preparing" || params.message === "tracking_initialized"

    return (
        <Container>
            <h1 className='text-5xl font-semibold text-white mb-8'>Collection Tracking History for {username}</h1>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: something went wrong getting you collection history</p>}

            {collectionBeingPrepared && <CollectionBeingPrepared />}
            {isSuccess && !data && <p>No collection history found for {username}</p>}

            {data && isSuccess && (
                <>
                    <ListTypeSelector listType={listType} setListType={setListType} />

                    {listType === 'date' &&
                        <CollectionByDate games={data} />
                    }

                    {listType === 'game' && data &&
                        <CollectionByGame games={data} />
                    }
                </>
            )}
        </Container>
    )
}
