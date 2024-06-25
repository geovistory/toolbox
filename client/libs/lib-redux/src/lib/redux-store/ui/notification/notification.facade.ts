import { Injectable } from '@angular/core'
import { U } from '@kleiolab/lib-utils'
import { Store } from '@ngrx/store'
import { IAppState } from '../../state.model'
import { notificationActions, Toast } from './notification.actions'
import { getToasts } from './notification.selector'

@Injectable({
  providedIn: 'root'
})
export class NotificationFacade {

  toasts$ = this.store.select(getToasts)

  constructor(private store: Store<IAppState>) { }

  addToast = (toast: Toast) => {
    if (!toast.uid) toast.uid = U.uuid()
    this.store.dispatch(notificationActions.add({ toast }))
    return toast.uid
  }

  removeToast = (uid: string) => this.store.dispatch(notificationActions.remove({ uid }))

}
