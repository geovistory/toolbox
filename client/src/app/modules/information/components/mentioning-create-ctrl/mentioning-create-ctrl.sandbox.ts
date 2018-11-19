import { sandboxOf } from 'angular-playground';
import { Information2Module } from '../../information.module';
import { MentioningCreateCtrlComponent } from './mentioning-create-ctrl.component';
import { DataUnitPreview } from 'app/core';




export default sandboxOf(MentioningCreateCtrlComponent, {
    declareComponent: false,
    imports: [
        Information2Module
    ]
})
    .add('MentioningCreateCtrl | New ', {
        context: {
            model: {},
            leu: {
                fkClass: 21,
                label: 'Johan Jakon Leu',
                pkEntity: 21
            } as DataUnitPreview,
            band1: {
                fkClass: 220,
                label: 'Helvetisches Lexikon Band 1',
                pkEntity: 22
            } as DataUnitPreview,
            sectionXI: {
                fkClass: 218,
                label: 'Page XI',
                pkEntity: 22
            } as DataUnitPreview,
            sourceEntity: {
                fkClass: 219,
                label: 'Helvetisches Lexikon',
                pkEntity: 12345
            } as DataUnitPreview,
            parentPath: ''
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <gv-mentioning-create-ctrl
                    name="mentioningCreateCtrl" [(ngModel)]="model.mentioningCreateCtrl" #mentioningCreateCtrl="ngModel" required></gv-mentioning-create-ctrl>
                </form>
            </div>
            <div>
                <div class="card" dnd-draggable [dragEnabled]="true" [dragData]="leu">
                    <div class="card-body">
                        <div>Drag DataUnit</div>
                        {{leu.label}}
                    </div>
                </div>
                <div class="card" dnd-draggable [dragEnabled]="true" [dragData]="band1">
                    <div class="card-body">
                        <div>Drag Source</div>
                        {{band1.label}}
                    </div>
                </div>
                <div class="card" dnd-draggable [dragEnabled]="true" [dragData]="sectionXI">
                    <div class="card-body">
                        <div>Drag Section</div>
                        {{sectionXI.label}}
                    </div>
                </div>
                <hr/>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f.value | json}}
                </pre>

            </div>
        </div>`
    })
