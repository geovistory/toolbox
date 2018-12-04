export interface Op {
    insert: string,
    attributes?: {
        node?: number,
        [key: string]: any
    }
}

export interface Delta {
    ops?: Op[]
}

/**
 * This is the interface for data that is stored
 */
export interface QuillDoc {
    latestId: number
    contents: Delta;
}


