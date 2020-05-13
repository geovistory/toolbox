import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkerWrapperService {

  worker: Worker = new Worker('./geov.worker', { type: 'module' });
  busy: boolean = false;
  callback: Function;

  constructor() { }

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