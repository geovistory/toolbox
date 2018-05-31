import { sandboxOf } from "angular-playground";
import { SourceListComponent } from "./source-list.component";
import { SourceSanboxStoreModule } from "./source-list.sandbox.store";
import { SourceListActions } from "./source-list.actions";
import { ISourceListState } from "../..";
import { SourceCreateFormComponent } from "../../components/source-create-form/source-create-form.component";
import { SourceSearchHitComponent } from "../../components/source-search-hit/source-search-hit.component";
import { SourceDetailComponent } from "../source-detail/source-detail.component";
import { KeysPipe } from "app/shared/pipes/keys.pipe";
import { InfDigitalObject, InfEntityAssociation } from "app/core";
import { textBüchel } from "../../../quill/quill-edit/quill-edit.sandbox.mock";
import { QuillModule } from "app/modules/quill";
import { SourceDetailActions } from "../source-detail/source-detail.actions";
import { Chunk, IAnnotationPanelState } from "app/modules/annotation";
import { AnnotationViewComponent } from "app/modules/annotation/components/annotation-view/annotation-view.component";
import { AnnotationCtrlComponent } from "app/modules/annotation/containers/annotation-ctrl/annotation-ctrl.component";
import { MentionedEntitiesCtrlComponent } from "app/modules/annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.component";
import { ChunkViewComponent } from "app/modules/annotation/components/chunk-view/chunk-view.component";
import { MentionedEntitiesViewComponent } from "app/modules/annotation/components/mentioned-entities-view/mentioned-entities-view.component";
import { MentionedEntityViewComponent } from "app/modules/annotation/components/mentioned-entity-view/mentioned-entity-view.component";
import { AnnotationPanelActions } from "app/modules/annotation/containers/annotation-panel/annotation-panel.actions";
import { AnnotationCtrlActions } from "app/modules/annotation/containers/annotation-ctrl/annotation-ctrl.actions";
import { MentionedEntityCtrlActions } from "app/modules/annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.actions";
import { AnnotationPanelComponent } from "app/modules/annotation/containers/annotation-panel/annotation-panel.component";
import { RouterModule } from "@angular/router";

export default sandboxOf(SourceListComponent, {
  imports: [
    RouterModule.forRoot([]),
    SourceSanboxStoreModule,
    QuillModule,
  ],
  declarations: [
    KeysPipe,
    SourceSearchHitComponent,
    SourceDetailComponent,
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
    SourceListActions,
    SourceDetailActions,
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
            label: 'Acta Muriensis'
          },
          '_source_2': {
            id: 1,
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
      <gv-source-list [path]="path" [initState]="initState" class="gv-flex-grow-1 d-flex flex-column"></gv-source-list>
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
      <gv-source-list [path]="path" [initState]="initState" class="gv-flex-grow-1 d-flex flex-column"></gv-source-list>
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
            label: 'Acta Muriensis'
          }
        },
        remove: {
          id: 1,
          label: 'Acta Muriensis'
        }
      } as ISourceListState
    },
    template: `
    <div class="container-fluid d-flex flex-column" style="height:600px">
      <gv-source-list [path]="path" [initState]="initState" class="gv-flex-grow-1 d-flex flex-column"></gv-source-list>
    </div>
   `
  })
