import { Observable } from 'rxjs';
export declare class IO {
    private socket;
    private observables;
    constructor(socket: any);
    emit(event: string, data: any): void;
    on(event: string): Observable<any>;
}
