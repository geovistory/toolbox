import * as tslib_1 from "tslib";
import { WithSubStore } from '@angular-redux/store';
import { Component, HostBinding, Input } from '@angular/core';
import { sortAbc, SysConfig } from 'projects/app-toolbox/src/app/core';
import { combineLatestOrEmpty } from 'projects/app-toolbox/src/app/core/util/combineLatestOrEmpty';
import { PropertiesTreeDialogComponent } from 'projects/app-toolbox/src/app/modules/base/components/properties-tree-dialog/properties-tree-dialog.component';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { values } from 'ramda';
import { BehaviorSubject, of, Subject, combineLatest } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { typesReducer } from './api/types.reducer';
import { createPaginateBy } from 'projects/app-toolbox/src/app/modules/base/base.helpers';
import { DfhConfig } from "@kleiolab/lib-config";
let TypesComponent = class TypesComponent {
    constructor(ngRedux, p, inf, dialog, ref, c, b, i, pag, s, m) {
        this.ngRedux = ngRedux;
        this.p = p;
        this.inf = inf;
        this.dialog = dialog;
        this.ref = ref;
        this.c = c;
        this.b = b;
        this.i = i;
        this.pag = pag;
        this.s = s;
        this.m = m;
        this.flexFh = true;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.getBasePath = () => this.basePath;
    }
    getTypePk(_, item) {
        return item.pkEntity;
    }
    ngOnInit() {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, typesReducer);
        // this.rootEpics.addEpic(this.epics.createEpics(this));
        this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);
        this.typeClassLabel$ = this.c.pipeClassLabel(this.pkClass);
        this.typeClassLabel$.pipe(takeUntil(this.destroy$)).subscribe((label) => {
            this.t.setTabTitle(label + ' – Controlled Vocabulary');
        });
        this.typePks$ = this.b.pipePersistentItemPksByClass(this.pkClass);
        const appeAndDefFields$ = this.c.pipeBasicAndSpecificFields(this.pkClass).pipe(map(fieldDefinitions => {
            let appeField, definitionField;
            fieldDefinitions.forEach(f => {
                // take only appellation for language, or ...
                if (f.listDefinitions[0].property.pkProperty === DfhConfig.PROPERTY_PK_IS_APPELLATION_OF) {
                    appeField = f;
                }
                // ... entit definition
                else if (f.listDefinitions[0].property.pkProperty === DfhConfig.PROPERTY_PK_P18_HAS_DEFINITION) {
                    definitionField = f;
                }
            });
            return { appeField, definitionField };
        }));
        const appeAndLangFields$ = appeAndDefFields$.pipe(switchMap(appeAndDefFields => this.c.pipeBasicAndSpecificFields(appeAndDefFields.appeField.listDefinitions[0].targetClass).pipe(map(fieldDefs => fieldDefs.filter(f => f.listDefinitions[0].listType.language || f.listDefinitions[0].listType.appellation)))));
        const itemsCache = {};
        this.items$ = combineLatest(this.p.pkProject$, appeAndDefFields$, appeAndLangFields$, this.p.defaultLanguage$).pipe(switchMap(([pkProject, appeAndDefFields, appeAndLangFields, defaultLanguage]) => this.typePks$.pipe(switchMap(typePks => combineLatestOrEmpty(typePks.map(pkEntity => {
            // get appellation
            const l = appeAndDefFields.appeField.listDefinitions[0], limit = 10, offset = 0, paginateBy = createPaginateBy(l, pkEntity);
            if (!itemsCache[pkEntity]) {
                itemsCache[pkEntity] = true;
                this.pag.temporalEntity.addPageLoader(pkProject, appeAndDefFields.appeField.listDefinitions[0], pkEntity, limit, offset, this.destroy$);
                this.p.inf.persistent_item.loadMinimal(pkProject, pkEntity);
            }
            // pipe the properties of the naming
            const namings$ = this.i.pipeTemporalEntityTableRows(paginateBy, limit, offset, pkProject, l, appeAndLangFields).pipe(map(items => items.filter(item => {
                if (!item)
                    return false;
                const rs = values(item.row);
                if (!rs || !rs.length)
                    return false;
                return !rs.includes(undefined);
            })));
            const definition$ = this.i.pipeListLangString(appeAndDefFields.definitionField.listDefinitions[0], pkEntity, 1).pipe(map(definitions => {
                if (!definitions || !definitions.length)
                    return '';
                let definition = definitions.find(def => !!def && def.fkLanguage === defaultLanguage.pk_entity);
                definition = definition ? definition : definitions[0];
                return definition.label;
            }));
            return combineLatest(namings$, definition$).pipe(map(([namings, definition]) => {
                // get one naming of the naming of that type
                let naming = namings.find(n => !!values(n.row).find(r => (!!r && r.pkProperty === 1113 && r.firstItem.statement.fk_object_info === defaultLanguage.pk_entity)));
                naming = naming ? naming : namings[0];
                // get the appellation string and the language.
                let spelling, language;
                if (naming) {
                    spelling = values(naming.row).find(r => (r.pkProperty === 1113)).label;
                    language = values(naming.row).find(r => (r.pkProperty === 1112)).label;
                }
                const item = {
                    label: spelling,
                    labelLanguage: language,
                    pkEntity,
                    definition
                };
                return item;
            }));
        }))))), sortAbc(n => n.label));
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    /**
     * called when user clicks on edit
     */
    onEdit(type) {
        this.edit(type.pkEntity);
    }
    /**
     * called when user clicks on remove
     */
    onRemove(type) {
        this.p.openRemoveEntityDialog(type.label, type.pkEntity);
    }
    /**
     * called when user clicks on add
    */
    onAddOrCreate() {
        this.m.openModalCreateOrAddEntity({
            alreadyInProjectBtnText: 'Edit',
            notInProjectClickBehavior: 'addToProject',
            notInProjectBtnText: 'Add',
            classAndTypePk: { pkClass: this.pkClass, pkType: undefined },
            pkUiContext: SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE
        }).subscribe(result => {
            if (result.action === 'added' || result.action === 'created') {
                this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
                    this.s.store(this.s.api.typeOfProject(pkProject, result.pkEntity), pkProject);
                    // this.inf.persistent_item.typeOfProject(pkProject, result.pkEntity)
                });
            }
            else if (result.action === 'alreadyInProjectClicked') {
                this.edit(result.pkEntity);
            }
        });
    }
    /**
     * Opens dialog for editing type
     * @param pkEntity
     */
    edit(pkEntity) {
        const data = {
            appContext: SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE,
            pkClass$: of(this.pkClass),
            pkEntity$: of(pkEntity),
            readonly$: new BehaviorSubject(false),
            showOntoInfo$: new BehaviorSubject(false),
        };
        const dialogRef = this.dialog.open(PropertiesTreeDialogComponent, {
            height: '90%',
            width: '90%',
            data
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
};
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], TypesComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    Input()
], TypesComponent.prototype, "basePath", void 0);
tslib_1.__decorate([
    Input()
], TypesComponent.prototype, "pkClass", void 0);
TypesComponent = tslib_1.__decorate([
    WithSubStore({
        basePathMethodName: 'getBasePath',
        localReducer: typesReducer
    }),
    Component({
        selector: 'gv-types',
        templateUrl: './types.component.html',
        styleUrls: ['./types.component.css']
    })
], TypesComponent);
export { TypesComponent };
//# sourceMappingURL=types.component.js.map