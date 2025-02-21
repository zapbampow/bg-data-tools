import type { DateGroup, CollectionAction } from './types';

export function groupCollectionByDate(games: CollectionAction[]): DateGroup[] {
    const dateMap = new Map<string, DateGroup>();

    games.forEach((item) => {
        const { gameId, action, gameName, date } = item;

        if (!dateMap.has(date)) {
            dateMap.set(date, {
                date,
                actions: []
            });
        }

        dateMap.get(date)!.actions.push({
            gameId,
            gameName,
            action
        });
    });

    return Array.from(dateMap.values());
}
