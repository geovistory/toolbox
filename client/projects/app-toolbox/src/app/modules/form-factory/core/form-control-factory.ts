import { FormControl, Validators } from "@angular/forms";
import { merge, of, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FormFactoryGlobal } from "../services/FormFactoryGlobal";
import { FormControlConfig } from "../services/FormControlConfig";
import { FormArrayFactory } from './form-array-factory';
import { AbstractControlFactory, FactoryType, StatusChange } from './form-factory.models';
import { FormGroupFactory } from './form-group-factory';
/**
 * Factory for a formControl, being the leaf element of the nested form
 */
export class FormControlFactory<M> extends AbstractControlFactory {
  factoryType: FactoryType = 'control';

  public control: FormControl

  // can be used by the component that gets created using this factory to expose
  // its child component(s) to the factory
  childComponent$ = new ReplaySubject<any>();

  constructor(
    public globalConfig: FormFactoryGlobal<any, any, any, any>,
    public config: FormControlConfig<M>,
    private level: number,
    private parent?: FormGroupFactory | FormArrayFactory<any, any, any>
  ) {
    super()
    const validators = config.required ? [Validators.required, ...(config.validators || [])] : config.validators
    this.control = new FormControl(config.initValue || null, validators)
    merge(of(this.control.value), this.control.valueChanges).pipe(
      map(item => this.config.mapValue(item)),
      takeUntil(this.globalConfig.destroy$)
    ).subscribe(x => this.valueChanges$.next(x))

    merge(of(this.control.status), this.control.statusChanges).pipe(
      map(status => {
        const s: StatusChange = {
          status,
          errors: this.control.errors
        }
        return s
      }),
      takeUntil(this.globalConfig.destroy$)
    ).subscribe(x => this.statusChanges$.next(x))
  }
  markAllAsTouched() {
    this.control.markAsTouched()
  }
}
