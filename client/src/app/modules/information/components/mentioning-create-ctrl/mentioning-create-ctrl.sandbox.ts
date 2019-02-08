import { sandboxOf } from 'angular-playground';
import { Information2Module } from '../../information.module';
import { MentioningCreateCtrlComponent } from './mentioning-create-ctrl.component';
import { EntityPreview } from 'app/core';




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
                fk_class: 21,
                entity_label: 'Johan Jakon Leu',
                type_label: 'Person',
                pk_entity: 21
            } as EntityPreview,
            band1: {
                fk_class: 220,
                entity_label: 'Helvetisches Lexikon Band 1',
                type_label: 'Book',
                pk_entity: 22
            } as EntityPreview,
            sectionXI: {
                fk_class: 218,
                entity_label: 'XI',
                type_label: 'Page',
                pk_entity: 23
            } as EntityPreview,
            sourceEntity: {
                fk_class: 219,
                entity_label: 'Helvetisches Lexikon',
                type_label: 'Lexikon',
                pk_entity: 12345
            } as EntityPreview,
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
                        <div>Drag Entity</div>
                        {{leu.entity_label}}
                    </div>
                </div>
                <div class="card" dnd-draggable [dragEnabled]="true" [dragData]="band1">
                    <div class="card-body">
                        <div>Drag Source</div>
                        {{band1.entity_label}}
                    </div>
                </div>
                <div class="card" dnd-draggable [dragEnabled]="true" [dragData]="sectionXI">
                    <div class="card-body">
                        <div>Drag Section</div>
                        {{sectionXI.entity_label}}
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
