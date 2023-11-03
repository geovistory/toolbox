import { UntypedFormControl, Validators } from '@angular/forms';
import { ReplaySubject, merge, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FormControlConfig } from '../services/FormControlConfig';
import { FormFactoryGlobal } from '../services/FormFactoryGlobal';
import { ParentFactory } from './form-array-factory';
import { AbstractControlFactory, FactoryType, StatusChange } from './form-factory.models';
/**
 * Factory for a formControl, being the leaf element of the nested form
 */
export class FormControlFactory<C> extends AbstractControlFactory {
  override factoryType: FactoryType = 'control';

  // can be used by the component that gets created using this factory to expose
  // its child component(s) to the factory
  childComponent$ = new ReplaySubject<any>();

  constructor(
    public globalConfig: FormFactoryGlobal<any, any, any, any>,
    public config: FormControlConfig<C>,
    private level: number,
    private parent?: ParentFactory<C, any, any>
  ) {
    super()
    const validators = config.required ? [Validators.required, ...(config.validators || [])] : config.validators
    this.formControl = new UntypedFormControl(config.initValue || null, validators)
    merge(of(this.formControl.value), this.formControl.valueChanges).pipe(
      map(item => this.config.mapValue(item)),
      takeUntil(this.globalConfig.destroy$)
    ).subscribe(x => this.valueChanges$.next(x))

    merge(of(this.formControl.status), this.formControl.statusChanges).pipe(
      map(status => {
        const s: StatusChange = {
          status,
          errors: this.formControl.errors
        }
        return s
      }),
      takeUntil(this.globalConfig.destroy$)
    ).subscribe(x => this.statusChanges$.next(x))
  }
  markAllAsTouched() {
    this.formControl.markAsTouched()
  }
}
