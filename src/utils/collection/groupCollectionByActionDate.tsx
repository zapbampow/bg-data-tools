export interface Game {
    gameName: string;
    gameId: number;
    actions: { action: 'add' | 'remove'; date: string }[];
    status: string;
    thumbnailUrl: string;
    lastUpdated: string;
    lastModifiedBGG: string;
}

export interface GroupedAction {
    date: string;
    actions: {
        action: 'add' | 'remove';
        gameName: string;
        gameId: number;
        thumbnail: string;
    }[];
}

export function groupCollectionByActionDate(games: Game[]): GroupedAction[] {
    const dateGroups: Record<string, GroupedAction> = {};

    games.forEach(game => {
        const actionDate = game.actions[0].date.split(' ')[0];
        const actionDetails = {
            action: game.actions[0].action,
            gameName: game.gameName,
            gameId: game.gameId,
            thumbnail: game.thumbnailUrl
        };

        if (!dateGroups[actionDate]) {
            dateGroups[actionDate] = { date: actionDate, actions: [] };
        }

        dateGroups[actionDate].actions.push(actionDetails);
    });

    return Object.values(dateGroups).sort((a, b) =>
        b.date.localeCompare(a.date)
    );
}