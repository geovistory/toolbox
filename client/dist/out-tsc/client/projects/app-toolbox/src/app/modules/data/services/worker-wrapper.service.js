import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
/**
 * Web Worker wrapper
 */
let WorkerWrapperService = class WorkerWrapperService {
    constructor() {
        this.worker = new Worker('./geov.worker', { type: 'module' });
        this.busy = false;
    }
    /**
     * Function that call the right worker function.
     *
     * @param taskName Name you specified in the worker code (in addEventListener).
     * @param params Parameters needed to execute your function
     * @returns Promise: Resolve with the result (object) of the worker. Reject if the worker is busy.
     */
    work(taskName, params) {
        return new Promise((resolve, reject) => {
            if (this.busy)
                reject('Worker busy');
            else {
                this.busy = true;
                this.worker.onmessage = ({ data }) => {
                    this.busy = false;
                    resolve(data);
                };
                this.worker.postMessage({ task: taskName, params: params });
            }
        });
    }
};
WorkerWrapperService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], WorkerWrapperService);
export { WorkerWrapperService };
//# sourceMappingURL=worker-wrapper.service.js.map