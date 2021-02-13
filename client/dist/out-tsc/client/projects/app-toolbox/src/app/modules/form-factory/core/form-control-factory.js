import { FormControl, Validators } from "@angular/forms";
import { merge, of, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AbstractControlFactory } from './form-factory.models';
/**
 * Factory for a formControl, being the leaf element of the nested form
 */
export class FormControlFactory extends AbstractControlFactory {
    constructor(globalConfig, config, level, parent) {
        super();
        this.globalConfig = globalConfig;
        this.config = config;
        this.level = level;
        this.parent = parent;
        this.factoryType = 'control';
        // can be used by the component that gets created using this factory to expose
        // its child component(s) to the factory
        this.childComponent$ = new ReplaySubject();
        const validators = config.required ? [Validators.required, ...(config.validators || [])] : config.validators;
        this.control = new FormControl(config.initValue || null, validators);
        merge(of(this.control.value), this.control.valueChanges).pipe(map(item => this.config.mapValue(item)), takeUntil(this.globalConfig.destroy$)).subscribe(x => this.valueChanges$.next(x));
        merge(of(this.control.status), this.control.statusChanges).pipe(map(status => {
            const s = {
                status,
                errors: this.control.errors
            };
            return s;
        }), takeUntil(this.globalConfig.destroy$)).subscribe(x => this.statusChanges$.next(x));
    }
    markAllAsTouched() {
        this.control.markAsTouched();
    }
}
//# sourceMappingURL=form-control-factory.js.map