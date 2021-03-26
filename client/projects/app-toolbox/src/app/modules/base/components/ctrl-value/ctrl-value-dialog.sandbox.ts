import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { sandboxOf } from 'angular-playground';
import { ValueObjectTypeName } from 'projects/app-toolbox/src/app/shared/components/digital-table/components/table/table.component';
import { InfValueObjectType, VotType } from 'projects/app-toolbox/src/app/shared/components/digital-table/components/table/value-matcher/value-matcher.component';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { InfAppellationMock } from 'projects/__test__/data/auto-gen/gvDB/InfAppellationMock';
import { InfDimensionMock } from 'projects/__test__/data/auto-gen/gvDB/InfDimensionMock';
import { InfLangStringMock } from 'projects/__test__/data/auto-gen/gvDB/InfLangStringMock';
import { InfPlaceMock } from 'projects/__test__/data/auto-gen/gvDB/InfPlaceMock';
import { InfTimePrimitiveMock } from 'projects/__test__/data/auto-gen/gvDB/InfTimePrimitiveMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { BehaviorSubject } from 'rxjs';
import { BaseModule } from '../../base.module';
import { CtrlValueDialogComponent, CtrlValueDialogData, CtrlValueDialogResult } from './ctrl-value-dialog.component';

@Component({
    selector: 'gv-sandbox-button',
    template: '<button (click)="click()">clickme</button>'
})
export class SandBoxButtonComponent {

    @Input() vot: VotType;
    @Input() value: InfValueObjectType;
    @Input() pkProject: number;

    constructor(
        private dialog: MatDialog,
    ) { }

    click() {
        this.dialog.open<CtrlValueDialogComponent,
            CtrlValueDialogData, CtrlValueDialogResult>(CtrlValueDialogComponent, {
                height: 'calc(100% - 30px)',
                width: '980px',
                maxWidth: '100%',
                data: {
                    vot: this.vot,
                    initVal$: new BehaviorSubject(this.value),
                    pkProject: this.pkProject,
                }
            })
    }
}

const appellationVOT: VotType = { type: ValueObjectTypeName.appellation };
const placeVOT: VotType = { type: ValueObjectTypeName.place };
const dimensionVOT: VotType = { type: ValueObjectTypeName.dimension, dimensionClass: 689 };
const langStringVOT: VotType = { type: ValueObjectTypeName.langString };
const timePrimitiveVOT: VotType = { type: ValueObjectTypeName.timePrimitive };

export default sandboxOf(SandBoxButtonComponent, {
    declareComponent: true,
    imports: [
        InitStateModule,
        BaseModule
    ]
})
    .add('CtrlValueDialog | Appellation', {
        context: {
            initState: IAppStateMock.stateProject1,
            schemaObjects: [
                GvSchemaObjectMock.project1,
                GvSchemaObjectMock.ctrlValueDialog_appellation
            ],
            appellationVOT,
            appellation: InfAppellationMock.ALBERT,
            pkProject: ProProjectMock.PROJECT_1.pk_entity
        },
        template: `
    <gv-init-state [schemaObjects]="schemaObjects" [initState]="initState"></gv-init-state>
    <gv-sandbox-button [vot]="appellationVOT" [value]="appellation" [pkProject]="pkProject"></gv-sandbox-button>
    `})

    .add('CtrlValueDialog | Place', {
        context: {
            initState: IAppStateMock.stateProject1,
            schemaObjects: [
                GvSchemaObjectMock.project1
            ],
            placeVOT,
            place: InfPlaceMock.PLACE_123,
            pkProject: ProProjectMock.PROJECT_1.pk_entity
        },
        template: `
    <gv-init-state [schemaObjects]="schemaObjects" [initState]="initState"></gv-init-state>
    <gv-sandbox-button [vot]="placeVOT" [value]="place" [pkProject]="pkProject"></gv-sandbox-button>
    `})

    .add('CtrlValueDialog | Dimension', {
        context: {
            initState: IAppStateMock.stateProject1,
            schemaObjects: [
                GvSchemaObjectMock.project1,
                GvSchemaObjectMock.ctrlValueDialog_dimension
            ],
            dimensionVOT,
            dimension: InfDimensionMock.ONE_MONTH,
            pkProject: ProProjectMock.PROJECT_1.pk_entity
        },
        template: `
    <gv-init-state [schemaObjects]="schemaObjects" [initState]="initState"></gv-init-state>
    <gv-sandbox-button [vot]="dimensionVOT" [value]="dimension" [pkProject]="pkProject"></gv-sandbox-button>
    `})

    .add('CtrlValueDialog | LangString', {
        context: {
            initState: IAppStateMock.stateProject1,
            schemaObjects: [
                GvSchemaObjectMock.project1,
                GvSchemaObjectMock.ctrlValueDialog_langstring
            ],
            langStringVOT,
            langString: InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER,
            pkProject: ProProjectMock.PROJECT_1.pk_entity
        },
        template: `
    <gv-init-state [schemaObjects]="schemaObjects" [initState]="initState"></gv-init-state>
    <gv-sandbox-button [vot]="langStringVOT" [value]="langString" [pkProject]="pkProject"></gv-sandbox-button>
    `})

    .add('CtrlValueDialog | TimePrimitive', {
        context: {
            initState: IAppStateMock.stateProject1,
            schemaObjects: [
                GvSchemaObjectMock.project1,
                GvSchemaObjectMock.ctrlValueDialog_timeprimitive
            ],
            timePrimitiveVOT,
            timePrimitive: InfTimePrimitiveMock.TP_1,
            pkProject: ProProjectMock.PROJECT_1.pk_entity
        },
        template: `
    <gv-init-state [schemaObjects]="schemaObjects" [initState]="initState"></gv-init-state>
    <gv-sandbox-button [vot]="langStringVOT" [value]="langString" [pkProject]="pkProject"></gv-sandbox-button>
    `})
