import { CdkPortalOutlet, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, InjectionToken } from '@angular/core';
import { FormGroup, ValidatorFn, Validators, FormControl, AbstractControl } from "@angular/forms";
import { FormFactoryComponent, QueryFilterComponent } from 'app/modules/queries/components/query-filter/query-filter.component';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, first } from 'rxjs/operators';
import { FormChildFactoryConfig, FormFactoryGlobal } from '../services/form-factory.service';
import { FormArrayFactory } from './form-array-factory';
import { AbstractControlFactory, FactoryType } from './form-factory.models';
import { FormGroupFactory } from './form-group-factory';

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');

/**
 * Factory for a formChild, being the leaf element of the nested form
 */
export class FormChildFactory<Ch> extends AbstractControlFactory {
  factoryType: FactoryType = 'childFactory';

  public control: FormGroup
  public control$ = new Subject<AbstractControl>()
  public portal: ComponentPortal<ComponentRef<QueryFilterComponent>>
  private validators: ValidatorFn[]
  private childComponent: FormFactoryComponent
  constructor(
    public globalConfig: FormFactoryGlobal<any, any, any, any>,
    public config: FormChildFactoryConfig<Ch>,
    private level: number,
    private parent?: FormGroupFactory | FormArrayFactory<any, any>
  ) {
    super()
    this.validators = config.required ? [Validators.required, ...config.validators || []] : config.validators
    // this.control = new FormControl()

    /**
     * instanciates the form factory component
     */

    this.portal = new ComponentPortal<ComponentRef<QueryFilterComponent>>(
      this.config.component, null, this.createInjector({
        initVal$: config.initVal$,
        ...config.data
      }))


    // merge(of(this.control.value), this.control.valueChanges).pipe(
    //   map(item => this.config.mapValue(item)),
    //   takeUntil(this.globalConfig.destroy$)
    // ).subscribe(x => this.valueChanges$.next(x))
  }

  createInjector(dataToPass): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(CONTAINER_DATA, dataToPass);
    return new PortalInjector(this.globalConfig._injector, injectorTokens);
  }

  attached(e: ComponentRef<FormFactoryComponent>, o: CdkPortalOutlet) {

    this.childComponent = e.instance;

    e.instance.formFactory$.pipe(
      filter(o => o !== null),
      switchMap(f => f.formGroupFactory.valueChanges$),
      takeUntil(this.globalConfig.destroy$)
    ).subscribe((item) => {
      const mappedVal = this.config.mapValue(item)
      this.valueChanges$.next(mappedVal)
    });

    e.instance.formFactory$.pipe(
      filter(o => o !== null),
      takeUntil(this.globalConfig.destroy$)
    ).subscribe((f) => {
      if (this.validators && this.validators.length) {
        f.formGroup.setValidators(this.validators)
      }
      this.control$.next(f.formGroup);
      this.control = f.formGroup;
    });
  }

  markAllAsTouched() {
    this.control.markAsTouched()
    this.childComponent.formFactory.markAllAsTouched()
  }
}
