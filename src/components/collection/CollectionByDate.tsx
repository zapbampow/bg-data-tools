import { ActionIcon } from '~/components/collection/actionIcons'
import { ExternalLink } from '../icons'
import type { CollectionAction } from '~/utils/collection/types'
import { groupCollectionByDate } from '~/utils/collection/groupCollectionByDate'

type Props = {
    games: CollectionAction[]
}

export default function CollectionByDate({ games }: Props) {
    const actionHistory = groupCollectionByDate(games)

    return (
        <div>
            <div className="grid p-4 gap-4 bg-white border rounded">
                {actionHistory.map((group) => (
                    <div key={group.date}>
                        <h2 className='font-semibold'>{group.date}</h2>
                        <ul>
                            {group.actions.map((game, j) => (
                                <li key={j} className="text-lg flex items-center">
                                    <ActionIcon action={game.action} /> <span className='pl-2'>{game.gameName} <a className='inline-flex' href={`https://boardgamegeek/${game.gameId}`}><ExternalLink className="inline w-4 align-middle" /></a></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}