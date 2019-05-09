import { sandboxOf } from 'angular-playground';
import { ProProject } from 'app/core';
import { InitPeItEditableStateModule } from 'app/shared';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { Information2Module } from '../../../information.module';
import { PeItEditableComponent } from './pe-it-editable.component';

export default sandboxOf(PeItEditableComponent, {
  imports: [
    InitPeItEditableStateModule,
    InitStateModule,
    Information2Module
  ],
  declareComponent: false
})
  .add('View ', {
    context: {
      basePath: ['_peIt_editable'],
      pkProject: 57,
      pkEntity: 162152,
      state: {
        activeProject: {
          pk_entity: 57
        } as ProProject,
        _peIt_editable: undefined
      }
    },
    template: `
    <gv-init-pe-it-editable-state [pkProject]="pkProject" [pkEntity]="pkEntity" (stateCreated)="state._peIt_editable = $event"
    ></gv-init-pe-it-editable-state>

    <div class="d-flex justify-content-center mt-5" *ngIf="state._peIt_editable">
      <div style="width:700px;height:400px" class="d-flex">

        <gv-init-state [initState]="state"></gv-init-state>

        <gv-pe-it-editable class="gv-grow-1" [basePath]="basePath"></gv-pe-it-editable>

      </div>
    </div>
        `
  })

  .add('Generate PeIt Edit State ', {
    context: {
      basePath: ['_peIt_editable'],
      pkProject: 57,
      pkEntity: 162152,
      state: {
        activeProject: {
          pk_entity: 57
        } as ProProject,
        _peIt_editable: undefined
      }
    },
    template: `
    <gv-init-pe-it-editable-state [pkProject]="pkProject" [pkEntity]="pkEntity" (stateCreated)="state._peIt_editable = $event"
    ></gv-init-pe-it-editable-state>

    <pre>
      {{state|json}}
    </pre>
    `
  })