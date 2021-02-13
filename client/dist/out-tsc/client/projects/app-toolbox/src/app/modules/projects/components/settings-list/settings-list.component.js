import * as tslib_1 from "tslib";
import { Component, HostBinding } from '@angular/core';
import { combineLatestOrEmpty } from 'projects/app-toolbox/src/app/core/util/combineLatestOrEmpty';
import { delay, map, switchMap } from 'rxjs/operators';
let SettingsListComponent = class SettingsListComponent {
    constructor(p, c) {
        this.p = p;
        this.c = c;
        this.h = true;
        this.flexFh = true;
        this.typeClasses$ = this.c.pipeTypeClassesEnabledByProjectProfiles().pipe(switchMap(klasses => combineLatestOrEmpty(klasses
            .map(klass => this.c.pipeClassLabel(klass.pk_class).pipe(map(label => ({
            label,
            pkClass: klass.pk_class
        })))))));
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.categories$ = this.typeClasses$.pipe(delay(0), map(typeClass => {
            return [
                {
                    title: 'General',
                    items: [
                        {
                            onClickFnName: 'comingSoon',
                            label: 'Project Profile'
                        }
                    ]
                },
                {
                    title: 'Ontology Settings (advanced)',
                    items: [
                        {
                            onClickFnName: 'openOntomeProfileSettings',
                            label: 'OntoMe Profiles'
                        },
                        {
                            onClickFnName: 'openClassesSettings',
                            label: 'Classes'
                        }
                    ]
                },
                {
                    title: 'Controlled Vocabularies',
                    items: typeClass.map(prop => ({
                        onClickFnName: 'openContrVocabSettings',
                        param: prop.pkClass,
                        label: prop.label
                    }))
                },
                {
                    title: 'Team',
                    items: [
                        {
                            onClickFnName: 'comingSoon',
                            label: 'Collaborators'
                        }
                    ]
                }
            ];
        }));
    }
    onClick(fnName, param) {
        this[fnName](param);
    }
    openOntomeProfileSettings() {
        this.p.addTab({
            active: true,
            component: 'ontome-profiles-settings',
            icon: 'settings',
            pathSegment: 'ontomeProfilesSettings'
        });
    }
    openClassesSettings() {
        this.p.addTab({
            active: true,
            component: 'classes-settings',
            icon: 'settings',
            pathSegment: 'classesSettings'
        });
    }
    openContrVocabSettings(pkClass) {
        this.p.addTab({
            active: true,
            component: 'contr-vocab-settings',
            icon: 'settings',
            pathSegment: 'contrVocabSettings',
            data: { pkClass }
        });
    }
    comingSoon() {
        alert('Coming soon.');
    }
};
tslib_1.__decorate([
    HostBinding('class.h-100')
], SettingsListComponent.prototype, "h", void 0);
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], SettingsListComponent.prototype, "flexFh", void 0);
SettingsListComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-settings-list',
        templateUrl: './settings-list.component.html',
        styleUrls: ['./settings-list.component.scss']
    })
], SettingsListComponent);
export { SettingsListComponent };
//# sourceMappingURL=settings-list.component.js.map