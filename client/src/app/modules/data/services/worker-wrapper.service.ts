import { Injectable } from '@angular/core';

/**
 * Web Worker wrapper
 */
@Injectable({
  providedIn: 'root'
})
export class WorkerWrapperService {

  worker: Worker = new Worker('./geov.worker', { type: 'module' });
  busy: boolean = false;
  callback: Function;

  constructor() { }

  /**
   * Function that call the right worker function.
   * 
   * @param taskName Name you specified in the worker code (in addEventListener).
   * @param params Parameters needed to execute your function
   * @returns Promise: Resolve with the result (object) of the worker. Reject if the worker is busy.
   */
  work(taskName, params) {
    return new Promise<any>((resolve, reject) => {
      if (this.busy) reject('Worker busy');
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

}