import { FormGroup } from '@angular/forms';
import { Subject, asyncScheduler } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { FormArrayConfig, FormFactory, FormFactoryGlobal, FormGroupConfig } from '../services/form-factory.service';
import { FormArrayFactory } from './form-array-factory';
import { AbstractControlFactory, FactoryType } from './form-factory.models';



/**
 * Factory for a formGroup, being the root of the nested form
 *
 */
export class FormGroupFactory extends AbstractControlFactory {
  factoryType: FactoryType = 'group';
  control: FormGroup
  child?: AbstractControlFactory;

  config: FormGroupConfig<any>
  childConfig: FormArrayConfig<any>

  formFactory$ = new Subject<FormFactory>();

  constructor(
    public globalConfig: FormFactoryGlobal<any, any, any, any>,
    private level: number
  ) {
    super()
    this.globalConfig.rootFormGroup$.pipe(
      switchMap(config => this.globalConfig.getChildNodeConfigs({ group: config })
        .pipe(map((childConfig) => ({ config, childConfig })))
      )
    ).pipe(
      first(),
    ).subscribe((d) => {

      this.config = d.config
      this.childConfig = d.childConfig[0].array

      this.globalConfig.root = this

      if (this.childConfig) this.child = new FormArrayFactory(this.globalConfig, this.childConfig, this.level + 1, this);

      if (this.child) this.control = this.globalConfig.fb.group({ 'childControl': this.child.control });

      asyncScheduler.schedule(() => {
        this.formFactory$.next(new FormFactory(this.control, this))
      }, 0)

      // TODO get his from config
      const mapFn = (x) => x

      this.child.valueChanges$.pipe(
        map(x => mapFn(x)),
        takeUntil(this.globalConfig.destroy$)
      ).subscribe(x => {
        this.valueChanges$.next(x)
      })

    })
  }

  markAllAsTouched() {
    this.control.markAsTouched()
    this.child.markAllAsTouched()
  }

}
