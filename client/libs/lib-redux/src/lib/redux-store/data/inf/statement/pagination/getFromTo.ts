import { getEnd } from './getEnd';
import { getStart } from './getStart';

export function getFromTo(limit: number, offset: number) {
    return getStart(limit, offset) + '_' + getEnd(limit, offset);
}
