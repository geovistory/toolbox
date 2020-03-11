import { Observable } from 'rxjs';

export interface ErrorObj {
  statusCode?: number,
  name: string,
  message?: any
}
export interface HookResult<R> {
  error?: ErrorObj,
  res?: R
}

export type HookFn<R> = () => Observable<HookResult<R>>
