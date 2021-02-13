import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';
import { Validators } from "@angular/forms";
import { Subject, ReplaySubject } from 'rxjs';
import { filter, switchMap, takeUntil, first } from 'rxjs/operators';
import { AbstractControlFactory } from './form-factory.models';
export const CONTAINER_DATA = new InjectionToken('CONTAINER_DATA');
/**
 * Factory for a formChild, being the leaf element of the nested form
 */
export class FormChildFactory extends AbstractControlFactory {
    constructor(globalConfig, config, level, parent) {
        super();
        this.globalConfig = globalConfig;
        this.config = config;
        this.level = level;
        this.parent = parent;
        this.factoryType = 'childFactory';
        this.control$ = new Subject();
        this.childComponent$ = new ReplaySubject();
        this.validators = config.required ? [Validators.required, ...(config.validators || [])] : config.validators;
        // this.control = new FormControl()
        /**
         * instanciates the form factory component
         */
        this.portal = new ComponentPortal(this.config.component, null, this.createInjector(Object.assign({}, config.getInjectData(config.data))));
        // merge(of(this.control.value), this.control.valueChanges).pipe(
        //   map(item => this.config.mapValue(item)),
        //   takeUntil(this.globalConfig.destroy$)
        // ).subscribe(x => this.valueChanges$.next(x))
    }
    createInjector(dataToPass) {
        const injectorTokens = new WeakMap();
        injectorTokens.set(CONTAINER_DATA, dataToPass);
        return new PortalInjector(this.globalConfig._injector, injectorTokens);
    }
    attached(e, o) {
        this.childComponent = e.instance;
        e.instance.afterViewInit$.pipe(first(x => x === true)).subscribe(() => {
            this.childComponent$.next({ [this.portal.component.name]: this.childComponent });
        });
        e.instance.formFactory$.pipe(filter(o => o !== null), switchMap(f => f.formGroupFactory.valueChanges$), takeUntil(this.globalConfig.destroy$)).subscribe((item) => {
            const mappedVal = this.config.mapValue(item);
            this.valueChanges$.next(mappedVal);
        });
        e.instance.formFactory$.pipe(filter(o => o !== null), takeUntil(this.globalConfig.destroy$)).subscribe((f) => {
            if (this.validators && this.validators.length) {
                f.formGroup.setValidators(this.validators);
            }
            this.control$.next(f.formGroup);
            this.control = f.formGroup;
        });
    }
    markAllAsTouched() {
        this.control.markAsTouched();
        this.childComponent.formFactory.markAllAsTouched();
    }
}
//# sourceMappingURL=form-child-factory.js.map