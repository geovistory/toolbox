import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
export class PipeCache<C> {
  caches: {
    [key in keyof C]?: any;
  } = {};
  cache<F>(cacheId: keyof C, observable: Observable<F>, ...args): Observable<F> {
    if (!this.caches[cacheId]) this.caches[cacheId] = {}
    const c = this.caches[cacheId] // || new Map();
    const reqId = JSON.stringify(args);
    if (!(reqId in c)) {
      c[reqId] = observable.pipe(shareReplay({ refCount: false, bufferSize: 1 }));
    }
    return c[reqId];
  }
}
