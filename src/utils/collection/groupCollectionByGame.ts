import type { CollectionAction, GameGroup } from "./types";

export function groupCollectionByGame(data: CollectionAction[]) {
    const gameMap = new Map<number, GameGroup>();

    data.forEach((item) => {
        const { gameId, action, gameName, date } = item;

        if (!gameMap.has(gameId)) {
            gameMap.set(gameId, {
                gameId,
                gameName,
                actions: []
            });
        }

        const gameGroup = gameMap.get(gameId);
        if (!gameGroup) return

        gameGroup.actions.push({
            action,
            date
        });

    });

    return Array.from(gameMap.values());
}