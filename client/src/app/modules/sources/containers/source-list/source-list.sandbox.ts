import { RouterModule } from '@angular/router';
import { sandboxOf } from 'angular-playground';
import { InfDigitalObject } from 'app/core';
import { AnnotationViewComponent } from 'app/modules/annotation/components/annotation-view/annotation-view.component';
import { ChunkViewComponent } from 'app/modules/annotation/components/chunk-view/chunk-view.component';
import { MentionedEntitiesViewComponent } from 'app/modules/annotation/components/mentioned-entities-view/mentioned-entities-view.component';
import { MentionedEntityViewComponent } from 'app/modules/annotation/components/mentioned-entity-view/mentioned-entity-view.component';
import { AnnotationCtrlActions } from 'app/modules/annotation/containers/annotation-ctrl/annotation-ctrl.actions';
import { AnnotationCtrlComponent } from 'app/modules/annotation/containers/annotation-ctrl/annotation-ctrl.component';
import { AnnotationPanelActions } from 'app/modules/annotation/containers/annotation-panel/annotation-panel.actions';
import { AnnotationPanelComponent } from 'app/modules/annotation/containers/annotation-panel/annotation-panel.component';
import { MentionedEntityCtrlActions } from 'app/modules/annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.actions';
import { MentionedEntitiesCtrlComponent } from 'app/modules/annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.component';
import { QuillModule } from 'app/modules/quill';
import { KeysPipe } from 'app/shared/pipes/keys.pipe';
import { ISourceListState } from '../..';
import { textBüchel } from '../../../quill/quill-edit/quill-edit.sandbox.mock';
import { SourceCreateFormComponent } from '../../components/source-create-form/source-create-form.component';
import { SourceSearchHitComponent } from '../../components/source-search-hit/source-search-hit.component';

import { SourceListComponent } from './source-list.component';

export default sandboxOf(SourceListComponent, {
  imports: [
    RouterModule.forRoot([]),
    QuillModule,
  ],
  declarations: [
    KeysPipe,
    SourceSearchHitComponent,
    SourceCreateFormComponent,
    AnnotationPanelComponent,
    AnnotationViewComponent,
    AnnotationCtrlComponent,
    MentionedEntitiesCtrlComponent,
    AnnotationViewComponent,
    ChunkViewComponent,
    MentionedEntitiesViewComponent,
    MentionedEntityViewComponent
  ],
  providers: [
    KeysPipe,
    AnnotationPanelActions,
    AnnotationCtrlActions,
    MentionedEntityCtrlActions
  ]
})
  .add('Source-List | Source List', {
    context: {
      path: '',
      initState: {
        list: {
          '_source_1': {
            id: 1,
            version: 1,
            label: 'Acta Muriensis'
          },
          '_source_2': {
            id: 1,
            version: 1,
            label: 'Quelle B'
          }
        }
      } as ISourceListState
    },
    template: `
    <div class="container-fluid">
      <gv-source-list [path]="path" [initState]="initState"></gv-source-list>
    </div>
   `
  })

  .add('Source-List | Create Source', {
    context: {
      path: '',
      initState: {
        // should not be visible
        list: {
          '_source_1': {
            id: 1,
            version: 1,
            label: 'Acta Muriensis'
          }
        },
        create: true
      } as ISourceListState
    },
    template: `
    <div class="container-fluid">
      <gv-source-list [path]="path" [initState]="initState"></gv-source-list>
    </div>
   `
  })
  .add('Source-List | Edit Source', {
    context: {
      path: '',
      initState: {
        // should not be visible
        list: {
          '_source_1': {
            id: 1,
            version: 1,
            label: 'Acta Muriensis'
          }
        },
        edit: {
          view: {
            js_quill_data: textBüchel,
            notes: 'Emmanuel Büchel'
          } as InfDigitalObject
        }
      } as ISourceListState
    },
    template: `
    <div class="container-fluid d-flex flex-column" style="height:600px">
      <gv-source-list [path]="path" [initState]="initState" class="gv-grow-1 d-flex flex-column"></gv-source-list>
    </div>
   `
  })
  .add('Source-List | Edit Source see Annotations', {
    context: {
      path: '',
      initState: {
        // should not be visible
        list: {
          '_source_1': {
            id: 1,
            version: 1,
            label: 'Acta Muriensis'
          }
        },
        edit: {
          view: {
            js_quill_data: textBüchel,
            notes: 'Emmanuel Büchel'
          } as InfDigitalObject,
        }
      } as ISourceListState
    },
    template: `
    <div class="container-fluid d-flex flex-column" style="height:600px">
      <gv-source-list [path]="path" [initState]="initState" class="gv-grow-1 d-flex flex-column"></gv-source-list>
    </div>
   `
  })
  .add('Source-List | Remove Source', {
    context: {
      path: '',
      initState: {
        // should not be visible
        list: {
          '_source_1': {
            id: 1,
            version: 1,
            label: 'Acta Muriensis'
          }
        },
        remove: {
          id: 1,
          version: 1,
          label: 'Acta Muriensis'
        }
      } as ISourceListState
    },
    template: `
    <div class="container-fluid d-flex flex-column" style="height:600px">
      <gv-source-list [path]="path" [initState]="initState" class="gv-grow-1 d-flex flex-column"></gv-source-list>
    </div>
   `
  })
