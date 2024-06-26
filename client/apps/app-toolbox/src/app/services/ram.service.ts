import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

interface RamSource {
    pkEntity?: number,
    chunk?: any;
}

@Injectable()
export class RamService {
    open$ = new BehaviorSubject(false);
    source$ = new Subject<RamSource>();
    target$ = new Subject();
    constructor() { }

    reset() {
        this.open$.next(false);
        this.source$.next(undefined);
        this.target$.next(undefined);
    }
}
