import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ConfirmHook = () => Promise<boolean>;

@Injectable()
export class EditModeService {

  value$ = new BehaviorSubject(false)

  beforeSwitchOffHooks: ConfirmHook[] = []

  constructor() { }

  /**
   * Nexts the value in value$
   *
   * Safely checks if there are hooks to be called before
   * nexting the value.
   *
   * @param value true: edit-mode=on, false: edit-mode=off
   */
  public async setValue(value: boolean) {
    if (this.value$.value === value) return;
    if (value === false) {
      for (const hook of this.beforeSwitchOffHooks) {
        const confirmed = await hook()
        if (confirmed === false) return;
      }
    }
    this.value$.next(value)
  }

  /**
   * Toggles the value from true to false and vice versa
   */
  public toggleValue() {
    this.setValue(!this.value$.value)
  }

  /**
   * Register a callback to be called before setting value$ to false.
   * @param callback
   */
  public registerBeforeSwitchOffHook(hook: ConfirmHook) {
    this.beforeSwitchOffHooks.push(hook)
  }

  /**
   * Register a callback to be called before setting value$ to false.
   * @param callback
   */
  public unregisterBeforeSwitchOffHook(hook: ConfirmHook) {
    this.beforeSwitchOffHooks = this.beforeSwitchOffHooks.filter(h => h !== hook)
  }


}
