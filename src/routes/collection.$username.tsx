import { useState } from 'react';
import { useGetCollection } from '../services/collectionService/getCollection'
import { useParams } from 'react-router-dom';
import CollectionByDate from '~/components/collection/CollectionByDate';
import ListTypeSelector from '~/components/collection/ListTypeSelector';
import { Container } from '~/components/pages/layout';
import { groupCollectionByActionDate, type GroupedAction } from '~/utils/collection/groupCollectionByActionDate';
import CollectionByGame from '~/components/collection/CollectionByGame';

export function Component() {
    const { username = "" } = useParams();
    const { data, isLoading, isError, error } = useGetCollection(username);

    const actionHistory: GroupedAction[] = groupCollectionByActionDate(data || []);
    console.log({ data, actionHistory })

    const [listType, setListType] = useState<'date' | 'game'>('date');

    return (
        <Container>
            <h1 className='text-5xl font-semibold text-white mb-8'>Collection Tracking History for {username}</h1>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: something went wrong getting you collection history</p>}

            <ListTypeSelector listType={listType} setListType={setListType} />

            {listType === 'date' &&
                <CollectionByDate actionHistory={actionHistory} />
            }

            {listType === 'game' && data &&
                <CollectionByGame games={data} />
            }
        </Container>
    )
}
