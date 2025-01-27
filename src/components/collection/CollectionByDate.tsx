import { GroupedAction } from '~/utils/collection/groupCollectionByActionDate'
import { ActionIcon } from '~/components/collection/actionIcons'
import { ExternalLink } from '../icons'

type Props = {

    actionHistory: GroupedAction[]
}

export default function CollectionByDate({ actionHistory }: Props) {
    return (
        <div>
            <div className="grid p-4 gap-4 bg-white border rounded">
                {actionHistory.map((group) => (
                    <div key={group.date}>
                        <h2 className='font-semibold'>{group.date}</h2>
                        <ul>
                            {group.actions.map((game, j) => (
                                <li key={j} className="text-lg">
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