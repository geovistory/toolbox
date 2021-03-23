import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { sandboxOf } from 'angular-playground';
import { ValueObjectTypeName } from 'projects/app-toolbox/src/app/shared/components/digital-table/components/table/table.component';
import { InfValueObjectType, VotType } from 'projects/app-toolbox/src/app/shared/components/digital-table/components/table/value-matcher/value-matcher.component';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { InfAppellationMock } from 'projects/__test__/data/auto-gen/gvDB/InfAppellationMock';
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
                    initVal$: new BehaviorSubject(this.value)
                }
            })
    }
}

const appellationVOT: VotType = { type: ValueObjectTypeName.appellation }
const appellation: Partial<InfValueObjectType> = { string: 'test Appellation' };

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
            appellation: InfAppellationMock.ALBERT
        },
        template: `
        <gv-init-state [schemaObjects]="schemaObjects" [initState]="initState"></gv-init-state>
        <gv-sandbox-button [vot]="appellationVOT" [value]="appellation"></gv-sandbox-button>
    `
    })
