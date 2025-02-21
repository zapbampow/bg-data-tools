import { ActionIcon } from '~/components/collection/actionIcons'
import { ExternalLink } from '../icons'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { groupCollectionByGame } from '~/utils/collection/groupCollectionByGame'
import type { CollectionAction } from '~/utils/collection/types'

dayjs.extend(localizedFormat)

type Props = {
    games: CollectionAction[]
}

export default function CollectionByGame({ games }: Props) {
    const groupedGames = groupCollectionByGame(games);
    return (
        <div>
            <div className="grid p-4 gap-4 bg-white border rounded">
                {groupedGames.map((game) => (
                    <div key={game.gameId}>
                        <h2 className='font-semibold text-lg'>{game.gameName} <a className='inline-flex' href={`https://boardgamegeek/${game.gameId}`}><ExternalLink className="inline w-4 align-middle" /></a></h2>
                        <ul>
                            {game.actions.map((action, j) => (
                                <li className='flex items-center' key={j}>
                                    <ActionIcon action={action.action} /> <span className='pl-2'>{dayjs(action.date).format("ll")} </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
