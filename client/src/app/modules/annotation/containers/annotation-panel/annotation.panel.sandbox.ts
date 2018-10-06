import { sandboxOf } from 'angular-playground';
import { InfEntityAssociation, ProjectDetail } from 'app/core';
import { Information2Module } from 'app/modules/information/information.module';
import { QuillModule } from 'app/modules/quill';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { Chunk, IAnnotationPanelState } from '../../annotation.models';
import { AnnotationViewComponent } from '../../components/annotation-view/annotation-view.component';
import { ChunkViewComponent } from '../../components/chunk-view/chunk-view.component';
import { MentionedEntitiesViewComponent } from '../../components/mentioned-entities-view/mentioned-entities-view.component';
import { MentionedEntityViewComponent } from '../../components/mentioned-entity-view/mentioned-entity-view.component';
import { AnnotationCtrlActions } from '../annotation-ctrl/annotation-ctrl.actions';
import { AnnotationCtrlComponent } from '../annotation-ctrl/annotation-ctrl.component';
import { MentionedEntityCtrlActions } from '../mentioned-entities-ctrl/mentioned-entities-ctrl.actions';
import { MentionedEntitiesCtrlComponent } from '../mentioned-entities-ctrl/mentioned-entities-ctrl.component';
import { AnnotationPanelActions } from './annotation-panel.actions';
import { AnnotationPanelComponent } from './annotation-panel.component';
import { AnnotationSanboxStoreModule } from './sandbox.store';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { crm } from '../../../information/information.sandbox.mock';

const pkProject = 15;

export default sandboxOf(AnnotationPanelComponent, {
  imports: [
    // AnnotationSanboxStoreModule,
    InitStateModule,
    QuillModule,
    Information2Module,
    KeysModule
  ],
  declarations: [
    AnnotationViewComponent,
    AnnotationCtrlComponent,
    MentionedEntitiesCtrlComponent,
    AnnotationViewComponent,
    ChunkViewComponent,
    MentionedEntitiesViewComponent,
    MentionedEntityViewComponent
  ],
  providers: [
    AnnotationPanelActions,
    AnnotationCtrlActions,
    MentionedEntityCtrlActions
  ]
})
  .add('View ', {
    context: {
      path: ['annotationPanel'],
      initState: {
        activeProject: {
          pk_project: pkProject,
          crm: crm
        } as ProjectDetail,
        annotationPanel: {
          view: {
            _annot_1: {
              chunk: new Chunk({
                quillDelta: {
                  text: 'I am some text'
                }
              }),
              mentionedEntities: {
                _entity_123: {
                  pkEntity: 123,
                  entityAssociation: new InfEntityAssociation(),
                  label: 'Bern'
                },
                _entity_124: {
                  pkEntity: 124,
                  entityAssociation: new InfEntityAssociation(),
                  label: 'Moritz'
                },
                _entity_125: {
                  pkEntity: 125,
                  entityAssociation: new InfEntityAssociation(),
                  label: 'Bern'
                },
                _entity_126: {
                  pkEntity: 126,
                  entityAssociation: new InfEntityAssociation(),
                  label: 'Moritz'
                }
              }
            },
            _annot_2: {
              chunk: new Chunk({
                quillDelta: {
                  text: 'some other words'
                }
              }),
              mentionedEntities: {
                _entity_400: {
                  pkEntity: 400,
                  entityAssociation: new InfEntityAssociation(),
                  label: 'Hans Muster'
                }
              }
            },
            _annot_3: {
              chunk: new Chunk({
                quillDelta: {
                  text: 'some other words'
                }
              }),
              mentionedEntities: {
                _entity_400: {
                  pkEntity: 400,
                  entityAssociation: new InfEntityAssociation(),
                  label: 'Hans Muster'
                }
              }
            }
          }
        } as IAnnotationPanelState
      }

    },
    template: `

    <gv-init-state [initState]="initState"></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:400px" class="d-flex">
        <gv-annotation-panel class="d-flex flex-column gv-grow-1" [path]="path"></gv-annotation-panel>
      </div>
    </div>
        `
  })
  .add('Edit: Step 1a – Select Segment', {
    context: {
      path: '',
      initState: {
        view: {
          _annot_1: {
            chunk: new Chunk(),
            mentionedEntities: {
              _entity_123: {
                pkEntity: 123,
                entityAssociation: new InfEntityAssociation(),
                label: 'Bern'
              }
            }
          }
        },
        edit: {
          selectingSegment: true,
          selectingEntities: false
        }
      } as IAnnotationPanelState
    },
    template: `

    <gv-init-state [initState]="initState"></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:500px" class="d-flex">
        <gv-annotation-panel class="gv-grow-1" [path]="path"></gv-annotation-panel>

      </div>
    </div>
    `
  })
  .add('Edit: Step 1b – Ready for next step', {
    context: {
      path: '',
      initState: {
        view: {},
        edit: {
          selectingSegment: true,
          selectingEntities: false,
          chunk: new Chunk({
            quillDelta: {
              text: 'I am some text'
            }
          }),
        }
      } as IAnnotationPanelState
    },
    template: `

    <gv-init-state [initState]="initState"></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:500px" class="d-flex">
        <gv-annotation-panel class="gv-grow-1" [path]="path"></gv-annotation-panel>
      </div>
    </div>
    `
  })
  .add('Edit: Step 2 – Select Mentioned Entities', {
    context: {
      path: '',
      initState: {
        view: {},
        edit: {
          selectingSegment: false,
          selectingEntities: true,
          chunk: new Chunk({
            quillDelta: {
              text: 'I am some text'
            }
          }),
          mentionedEntities: {
            _entity_123: {
              pkEntity: 123,
              entityAssociation: new InfEntityAssociation(),
              label: 'Bern'
            },
            _entity_124: {
              pkEntity: 124,
              entityAssociation: new InfEntityAssociation(),
              label: 'Moritz'
            }
          }
        }
      } as IAnnotationPanelState
    },
    template: `

    <gv-init-state [initState]="initState"></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:500px" class="d-flex">
        <gv-annotation-panel class="gv-grow-1" [path]="path"></gv-annotation-panel>
      </div>
    </div>
    `
  })
  .add('Remove: Step 1 – Are you sure?', {
    context: {
      path: '',
      initState: {
        view: {
          _annot_1: {
            chunk: new Chunk(),
            mentionedEntities: {
              _entity_123: {
                pkEntity: 123,
                entityAssociation: new InfEntityAssociation(),
                label: 'Bern'
              }
            }
          }
        },
        remove: {
          chunk: new Chunk({
            quillDelta: {
              text: 'I am some text'
            }
          }),
          mentionedEntities: {
            _entity_123: {
              pkEntity: 123,
              entityAssociation: new InfEntityAssociation(),
              label: 'Bern'
            }
          }
        }
      } as IAnnotationPanelState
    },
    template: `

    <gv-init-state [initState]="initState"></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:500px" class="d-flex">
        <gv-annotation-panel class="gv-grow-1" [path]="path"></gv-annotation-panel>

      </div>
    </div>
    `
  })
