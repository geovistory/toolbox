import { getStart } from './getStart';


export function getEnd(limit: number, offset: number) {
    return getStart(limit, offset) + limit;
}
