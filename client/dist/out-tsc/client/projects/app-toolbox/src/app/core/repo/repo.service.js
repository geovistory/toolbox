import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { InfSelector } from '../inf/inf.service';
import { BehaviorSubject } from 'rxjs';
let RepoService = class RepoService {
    constructor(ngRedux) {
        this.inf$ = new InfSelector(ngRedux, new BehaviorSubject('repo'));
    }
};
RepoService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], RepoService);
export { RepoService };
//# sourceMappingURL=repo.service.js.map