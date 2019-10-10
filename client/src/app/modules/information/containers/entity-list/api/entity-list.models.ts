import { List } from '../../list/api/list.models';


export class Information {

    // search results
    items?: List;

    loading?: boolean;

    constructor(data?: Information) {
        Object.assign(this, data);
    }
}
