import { Injectable } from '@angular/core';

import { LoadingBarEpics } from '../loading-bar/api/loading-bar.epics';


@Injectable()
export class RootEpics {
    constructor(private loadingBarEpics: LoadingBarEpics) { }

    public createEpics() {
        return this.loadingBarEpics.createEpics();
    }
}
