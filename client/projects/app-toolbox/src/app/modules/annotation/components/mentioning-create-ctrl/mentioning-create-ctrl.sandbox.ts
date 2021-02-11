import { sandboxOf } from 'angular-playground';
import { MentioningCreateCtrlComponent } from './mentioning-create-ctrl.component';
import { DatChunk } from '@kleiolab/lib-sdk-lb3';
import { AnnotationModule } from '../../annotation.module';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { QuillDoc } from '../../../quill';
import { WarEntityPreview } from 'projects/app-toolbox/src/app/core/sdk-lb4';

const chunk = {
  fk_text: 13,
  fk_entity_version: 3,
  quill_doc: {
    latestId: 4,
    ops: [{
      insert: 'A', attributes: { charid: '4' }
    }]
  } as QuillDoc
} as DatChunk



export default sandboxOf(MentioningCreateCtrlComponent, {
  declareComponent: false,
  imports: [
    AnnotationModule,
    InitStateModule
  ]
})
  .add('MentioningCreateCtrl | With Chunk', {
    context: {
      pkProject: 24,
      model: {},
      leu: {
        fk_class: 21,
        entity_label: 'Johan Jakon Leu',
        type_label: 'Person',
        pk_entity: 3421,
        entity_type: 'peIt'
      } as WarEntityPreview,
      band1: {
        fk_class: 220,
        entity_label: 'Helvetisches Lexikon Band 1',
        type_label: 'Book',
        pk_entity: 22,
        entity_type: 'peIt'
      } as WarEntityPreview,
      sectionXI: {
        fk_class: 218,
        entity_label: 'XI',
        type_label: 'Page',
        pk_entity: 23,
        entity_type: 'peIt'
      } as WarEntityPreview,
      sourceEntity: {
        fk_class: 219,
        entity_label: 'Helvetisches Lexikon',
        type_label: 'Lexikon',
        pk_entity: 12345,
        entity_type: 'peIt'
      } as WarEntityPreview,
      chunk,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <gv-mentioning-create-ctrl [domainChunk]="chunk"
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

  .add('MentioningCreateCtrl | Chunk required', {
    context: {
      pkProject: 24,
      model: {},
      leu: {
        fk_class: 21,
        entity_label: 'Johan Jakon Leu',
        type_label: 'Person',
        pk_entity: 3421,
        entity_type: 'peIt'
      } as WarEntityPreview,
      band1: {
        fk_class: 220,
        entity_label: 'Helvetisches Lexikon Band 1',
        type_label: 'Book',
        pk_entity: 22,
        entity_type: 'peIt'
      } as WarEntityPreview,
      sectionXI: {
        fk_class: 218,
        entity_label: 'XI',
        type_label: 'Page',
        pk_entity: 23,
        entity_type: 'peIt'
      } as WarEntityPreview,
      sourceEntity: {
        fk_class: 219,
        entity_label: 'Helvetisches Lexikon',
        type_label: 'Lexikon',
        pk_entity: 12345,
        entity_type: 'peIt'
      } as WarEntityPreview,
      chunk,
      selectedChunk: undefined,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <gv-mentioning-create-ctrl [domainChunk]="selectedChunk" [domainChunkFixed]="true"
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
                <button (click)="selectedChunk = chunk">select text</button>
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
