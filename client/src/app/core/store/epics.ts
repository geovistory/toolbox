import { Injectable } from '@angular/core';

import { LoadingBarEpics } from '../loading-bar/api/loading-bar.epics';
import { ActiveProjectEpics } from '../active-project/active-project.epics';


@Injectable()
export class RootEpics {
    constructor(
        private loadingBarEpics: LoadingBarEpics,
        private activeProjectEpics: ActiveProjectEpics
    ) { }

    public createEpics() {
        return [
            ...this.loadingBarEpics.createEpics(),
            ...this.activeProjectEpics.createEpics()
        ];
    }
}
