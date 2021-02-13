import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { combineLatestOrEmpty } from 'projects/app-toolbox/src/app/core/util/combineLatestOrEmpty';
import { DfhConfig } from "@kleiolab/lib-config";
import { QuillOpsToStrPipe } from 'projects/app-toolbox/src/app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { equals, values } from 'ramda';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { RamListEditDialogComponent } from '../ram-list-edit-dialog/ram-list-edit-dialog.component';
import { RamListRemoveDialogComponent } from '../ram-list-remove-dialog/ram-list-remove-dialog.component';
let RamListComponent = class RamListComponent {
    constructor(s, ramListApi, inf, p, ap, ss, quillPipe, dialog, ref) {
        this.s = s;
        this.ramListApi = ramListApi;
        this.inf = inf;
        this.p = p;
        this.ap = ap;
        this.ss = ss;
        this.quillPipe = quillPipe;
        this.dialog = dialog;
        this.ref = ref;
        this.destroy$ = new Subject();
        this.viewMode = 'small';
        this.filtersVisible = false;
        this.loading$ = new BehaviorSubject(true);
        // To improve performance, we want to check and update the list less often than the changes actually occur.
        // To do that, we detach the component's change detector and perform an explicit local check on upadte of ...
        // https://angular.io/api/core/ChangeDetectorRef#detach
        // ref.detach();
        // setInterval(() => {
        //   this.ref.detectChanges();
        // }, 5000);
    }
    rowTrackByFn(_, i) {
        return _;
    }
    ngOnInit() {
        this.cols = this.setCols();
        let refersTo;
        if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO) {
            if (this.annotatedIn === 'digital-tables')
                refersTo = 'Cell';
            else if (this.annotatedIn === 'digital-text')
                refersTo = 'Chunk';
        }
        this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            this.s.storeGv(this.ramListApi.ramListControllerGetRamList(pkProject, this.pkEntity, this.fkProperty, refersTo), pkProject)
                .pipe(first(), takeUntil(this.destroy$))
                .subscribe(() => {
                this.loading$.next(false);
            });
        });
        this.rootEntity$ = this.ap.streamEntityPreview(this.pkEntity).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
        this.items$ = this.pipeItems();
        this.items$.pipe(takeUntil(this.destroy$)).subscribe((items) => {
            const y = items;
        });
    }
    pipeItems() {
        // the statements associating the root entity with the next items
        const basicStatements$ = this.ss.inf$.statement$.by_object_and_property$({
            fk_property: this.fkProperty,
            fk_object_info: this.pkEntity
        }).pipe(distinctUntilChanged(equals));
        // if property is 'refers to' we need to get the chunk and the digital
        if (this.fkProperty == DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO) {
            if (this.annotatedIn === 'digital-text')
                return this.pipeRefersToChunk(basicStatements$);
            else if (this.annotatedIn === 'digital-tables')
                return this.pipeRefersToCell(basicStatements$);
        }
        // if poperty is 'mentions' or 'is topic of' we need to get the path directly
        else if (this.fkProperty == DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS ||
            this.fkProperty == DfhConfig.PROPERTY_PK_P129_IS_ABOUT) {
            return this.pipeMentionsOrIsAbout(basicStatements$);
        }
    }
    pipeMentionsOrIsAbout(basicStatements$) {
        return combineLatest(this.rootEntity$, basicStatements$).pipe(switchMap(([rootEntity, basicStatements]) => {
            const prefix = '';
            const rowsArray$ = basicStatements.map(statement => {
                return combineLatest(this.pipePathRecursivly(statement.fk_subject_info, prefix), this.getReference(statement.pk_entity)).pipe(map(([path, location]) => {
                    return {
                        path,
                        location,
                        statement: statement,
                        actions: {
                            edit: this.propertyHasReference()
                        }
                    };
                }));
            });
            return combineLatestOrEmpty(rowsArray$);
        }));
    }
    pipeRefersToChunk(basicStatements$) {
        return basicStatements$.pipe(map(stmst => stmst.filter(s => s.fk_subject_data !== 0)), switchMap(statements => {
            return combineLatestOrEmpty(statements.map(statement => this.ss.dat$.chunk$.by_pk_entity$.key(statement.fk_subject_data)
                .pipe(switchMap(chunk => {
                const item = {
                    path: {
                        segments: []
                    },
                    location: undefined,
                    statement: statement,
                    actions: {
                        edit: this.propertyHasReference()
                    }
                };
                if (!chunk)
                    return new BehaviorSubject(item);
                return this.pipeDigitalFromChunk(chunk.fk_text, item)
                    .pipe(map((i) => {
                    i.annotatedText = {
                        label: this.quillPipe.transform(chunk.quill_doc.ops)
                    };
                    return i;
                }));
            }))));
        }));
    }
    pipeRefersToCell(basicStatements$) {
        return basicStatements$.pipe(map(stmst => stmst.filter(s => s.fk_subject_tables_cell !== 0)), switchMap(statements => {
            return combineLatestOrEmpty(statements.map(statement => this.ss.tab$.cell$.by_pk_cell$.key(statement.fk_subject_tables_cell)
                .pipe(switchMap(cell => {
                const item = {
                    path: {
                        segments: []
                    },
                    location: undefined,
                    statement: statement,
                    actions: {
                        edit: this.propertyHasReference()
                    }
                };
                if (!cell)
                    return new BehaviorSubject(item);
                return this.pipeDigitalFromCell(cell.fk_digital, item)
                    .pipe(map((i) => {
                    i.annotatedCell = {
                        label: cell.string_value || cell.numeric_value.toString()
                    };
                    i.path.segments = [
                        ...i.path.segments,
                        {
                            property: {
                                label: 'cell',
                                tooltip: 'cell'
                            }
                        },
                        {
                            entity: {
                                icon: 'cell',
                                label: 'Cell ' + cell.fk_row + ':' + cell.fk_column,
                                tooltip: 'Cell',
                                fkRow: cell.fk_row + '',
                                fkDigital: cell.fk_digital
                            }
                        },
                    ];
                    return i;
                }));
            }))));
        }));
    }
    pipeDigitalFromCell(fkDigital, item) {
        return this.ss.dat$.digital$.by_pk_entity$.key(fkDigital).pipe(map(digitalIdx => values(digitalIdx)), switchMap(digitals => {
            if (digitals.length < 1)
                return new BehaviorSubject(item);
            const digital = digitals[0];
            return this.pipePathOfDigital(digital, item);
        }));
    }
    pipeDigitalFromChunk(pkText, item) {
        return this.ss.dat$.digital$.by_pk_text$.key(pkText).pipe(map(digitalIdx => values(digitalIdx)), switchMap(digitals => {
            if (digitals.length < 1)
                return new BehaviorSubject(item);
            const digital = digitals[0];
            return this.pipePathOfDigital(digital, item);
        }));
    }
    pipePathOfDigital(digital, item) {
        return this.ss.inf$.statement$.by_subject_and_property$({
            fk_subject_data: digital.pk_entity,
            fk_property: DfhConfig.PROPERTY_PK_GEOVP1_IS_REPRODUCTION_OF,
        }).pipe(switchMap(statementsToExpression => {
            if (statementsToExpression.length < 1)
                return new BehaviorSubject(item);
            let entity;
            if (digital.fk_system_type === SysConfig.PK_SYSTEM_TYPE__DIGITAL_TEXT) {
                entity = {
                    icon: 'text',
                    label: 'Text ' + digital.pk_entity,
                    tooltip: 'Text ' + digital.pk_entity,
                    pkEntity: digital.pk_entity,
                    isDigitalText: true
                };
            }
            else {
                if (digital.fk_system_type === SysConfig.PK_SYSTEM_TYPE__DIGITAL_TABLE) {
                    entity = {
                        icon: 'table',
                        label: 'Table ' + digital.pk_entity,
                        tooltip: 'Table ' + digital.pk_entity,
                        pkEntity: digital.pk_entity,
                        isDigitalTable: true
                    };
                }
            }
            return this.pipePathRecursivly(statementsToExpression[0].fk_object_info, '')
                .pipe(map((path) => {
                path.segments = [
                    ...path.segments,
                    {
                        property: {
                            label: 'is reproduced by',
                            tooltip: 'is reproduced by'
                        }
                    },
                    {
                        entity
                    }
                ];
                return Object.assign({}, item, { path });
            }));
        }));
    }
    getReference(pkSubjectStatement) {
        return this.ss.inf$.statement$.by_subject_and_property$({
            fk_property_of_property: DfhConfig.P_O_P_GEOV_HAS_REFERENCE,
            fk_subject_info: pkSubjectStatement
        })
            .pipe(switchMap((statements) => {
            if (statements.length < 1)
                return new BehaviorSubject(undefined);
            return combineLatest(statements.map(r => {
                return this.ss.inf$.lang_string$.by_pk_entity$.key(r.fk_object_info)
                    .pipe(map(langStr => !langStr ? null :
                    !langStr.quill_doc ? null :
                        langStr.quill_doc.ops), map(ops => !ops ? null : this.quillPipe.transform(ops)));
            }))
                .pipe(map(langStrArr => {
                return {
                    label: langStrArr.filter(s => !!s).join(', '),
                    tooltip: 'Reference to place in item',
                    icon: ''
                };
            }));
        }));
    }
    getEntityPathSegment(pkEntity, rootEntityLabel) {
        return this.ap.streamEntityPreview(pkEntity)
            .pipe(filter((ep) => !!ep), switchMap((ep) => {
            // Q: What is subject of is mentioned in statement?
            if (ep.fk_class == 218) {
                // A: F2 Expression!
                // ... so we need to find the source: F5 Item, F3 Manifestation Singleton, F4 Manifestation Product Type or geovC4 Web Request
                // because this will give us the entity preview for the entity to display in the path
                return combineLatest(
                // 1316 -- geovP5 – carrier provided by
                this.ss.inf$.statement$.by_subject_and_property$({
                    fk_property: 1316,
                    fk_subject_info: pkEntity
                })
                    .pipe(map((r) => r.length ? r[0].fk_object_info : undefined)), 
                // 979 -- R4 – carriers provided by
                this.ss.inf$.statement$.by_subject_and_property$({
                    fk_property: 979,
                    fk_subject_info: pkEntity
                })
                    .pipe(map((r) => r.length ? r[0].fk_object_info : undefined)), 
                // 1305 -- geovP4 – is server response to request
                this.ss.inf$.statement$.by_subject_and_property$({
                    fk_property: 1305,
                    fk_subject_info: pkEntity
                })
                    .pipe(map((r) => r.length ? r[0].fk_object_info : undefined)), 
                // 1016 -- R42 – is representative manifestation singleton for
                this.ss.inf$.statement$.by_object_and_property$({
                    fk_property: 1016,
                    fk_object_info: pkEntity
                })
                    .pipe(map((r) => r.length ? r[0].fk_subject_info : undefined)))
                    .pipe(map((pks) => pks.find(pk => !!pk)), filter(pk => !!pk));
            }
            return new BehaviorSubject(pkEntity);
        }), switchMap(pk => {
            return this.ap.streamEntityPreview(pk).pipe(map(ep => {
                let icon;
                if (ep.entity_type === 'teEn') {
                    icon = 'temporal_entity';
                }
                else if (ep.fk_class === DfhConfig.CLASS_PK_EXPRESSION_PORTION) {
                    icon = 'expression-portion';
                }
                else if (DfhConfig.CLASS_PKS_SOURCE_PE_IT.includes(ep.fk_class)) {
                    icon = 'source';
                }
                else {
                    icon = 'persistent-item';
                }
                return {
                    entity: {
                        preview: ep,
                        fkClass: ep.fk_class,
                        pkEntity: ep.pk_entity,
                        label: ep.entity_label,
                        icon,
                        tooltip: `${rootEntityLabel ? rootEntityLabel + ' ' : ''} ${ep.class_label}${ep.type_label ? `, ${ep.type_label}` : ''}: «${ep.entity_label}»`
                    }
                };
            }));
        }));
    }
    pipePathRecursivly(pkEntity, entitySegmentTooltipPrefix, graphPath = { segments: [], text: '' }) {
        const finish = (sE, p) => {
            return new BehaviorSubject({
                text: `${sE.entity.label} ${p.text}`,
                segments: [sE, ...p.segments],
            });
        };
        return this.getEntityPathSegment(pkEntity, entitySegmentTooltipPrefix).pipe(switchMap(segE => {
            // If Expression Portion (uncomment this if() for allowing F2 - Expressions as part of another F2 in a path)
            if (segE.entity.fkClass == 503) {
                // get 'is part of' statement
                return this.ss.inf$.statement$
                    .by_subject_and_property$({
                    fk_property: 1317,
                    fk_subject_info: pkEntity
                })
                    .pipe(switchMap((rs) => {
                    if (rs.length > 0) {
                        const label = 'has part';
                        // add segments to path
                        const segP = {
                            property: { label, tooltip: 'has part' }
                        };
                        const path = {
                            text: `${segP.property.label} ${segE.entity.label} ${graphPath.text}`,
                            segments: [segP, segE, ...graphPath.segments]
                        };
                        return this.pipePathRecursivly(rs[0].fk_object_info, undefined, path);
                    }
                    return finish(segE, graphPath);
                }));
            }
            return finish(segE, graphPath);
        }));
    }
    setCols() {
        const pathCol = {
            field: 'path',
            header: 'Item',
            hasFilter: true,
            filterMatchMode: 'contains',
            filterCol: 'path.text',
            width: '50%'
        };
        const referenceCol = {
            field: 'location',
            header: 'Reference',
            tooltip: 'Location within item',
            hasFilter: true,
            filterMatchMode: 'contains',
            filterCol: 'location.label',
            width: '25%'
        };
        const annotatedTextCol = {
            field: 'annotatedText',
            header: 'Annotated Text',
            tooltip: 'Piece of text annotated in a larger text.',
            hasFilter: true,
            filterMatchMode: 'contains',
            filterCol: 'annotatedText.label',
            width: '40%'
        };
        const annotatedCellCol = {
            field: 'annotatedCell',
            header: 'Annotated Cell',
            tooltip: 'Cell in a table.',
            hasFilter: true,
            filterMatchMode: 'contains',
            filterCol: 'annotatedCell.label',
            width: '40%'
        };
        const actionsCol = {
            field: 'action',
            header: 'Action',
            hasFilter: false,
            width: '40px'
        };
        // mentions
        if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS)
            return [pathCol, referenceCol, actionsCol];
        // is about
        else if (this.fkProperty === DfhConfig.PROPERTY_PK_P129_IS_ABOUT)
            return [pathCol, actionsCol];
        // refers to
        else if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO) {
            pathCol.width = '40%';
            if (this.annotatedIn === 'digital-text')
                return [pathCol, annotatedTextCol, actionsCol];
            else if (this.annotatedIn === 'digital-tables')
                return [pathCol, annotatedCellCol, actionsCol];
        }
        return [pathCol, actionsCol];
    }
    /**
     *
     * @param pkEntity Persistent item/temporal entity that is mentionned i.e. CRM Entity
     */
    getMentions(pkEntity) {
        const fakeStatements = [
            {
                pk_entity: 789,
                fk_subject_info: 737367,
                fk_property: 1218,
                fk_object_info: pkEntity,
            },
            {
                pk_entity: 790,
                fk_subject_info: 737367,
                fk_property: 1316,
                fk_object_info: 737365,
            },
            {
                pk_entity: 791,
                fk_subject_info: 747097,
                fk_property: 1218,
                fk_object_info: pkEntity,
            }
        ];
        this.inf.statement.loadSucceeded(fakeStatements, '', 591);
    }
    /**
     * When user clicks add
     */
    onAdd() {
        this.p.ramReset();
        this.p.ramTarget$.next(this.pkEntity);
        this.p.ramProperty$.next(this.fkProperty);
        this.p.ramOpen$.next(true);
        if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS) {
            this.rootEntity$.pipe(first(), takeUntil(this.destroy$)).subscribe(rootEntity => {
                this.p.ramTitle$.next(`${rootEntity.class_label} – ${rootEntity.entity_label}`);
                this.p.ramTitlePart2$.next(`is mentioned in:`);
                this.p.ramBoxLeft$.next('drag-source-or-section');
            });
        }
        else if (this.fkProperty === DfhConfig.PROPERTY_PK_P129_IS_ABOUT) {
            this.rootEntity$.pipe(first(), takeUntil(this.destroy$)).subscribe(rootEntity => {
                this.p.ramTitle$.next(`${rootEntity.class_label} – ${rootEntity.entity_label}`);
                this.p.ramTitlePart2$.next(`is topic of:`);
                this.p.ramBoxLeft$.next('drag-source-or-section');
            });
        }
        else if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO) {
            this.rootEntity$.pipe(first(), takeUntil(this.destroy$)).subscribe(rootEntity => {
                this.p.ramTitle$.next(`Annotate ${rootEntity.class_label} – ${rootEntity.entity_label}`);
                // this.p.ramTitlePart2$.next(`${rootEntity.class_label} – ${rootEntity.entity_label}`);
                this.p.ramBoxLeft$.next('select-text');
                this.p.ramTargetIsFix$.next(true);
            });
        }
        else {
            this.p.ramTitle$.next(`Create:`);
            console.warn('fkProperty not found.');
        }
    }
    onEdit(statement) {
        const data = {
            statement,
            propertyLabel: this.getPropertyLabel()
        };
        this.dialog.open(RamListEditDialogComponent, {
            data,
            height: 'calc(100% - 30px)',
            width: '690px',
            maxHeight: '100%'
        });
    }
    onRemove(statement) {
        const propertyHasReferences = this.propertyHasReference();
        const data = {
            statement,
            propertyLabel: this.getPropertyLabel(),
            propertyHasReferences
        };
        this.dialog.open(RamListRemoveDialogComponent, {
            data,
            height: propertyHasReferences ? 'calc(100% - 30px)' : undefined,
            width: '690px',
            maxHeight: '100%'
        });
    }
    getPropertyLabel() {
        if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS) {
            return 'mentions';
        }
        else if (this.fkProperty === DfhConfig.PROPERTY_PK_P129_IS_ABOUT) {
            return 'is about';
        }
        else if (this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO) {
            return 'refers to';
        }
    }
    propertyHasReference() {
        return this.fkProperty === DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS;
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], RamListComponent.prototype, "pkEntity", void 0);
tslib_1.__decorate([
    Input()
], RamListComponent.prototype, "fkProperty", void 0);
tslib_1.__decorate([
    Input()
], RamListComponent.prototype, "annotatedIn", void 0);
tslib_1.__decorate([
    Input()
], RamListComponent.prototype, "disableAddBtn", void 0);
RamListComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ram-list',
        templateUrl: './ram-list.component.html',
        styleUrls: ['./ram-list.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [
            QuillOpsToStrPipe
        ]
    })
], RamListComponent);
export { RamListComponent };
//# sourceMappingURL=ram-list.component.js.map