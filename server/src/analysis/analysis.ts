import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

export interface ErrorObj {
  title: string,
  message?: any
}

/**
 * abstract class as base for different analysis types
 * containing basisc logic needed by each type
 */
export abstract class Analysis<R> {

  destroy$ = new Subject<void>();

  promise: Promise<R>;
  private resolver: (value?: R | PromiseLike<R>) => void;
  private rejector: (reason?: any) => void;

  next: () => Observable<HookResult<R>>

  constructor() {
    this.promise = new Promise((res, rej) => {
      this.resolver = res;
      this.rejector = rej;
    })
  }

  /**
   * execute the request, apply all hooks and return a promise
   * useful for loopback
   */
  run(): Promise<R> {
    this.validateInputs()
      .pipe(
        this.applyHook(() => this.checkFeasibility()),
        this.applyHook(() => this.produceResult()),
        this.applyHook(() => this.validateOutput()),
        takeUntil(this.destroy$)
      ).subscribe(hookRes => {
        if (hookRes && hookRes.error) {
          this.reject(hookRes.error)
        } else {
          this.resolve(hookRes.res)
        }
      })

    return this.promise;
  }

  private applyHook = (hook: () => Observable<HookResult<R>>) => {
    const h = hook;
    return switchMap((hookRes: HookResult<R>) => {
      if (hookRes && hookRes.error) {
        this.reject(hookRes.error)
      } else {
        return h() as Observable<HookResult<R>>
      }
    })
  }

  protected resolve(response) {
    this.resolver(response)
    this.destroy$.next();
  }

  protected reject(msg) {
    this.rejector(msg)
    this.destroy$.next();
  }



  /**
 * Validate the inputs. For example validate the json schema
 * of the queryDefinition
 */
  abstract validateInputs(): Observable<HookResult<R>>

  /**
   * Check the feasability of the query. For example check if the maximum
   * row number is not exceeded
   */
  abstract checkFeasibility(): Observable<HookResult<R>>

  /**
   * Run the query. For example send sql to db and return the results
   */
  abstract produceResult(): Observable<HookResult<R>>

  /**
    * Validate the output. For example validate the json schema
    * of the query results.
    */
  abstract validateOutput(): Observable<HookResult<R>>
}

export interface HookResult<R> {
  error?: ErrorObj,
  res?: R
}

export type HookFn<R> = () => Observable<HookResult<R>>
