import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SysConfigValueObjectType } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { InfValueObject } from 'projects/app-toolbox/src/app/shared/components/value-preview/value-preview.component';
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

  @Input() vot: SysConfigValueObjectType;
  @Input() pkClass: number;
  @Input() value: InfValueObject;
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
          pkClass: this.pkClass,
          vot: this.vot,
          initVal$: new BehaviorSubject(this.value),
          pkProject: this.pkProject,
        }
      })
  }
}


const appellationVOT: SysConfigValueObjectType = { appellation: 'true' };
const appellationClass = 40
const placeVOT: SysConfigValueObjectType = { place: 'true' };
const placeClass = 51
const dimensionVOT: SysConfigValueObjectType = { dimension: { measurementUnitClass: 690 } };
const dimensionClass = 689
const langStringVOT: SysConfigValueObjectType = { langString: 'true' };
const langStringClass = 657
const timePrimitiveVOT: SysConfigValueObjectType = { timePrimitive: 'true' };
const timePrimitiveClass = 335
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
      appellationClass,
      appellation: InfAppellationMock.ALBERT,
      pkProject: ProProjectMock.PROJECT_1.pk_entity
    },
    template: `
    <gv-init-state [schemaObjects]="schemaObjects" [initState]="initState"></gv-init-state>
    <gv-sandbox-button [vot]="appellationVOT" [pkClass]="appellationClass" [value]="appellation" [pkProject]="pkProject"></gv-sandbox-button>
    `})

  .add('CtrlValueDialog | Place', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: [
        GvSchemaObjectMock.project1
      ],
      placeVOT,
      placeClass,
      place: InfPlaceMock.PLACE_123,
      pkProject: ProProjectMock.PROJECT_1.pk_entity
    },
    template: `
    <gv-init-state [schemaObjects]="schemaObjects" [initState]="initState"></gv-init-state>
    <gv-sandbox-button [vot]="placeVOT" [pkClass]="placeClass" [value]="place" [pkProject]="pkProject"></gv-sandbox-button>
    `})

  .add('CtrlValueDialog | Dimension', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: [
        GvSchemaObjectMock.project1,
        GvSchemaObjectMock.ctrlValueDialog_dimension
      ],
      dimensionVOT,
      dimensionClass,
      dimension: InfDimensionMock.ONE_MONTH,
      pkProject: ProProjectMock.PROJECT_1.pk_entity
    },
    template: `
    <gv-init-state [schemaObjects]="schemaObjects" [initState]="initState"></gv-init-state>
    <gv-sandbox-button [vot]="dimensionVOT" [pkClass]="dimensionClass" [value]="dimension" [pkProject]="pkProject"></gv-sandbox-button>
    `})

  .add('CtrlValueDialog | LangString', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: [
        GvSchemaObjectMock.project1,
        GvSchemaObjectMock.ctrlValueDialog_langstring
      ],
      langStringVOT,
      langStringClass,
      langString: InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER,
      pkProject: ProProjectMock.PROJECT_1.pk_entity
    },
    template: `
    <gv-init-state [schemaObjects]="schemaObjects" [initState]="initState"></gv-init-state>
    <gv-sandbox-button [vot]="langStringVOT" [pkClass]="langStringClass" [value]="langString" [pkProject]="pkProject"></gv-sandbox-button>
    `})

  .add('CtrlValueDialog | TimePrimitive', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: [
        GvSchemaObjectMock.project1,
        GvSchemaObjectMock.ctrlValueDialog_timeprimitive
      ],
      timePrimitiveVOT,
      timePrimitiveClass,
      timePrimitive: InfTimePrimitiveMock.TP_1,
      pkProject: ProProjectMock.PROJECT_1.pk_entity
    },
    template: `
    <gv-init-state [schemaObjects]="schemaObjects" [initState]="initState"></gv-init-state>
    <gv-sandbox-button [vot]="langStringVOT" [pkClass]="langStringClass" [value]="langString" [pkProject]="pkProject"></gv-sandbox-button>
    `})
