import { PeItDetail } from 'app/core/state/models';

export interface IEntityEditorWrapper {
        peItState?: PeItDetail
}


export class EntityEditorWrapper implements IEntityEditorWrapper {
        peItState?: PeItDetail;

    constructor(data?:IEntityEditorWrapper) {
        Object.assign(
            this,
            data
        )
    }
}
