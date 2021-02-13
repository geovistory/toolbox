import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { map, switchMap } from 'rxjs/operators';
let LabelsComponent = class LabelsComponent {
    constructor(c, a) {
        this.c = c;
        this.a = a;
        this.labelSysType = SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL;
    }
    ngOnInit() {
        this.languageIsEnglish$ = this.a.pipeActiveDefaultLanguage().pipe(map(lang => lang.pk_entity === 18889));
        this.languageLabel$ = this.a.pipeActiveDefaultLanguage().pipe(map(lang => lang.notes));
        const textProperties$ = this.a.pipeActiveDefaultLanguage().pipe(switchMap(language => this.c.pipeLabels({
            pkClass: this.fkClass,
            fkProperty: this.fkProperty,
            fkPropertyDomain: this.fkPropertyDomain,
            fkPropertyRange: this.fkPropertyRange,
            fkProject: this.fkProject,
            language,
            type: 'label'
        })));
        this.labels$ = textProperties$.pipe(map((labels) => {
            return {
                ofProjectInProjectLang: labels[0] ? labels[0].text : null,
                ofDefaultProjectInProjectLang: labels[1] ? labels[1].text : null,
                ofDefaultProjectInEnglish: labels[2] ? labels[2].text : null,
                ofOntoMeInProjectLang: labels[3] ? labels[3].text : null,
                ofOntoMeInEnglish: labels[4] ? labels[4].text : null,
            };
        }));
        this.displayLabel$ = textProperties$.pipe(map(labels => (labels.find(l => !!l) || { text: '' }).text));
    }
};
tslib_1.__decorate([
    Input()
], LabelsComponent.prototype, "fkProject", void 0);
tslib_1.__decorate([
    Input()
], LabelsComponent.prototype, "fkClass", void 0);
tslib_1.__decorate([
    Input()
], LabelsComponent.prototype, "fkProperty", void 0);
tslib_1.__decorate([
    Input()
], LabelsComponent.prototype, "fkPropertyDomain", void 0);
tslib_1.__decorate([
    Input()
], LabelsComponent.prototype, "fkPropertyRange", void 0);
LabelsComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-labels',
        templateUrl: './labels.component.html',
        styleUrls: ['./labels.component.scss']
    })
], LabelsComponent);
export { LabelsComponent };
//# sourceMappingURL=labels.component.js.map