export interface Local {
    [index: string]: {
        [index: string]: object;
    }
}

export interface Lexicon {
    close: string,
    note: string,
    pitfall: string,
    deep: string
}