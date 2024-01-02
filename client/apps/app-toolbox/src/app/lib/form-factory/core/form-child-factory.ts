import { CdkPortalOutlet, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, InjectionToken } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { filter, first, switchMap, takeUntil } from 'rxjs/operators';
import { FormChildFactoryConfig } from '../types/FormChildFactoryConfig';
import { FormFactoryGlobal } from '../types/FormFactoryGlobal';
import { AbstractControlFactory, FactoryType, FormFactoryComponent } from './form-factory.models';

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');

/**
 * Factory for a formChild, being the leaf element of the nested form
 */
export class FormChildFactory<Ch> extends AbstractControlFactory {
  override factoryType: FactoryType = 'childFactory';

  public control$ = new Subject<AbstractControl>()
  public portal: ComponentPortal<ComponentRef<any>>
  private validators: ValidatorFn[]
  private childComponent: FormFactoryComponent
  public childComponent$ = new ReplaySubject<{ [key: string]: FormFactoryComponent }>()
  constructor(
    public globalConfig: FormFactoryGlobal<any, any, any, any>,
    public config: FormChildFactoryConfig<Ch>,
  ) {
    super()
    this.validators = config.required ? [Validators.required, ...(config.validators || [])] : config.validators
    /**
     * instanciates the form factory component
     */
    this.portal = new ComponentPortal<ComponentRef<FormFactoryComponent>>(
      this.config.component, null, this.createInjector({
        ...config.getInjectData(config.data)
      }))
  }

  createInjector(dataToPass): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(CONTAINER_DATA, dataToPass);
    return new PortalInjector(this.globalConfig._injector, injectorTokens);
  }

  attached(e: ComponentRef<FormFactoryComponent>, o: CdkPortalOutlet) {

    this.childComponent = e.instance;

    e.instance.afterViewInit$.pipe(first(x => x === true)).subscribe(() => {
      this.childComponent$.next({ [this.portal.component.name]: this.childComponent })
    })

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
      this.formGroup = f.formGroup;
    });
  }

  markAllAsTouched() {
    this.formGroup.markAsTouched()
    this.childComponent.formFactory.markAllAsTouched()
  }
}
