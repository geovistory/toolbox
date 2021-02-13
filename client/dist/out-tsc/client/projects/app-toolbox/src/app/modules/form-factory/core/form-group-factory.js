import { Subject, asyncScheduler } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { FormFactory } from "./form-factory";
import { FormArrayFactory } from './form-array-factory';
import { AbstractControlFactory } from './form-factory.models';
/**
 * Factory for a formGroup, being the root of the nested form
 *
 */
export class FormGroupFactory extends AbstractControlFactory {
    constructor(globalConfig, level) {
        super();
        this.globalConfig = globalConfig;
        this.level = level;
        this.factoryType = 'group';
        this.formFactory$ = new Subject();
        this.globalConfig.rootFormGroup$.pipe(switchMap(config => this.globalConfig.getChildNodeConfigs({ group: config })
            .pipe(map((childConfig) => ({ config, childConfig }))))).pipe(first()).subscribe((d) => {
            this.config = d.config;
            this.childConfig = d.childConfig[0].array;
            this.globalConfig.root = this;
            if (this.childConfig)
                this.child = new FormArrayFactory(this.globalConfig, this.childConfig, this.level + 1, this);
            if (this.child)
                this.control = this.globalConfig.fb.group({ 'childControl': this.child.control });
            asyncScheduler.schedule(() => {
                this.formFactory = new FormFactory(this.control, this);
                this.formFactory$.next(this.formFactory);
            }, 0);
            // TODO get his from config
            const mapFn = (x) => x;
            this.child.valueChanges$.pipe(map(x => mapFn(x)), takeUntil(this.globalConfig.destroy$)).subscribe(x => {
                this.valueChanges$.next(x);
            });
        });
    }
    markAllAsTouched() {
        this.control.markAsTouched();
        this.child.markAllAsTouched();
    }
}
//# sourceMappingURL=form-group-factory.js.map