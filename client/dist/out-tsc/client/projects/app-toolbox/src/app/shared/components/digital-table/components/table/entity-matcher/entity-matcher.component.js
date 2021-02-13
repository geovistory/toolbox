import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { first, map, takeUntil } from 'rxjs/operators';
import { CtrlEntityDialogComponent } from 'projects/app-toolbox/src/app/modules/base/components/ctrl-entity/ctrl-entity-dialog/ctrl-entity-dialog.component';
let EntityMatcherComponent = class EntityMatcherComponent {
    constructor(p, ap, s, dialog, inf) {
        this.p = p;
        this.ap = ap;
        this.s = s;
        this.dialog = dialog;
        this.inf = inf;
        this.destroy$ = new Subject();
        this.isInProject = false;
        this.openEntity = () => this.p.addEntityTab(this.statement.fk_object_info, this.pkClass);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    ngOnInit() {
        this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => { this.pkProject = pkProject; });
        // pipe the pkEntity$
        this.s.inf$.statement$.by_subject_and_property$({
            fk_subject_tables_cell: this.pkCell,
            fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO
        }).pipe(map((statements) => {
            if (statements.length) {
                this.ap.streamEntityPreview(statements[0].fk_object_info).subscribe(ep => this.isInProject = !!ep.fk_project);
                return statements[0];
            }
            else
                return undefined;
        }), takeUntil(this.destroy$)).subscribe(statement => this.statement = statement);
    }
    changeMapping(mode) {
        if (mode == 'delete') {
            if (this.statement)
                this.inf.statement.remove([this.statement], this.pkProject);
        }
        else {
            this.dialog.open(CtrlEntityDialogComponent, {
                height: 'calc(100% - 30px)',
                width: '980px',
                maxWidth: '100%',
                data: {
                    initVal$: new BehaviorSubject(undefined),
                    showAddList: true,
                    hiddenProperty: { pkProperty: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO },
                    alreadyInProjectBtnText: 'Select',
                    notInProjectClickBehavior: 'selectOnly',
                    notInProjectBtnText: 'Select',
                    disableIfHasStatement: undefined,
                    classAndTypePk: { pkClass: this.pkClass, pkType: undefined },
                    pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE
                }
            })
                .afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
                if (mode == 'edit' && this.statement && result) {
                    this.inf.statement.remove([this.statement], this.pkProject).resolved$.subscribe(result2 => {
                        if (result2)
                            this.handleDialogResponse(result);
                    });
                }
                else
                    this.handleDialogResponse(result);
            });
        }
    }
    addAndOpenEntity() {
        this.p.addEntityToProject(this.statement.fk_object_info, () => {
            this.p.addEntityTab(this.statement.fk_object_info, this.pkClass);
        });
    }
    handleDialogResponse(result) {
        if (result && result.persistent_item) {
            this.inf.persistent_item.upsert([result.persistent_item], this.pkProject).resolved$.subscribe(result2 => {
                if (result2)
                    this.upsertStatement(result2.items[0].pk_entity);
            });
        }
        else if (result && result.temporal_entity) {
            this.inf.temporal_entity.upsert([result.temporal_entity], this.pkProject).resolved$.subscribe(result2 => {
                if (result2)
                    this.upsertStatement(result2.items[0].pk_entity);
            });
        }
        else if (result.pkEntity) {
            this.upsertStatement(result.pkEntity);
        }
    }
    upsertStatement(pkEntity) {
        this.inf.statement.upsert([{
                fk_subject_tables_cell: this.pkCell,
                fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO,
                fk_object_info: pkEntity
            }], this.pkProject);
    }
};
tslib_1.__decorate([
    Input()
], EntityMatcherComponent.prototype, "pkClass", void 0);
tslib_1.__decorate([
    Input()
], EntityMatcherComponent.prototype, "pkCell", void 0);
EntityMatcherComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-entity-matcher',
        templateUrl: './entity-matcher.component.html',
        styleUrls: ['./entity-matcher.component.scss']
    })
], EntityMatcherComponent);
export { EntityMatcherComponent };
//# sourceMappingURL=entity-matcher.component.js.map