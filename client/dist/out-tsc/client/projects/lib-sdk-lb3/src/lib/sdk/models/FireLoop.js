/* tslint:disable */
import { FireLoopRef } from './index';
export class FireLoop {
    constructor(socket, models) {
        this.socket = socket;
        this.models = models;
        this.references = {};
    }
    ref(model) {
        let name = model.getModelName();
        model.models = this.models;
        this.references[name] = new FireLoopRef(model, this.socket);
        return this.references[name];
    }
}
//# sourceMappingURL=FireLoop.js.map