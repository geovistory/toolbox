import { TimeLineSettings } from 'projects/app-toolbox/src/app/modules/timeline/models/timeline';

// Class of this slice of store
export class PeItTimeline {

    timeLineSettings?: TimeLineSettings

    constructor(data?: PeItTimeline) {
        Object.assign(this, data);
    }
}
