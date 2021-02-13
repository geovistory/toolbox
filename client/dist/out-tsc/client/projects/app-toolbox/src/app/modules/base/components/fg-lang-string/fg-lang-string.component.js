import * as tslib_1 from "tslib";
import { Component, Inject, Input, Optional, ViewChildren } from '@angular/core';
import { CONTAINER_DATA } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { CtrlAppellationComponent } from '../ctrl-appellation/ctrl-appellation.component';
import { CtrlLanguageComponent } from '../ctrl-language/ctrl-language.component';
let FgLangStringComponent = class FgLangStringComponent {
    constructor(p, ff, injectedData) {
        this.p = p;
        this.ff = ff;
        this.injectedData = injectedData;
        this.destroy$ = new Subject();
        this.afterViewInit$ = new BehaviorSubject(false);
        this.formFactory$ = new Subject();
        /**
         * this gets injected by as child form factory
         */
        if (injectedData) {
            if (injectedData.initVal$) {
                this.initVal$ = injectedData.initVal$;
                this.appearance = injectedData.appearance;
            }
        }
    }
    ngOnInit() {
        if (!this.initVal$) {
            this.initVal$ = new BehaviorSubject({
                pk_entity: undefined,
                fk_language: undefined,
                quill_doc: undefined,
                string: undefined,
                fk_class: undefined
            });
        }
        // Ensure the language is set
        this.initVal$ = combineLatest(this.initVal$, this.p.defaultLanguage$).pipe(switchMap(([initVal, defaultLang]) => {
            // if a fk_language is provied, get the language object
            if (initVal.fk_language) {
                return this.p.inf$.language$.by_pk_entity$.key(initVal.fk_language).pipe(map(language => {
                    return Object.assign({}, initVal, { language });
                }));
            }
            // else use the project default lang
            return new BehaviorSubject(Object.assign({}, initVal, { language: defaultLang }));
        }));
        if (!this.appearance)
            this.appearance = 'fill';
        const ffConfig = {
            rootFormGroup$: of({
                data: {}
            }),
            getChildNodeConfigs: (n) => this.getChildNodeConfigs(n)
        };
        this.ff.create(ffConfig, this.destroy$).pipe(first(), takeUntil(this.destroy$)).subscribe((v) => {
            this.formFactory$.next(v);
            this.formFactory = v;
            // console.log(v)
        });
    }
    getChildNodeConfigs(n) {
        if (n.group) {
            return this.initVal$.pipe(map(initVal => {
                const childConfigs = [{
                        array: {
                            data: {
                                type: 'root',
                            },
                            placeholder: '',
                            mapValue: (x) => {
                                const value = {
                                    fk_class: initVal.fk_class,
                                    fk_language: x[1] ? x[1].pk_entity : undefined,
                                    language: x[1],
                                    quill_doc: x[0],
                                    string: undefined,
                                    pk_entity: undefined,
                                };
                                return value;
                            }
                        }
                    }];
                return childConfigs;
            }));
        }
        else if (n.array && n.array.data.type === 'root') {
            return this.initVal$.pipe(map((initVal) => {
                const textInitVal = {
                    quill_doc: initVal.quill_doc,
                    pk_entity: undefined,
                    fk_class: undefined,
                    string: undefined,
                };
                const textCtrl = {
                    control: {
                        initValue: textInitVal,
                        required: true,
                        data: {
                            type: 'text'
                        },
                        mapValue: (x) => (x ? x.quill_doc : undefined),
                        placeholder: 'Text'
                    }
                };
                const langCtrl = {
                    control: {
                        initValue: initVal.language,
                        required: true,
                        data: {
                            type: 'language'
                        },
                        mapValue: x => x,
                        placeholder: 'Language'
                    }
                };
                return [textCtrl, langCtrl];
            }));
        }
    }
    focusOnCtrlText() {
        if (this.ctrlAppellation.length > 0) {
            this.ctrlAppellation.first.onContainerClick();
        }
        this.ctrlAppellation.changes.pipe(first((x) => x.length > 0)).subscribe((items) => {
            items.first.onContainerClick();
        });
    }
    focusOnCtrlLanguage() {
        if (this.ctrlLanguage.length > 0) {
            this.ctrlLanguage.first.onContainerClick();
        }
        this.ctrlLanguage.changes.pipe(first((x) => x.length > 0)).subscribe((items) => {
            items.first.onContainerClick();
        });
    }
    ngAfterViewInit() {
        this.afterViewInit$.next(true);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], FgLangStringComponent.prototype, "initVal$", void 0);
tslib_1.__decorate([
    Input()
], FgLangStringComponent.prototype, "appearance", void 0);
tslib_1.__decorate([
    ViewChildren(CtrlAppellationComponent)
], FgLangStringComponent.prototype, "ctrlAppellation", void 0);
tslib_1.__decorate([
    ViewChildren(CtrlLanguageComponent)
], FgLangStringComponent.prototype, "ctrlLanguage", void 0);
FgLangStringComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-fg-lang-string',
        templateUrl: './fg-lang-string.component.html',
        styleUrls: ['./fg-lang-string.component.scss']
    }),
    tslib_1.__param(2, Optional()), tslib_1.__param(2, Inject(CONTAINER_DATA))
], FgLangStringComponent);
export { FgLangStringComponent };
//# sourceMappingURL=fg-lang-string.component.js.map