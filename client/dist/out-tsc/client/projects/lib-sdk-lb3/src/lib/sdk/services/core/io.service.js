/* tslint:disable */
import { Subject } from 'rxjs';
export class IO {
    constructor(socket) {
        this.observables = {};
        this.socket = socket;
    }
    emit(event, data) {
        this.socket.emit('ME:RT:1://event', {
            event: event,
            data: data
        });
    }
    on(event) {
        if (this.observables[event]) {
            return this.observables[event];
        }
        let subject = new Subject();
        this.socket.on(event, (res) => subject.next(res));
        this.observables[event] = subject.asObservable();
        return this.observables[event];
    }
}
//# sourceMappingURL=io.service.js.map