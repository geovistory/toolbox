import * as tslib_1 from "tslib";
import { Component, Inject, Input, Optional, ViewChildren } from '@angular/core';
import { ValidationService } from "projects/app-toolbox/src/app/core/validation/validation.service";
import { CONTAINER_DATA } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { CtrlAppellationComponent } from '../ctrl-appellation/ctrl-appellation.component';
import { CtrlLanguageComponent } from '../ctrl-language/ctrl-language.component';
let FgTextPropertyComponent = class FgTextPropertyComponent {
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
        const initQuillDoc = {
            latestId: 1,
            ops: []
        };
        if (!this.initVal$) {
            this.initVal$ = new BehaviorSubject({
                pk_entity: undefined,
                class_field: undefined,
                fk_class_field: undefined,
                fk_concerned_entity: undefined,
                fk_language: undefined,
                quill_doc: initQuillDoc,
                string: undefined
            });
        }
        // Ensure the language is set
        this.initVal$ = combineLatest(this.p.defaultLanguage$, this.initVal$).pipe(filter(([defaultLang]) => !!defaultLang), switchMap(([defaultLang, initVal]) => {
            // if a fk_language is provied, get the language object
            if (initVal.fk_language) {
                return this.p.inf$.language$.by_pk_entity$.key(initVal.fk_language).pipe(filter(lang => !!lang), map(language => {
                    return Object.assign({ quill_doc: initQuillDoc }, initVal, { language });
                }));
            }
            // else use the project default lang
            return new BehaviorSubject(Object.assign({ quill_doc: initQuillDoc }, initVal, { language: defaultLang }));
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
                            initValue: [initVal],
                            data: {
                                type: 'root',
                            },
                            placeholder: '',
                            mapValue: (x) => {
                                const val = {
                                    pk_entity: undefined,
                                    fk_class_field: initVal.fk_class_field,
                                    quill_doc: x[0],
                                    language: x[1],
                                    fk_language: x[1] ? x[1].pk_entity : undefined,
                                    fk_concerned_entity: initVal.fk_concerned_entity,
                                    string: undefined
                                };
                                return val;
                            }
                        }
                    }];
                return childConfigs;
            }));
        }
        else if (n.array && n.array.data.type === 'root') {
            const initVal = n.array.initValue && n.array.initValue.length > 0 ?
                n.array.initValue[0] : [{}];
            const textInitVal = {
                quill_doc: initVal.quill_doc,
                pk_entity: undefined,
                fk_class: 1,
                string: undefined,
            };
            const textCtrl = {
                control: {
                    initValue: textInitVal,
                    required: true,
                    validators: [ValidationService.emptyQuillDocValidator],
                    data: {
                        type: 'text'
                    },
                    mapValue: (x) => (x ? x.quill_doc : undefined),
                    placeholder: 'Text'
                }
            };
            const langInitVal = initVal.language;
            const langCtrl = {
                control: {
                    initValue: langInitVal,
                    required: true,
                    data: {
                        type: 'language'
                    },
                    mapValue: x => x,
                    placeholder: 'Language'
                }
            };
            return of([textCtrl, langCtrl]);
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
], FgTextPropertyComponent.prototype, "initVal$", void 0);
tslib_1.__decorate([
    Input()
], FgTextPropertyComponent.prototype, "appearance", void 0);
tslib_1.__decorate([
    ViewChildren(CtrlAppellationComponent)
], FgTextPropertyComponent.prototype, "ctrlAppellation", void 0);
tslib_1.__decorate([
    ViewChildren(CtrlLanguageComponent)
], FgTextPropertyComponent.prototype, "ctrlLanguage", void 0);
FgTextPropertyComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-fg-text-property',
        templateUrl: './fg-text-property.component.html',
        styleUrls: ['./fg-text-property.component.scss']
    }),
    tslib_1.__param(2, Optional()), tslib_1.__param(2, Inject(CONTAINER_DATA))
], FgTextPropertyComponent);
export { FgTextPropertyComponent };
//# sourceMappingURL=fg-text-property.component.js.map