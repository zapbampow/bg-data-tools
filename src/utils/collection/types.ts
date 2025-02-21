export type Game = {
    gameId: number;
    gameName: string;
}

export type Action = 'add' | 'remove';
export type Date = string;

export interface DateGroupAction extends Game {
    action: Action;
}

export type DateGroup = {
    date: string;
    actions: DateGroupAction[];
}

export interface GameGroup extends Game {
    actions: Action[]
}

export interface CollectionAction extends Game {
    date: Date;
    action: Action;
}