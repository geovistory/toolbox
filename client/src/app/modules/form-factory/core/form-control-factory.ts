import { FormControl, Validators } from "@angular/forms";
import { map, takeUntil } from 'rxjs/operators';
import { FormControlConfig, FormFactoryGlobal } from '../services/form-factory.service';
import { FormArrayFactory } from './form-array-factory';
import { AbstractControlFactory, FactoryType } from './form-factory.models';
import { FormGroupFactory } from './form-group-factory';
/**
 * Factory for a formControl, being the leaf element of the nested form
 */
export class FormControlFactory extends AbstractControlFactory {
  factoryType: FactoryType = 'control';

  public control: FormControl


  constructor(
    public globalConfig: FormFactoryGlobal<any, any, any>,
    public config: FormControlConfig<any>,
    private level: number,
    private parent?: FormGroupFactory | FormArrayFactory<any>
  ) {
    super()
    const validators = config.required ? [Validators.required] : []
    this.control = new FormControl(null, validators)

    this.control.valueChanges.pipe(
      map(item => this.config.mapValue(item)),
      takeUntil(this.globalConfig.destroy$)
    ).subscribe(x => this.valueChanges$.next(x))
  }
}
