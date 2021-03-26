import { Injectable } from '@angular/core';
import { DatChunk, InfPersistentItem, InfTemporalEntity, ProDfhClassProjRel, ProInfoProjRel } from '@kleiolab/lib-sdk-lb3';
import { FluxStandardAction } from 'flux-standard-action';
import { ListType, Panel, PanelTab, ProjectDetail, ProjectPreview, TypePeIt } from '../models/active-project.models';

export interface ActiveProjectMeta {

  projectPreview?: ProjectPreview;

  pk_project?: number;
  pk_entity?: number;
  pk_entities?: number[];
  pk_classes?: number[]
  pk_ui_context?: number;
  entity_version?: number;


  chunk?: DatChunk
  teEnGraphs?: InfTemporalEntity[]
  peItGraphs?: InfPersistentItem[]
  types?: TypePeIt[]

  // CRM and Config
  projRel?: ProDfhClassProjRel;
  dfh_pk_class?: number;
  // hasTypeProperties?: HasTypePropertyReadable[]

  // Information
  infProjRel?: ProInfoProjRel;

  // layout
  panels?: Panel[];
  list?: ListType;
  panelIndex?: number;
  panelSerial?: number;
  tabIndex?: number;
  uiIdSerial?: number;
  focusedPanel?: number;
  previousPanelIndex?: number
  currentPanelIndex?: number
  previousTabIndex?: number
  currentTabIndex?: number
  tab?: PanelTab<any>;

  // Layout Modals
  // createOrAddEntity?: CreateOrAddEntity; // Check if this really belongt in state
};
type Payload = ProjectDetail;
export type ActiveProjectAction = FluxStandardAction<Payload, ActiveProjectMeta>;


@Injectable({
  providedIn: 'root'
})
export class ActiveProjectActions {

  /* tslint:disable:member-ordering */

  /************************************************************************************
   * CRM and Config (metadata, crm)
  ************************************************************************************/
  static LOAD_PROJECT_BASICS = 'ActiveProject::LOAD_PROJECT_BASICS';
  static LOAD_PROJECT_BASICS_FAILED = 'ActiveProject::LOAD_PROJECT_BASICS_FAILED';
  static LOAD_PROJECT_BASICS_SUCCEEDED = 'ActiveProject::LOAD_PROJECT_BASICS_SUCCEEDED';
  static LOAD_PROJECT_CONFIG = 'ActiveProject::LOAD_PROJECT_CONFIG';
  static LOAD_PROJECT_CONFIG_SUCCEEDED = 'ActiveProject::LOAD_PROJECT_CONFIG_SUCCEEDED';


  loadProjectBasics(pk_project: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.LOAD_PROJECT_BASICS,
      payload: null,
      meta: {
        pk_project
      }
    }
  }

  loadProjectBasiscsSucceded(projectPreview: ProjectPreview): ActiveProjectAction {
    return {
      type: ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED,
      payload: null,
      meta: { projectPreview },
    }
  }

  loadProjectConfig(pk_project: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.LOAD_PROJECT_CONFIG,
      payload: null,
      meta: {
        pk_project
      },
    }
  }

  loadProjectConfigSucceeded(): ActiveProjectAction {
    return {
      type: ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED,
      payload: {
        // crm
      },
      meta: null,
    }
  }

  /************************************************************************************
   * Layout -- Tabs
  ************************************************************************************/
  static SET_LIST_TYPE = 'ActiveProject::SET_LIST_TYPE';

  setListType(list: ListType): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_LIST_TYPE,
      payload: null,
      meta: {
        list
      }
    }
  }

  static SET_PANELS = 'ActiveProject::SET_PANELS';

  setPanels(panels: Panel[], uiIdSerial: number, panelSerial: number, focusedPanel: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_PANELS,
      payload: null,
      meta: { panels, uiIdSerial, panelSerial, focusedPanel }
    }
  }

  static ACTIVATE_TAB = 'ActiveProject::ACTIVATE_TAB';

  activateTab(panelIndex: number, tabIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.ACTIVATE_TAB,
      payload: null,
      meta: {
        panelIndex, tabIndex
      }
    }
  }
  static MOVE_TAB = 'ActiveProject::MOVE_TAB';
  moveTab(previousPanelIndex: number, currentPanelIndex: number, previousTabIndex: number, currentTabIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.MOVE_TAB,
      payload: null,
      meta: {
        previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex
      }
    }
  }

  static CLOSE_TAB = 'ActiveProject::CLOSE_TAB';
  closeTab(panelIndex: number, tabIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.CLOSE_TAB,
      payload: null,
      meta: {
        panelIndex, tabIndex
      }
    }
  }

  static ADD_TAB = 'ActiveProject::ADD_TAB';
  addTab<TabData>(tab: PanelTab<TabData>): ActiveProjectAction {
    return {
      type: ActiveProjectActions.ADD_TAB,
      payload: null,
      meta: { tab }
    }
  }

  static SPLIT_PANEL = 'ActiveProject::SPLIT_PANEL';
  splitPanel(previousPanelIndex: number, tabIndex: number, currentPanelIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SPLIT_PANEL,
      payload: null,
      meta: { previousPanelIndex, tabIndex, currentPanelIndex }
    }
  }

  static CLOSE_PANEL = 'ActiveProject::CLOSE_PANEL';
  closePanel(panelIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.CLOSE_PANEL,
      payload: null,
      meta: { panelIndex }
    }
  }


  static FOCUS_PANEL = 'ActiveProject::FOCUS_PANEL';
  focusPanel(panelIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.FOCUS_PANEL,
      payload: null,
      meta: { panelIndex }
    }
  }


  // /************************************************************************************
  //  * Layout -- Modals
  // ************************************************************************************/
  // // create or add entity modal
  // static readonly OPEN_ADD_FORM = 'ActiveProject::OPEN_ADD_FORM';
  // static readonly CLOSE_ADD_FORM = 'ActiveProject::CLOSE_ADD_FORM';

  // openAddForm = (createOrAddEntity: CreateOrAddEntity): ActiveProjectAction => ({
  //   type: ActiveProjectActions.OPEN_ADD_FORM,
  //   meta: { createOrAddEntity },
  //   payload: null
  // })

  // closeAddForm = (): ActiveProjectAction => ({
  //   type: ActiveProjectActions.CLOSE_ADD_FORM,
  //   meta: null,
  //   payload: null
  // })


  /************************************************************************************
  * Information cache
  ************************************************************************************/

  // EntityPreviews
  // static LOAD_ENTITY_PREVIEW = 'ActiveProject::LOAD_ENTITY_PREVIEW';
  // static LOAD_ENTITY_PREVIEW_SUCCEEDED = 'ActiveProject::LOAD_ENTITY_PREVIEW_SUCCEEDED';
  // static LOAD_ENTITY_PREVIEW_FAILED = 'ActiveProject::LOAD_ENTITY_PREVIEW_FAILED';


  // loadEntityPreview(pk_project: number, pk_entity: number, pk_ui_context: number): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_ENTITY_PREVIEW,
  //     payload: null,
  //     meta: {
  //       pk_project, pk_entity, pk_ui_context
  //     }
  //   }
  // }

  // loadEntityPreviewSucceeded(entityPreview: EntityPreview): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_ENTITY_PREVIEW_SUCCEEDED,
  //     payload: null,
  //     meta: {
  //       entityPreview
  //     },
  //   }
  // }

  // loadEntityPreviewFailed(error): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_ENTITY_PREVIEW_FAILED,
  //     payload: null,
  //     meta: null,
  //     error
  //   }
  // }

  // // EntityPreviews
  // static LOAD_TYPES = 'ActiveProject::LOAD_TYPES';
  // static LOAD_TYPES_SUCCEEDED = 'ActiveProject::LOAD_TYPES_SUCCEEDED';
  // static LOAD_TYPES_FAILED = 'ActiveProject::LOAD_TYPES_FAILED';
  // loadTypes(pk_project: number, pk_classes: number[]): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_TYPES,
  //     payload: null,
  //     meta: {
  //       pk_project, pk_classes
  //     }
  //   }
  // }

  // loadTypesSucceeded(types: TypePeIt[], pk_classes: number[]): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_TYPES_SUCCEEDED,
  //     payload: null,
  //     meta: {
  //       types, pk_classes
  //     },
  //   }
  // }

  // loadTypesFailed(error): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_TYPES_FAILED,
  //     payload: null,
  //     meta: null,
  //     error
  //   }
  // }



  // // Entities Details for display in Modals
  // static LOAD_ENTITY_DETAIL_FOR_MODAL = 'ActiveProject::LOAD_ENTITY_DETAIL_FOR_MODAL';
  // static LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED = 'ActiveProject::LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED';
  // static LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED = 'ActiveProject::LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED'; // TODO: Implement action/reducer
  // static LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED = 'ActiveProject::LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED';

  // loadEntityDetailForModal(pk_project: number, pk_entity: number, pk_ui_context: number): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_ENTITY_DETAIL_FOR_MODAL,
  //     payload: null,
  //     meta: {
  //       pk_project, pk_entity, pk_ui_context
  //     }
  //   }
  // }

  // loadPeItDetailsForModalSucceeded(peItDetail: EntityDetail): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED,
  //     payload: null,
  //     meta: {
  //       peItDetail
  //     },
  //   }
  // }

  // loaEntitytDetailsForModalFailed(error): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED,
  //     payload: null,
  //     meta: null,
  //     error
  //   }
  // }


  // // Chunks
  // static LOAD_CHUNK = 'ActiveProject::LOAD_CHUNK';
  // static LOAD_CHUNK_SUCCEEDED = 'ActiveProject::LOAD_CHUNK_SUCCEEDED';
  // static LOAD_CHUNK_FAILED = 'ActiveProject::LOAD_CHUNK_FAILED';

  // loadChunk(pk_project: number, pk_entity: number): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_CHUNK,
  //     payload: null,
  //     meta: {
  //       pk_project, pk_entity
  //     }
  //   }
  // }

  // loadChunkSucceeded(chunk: DatChunk): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_CHUNK_SUCCEEDED,
  //     payload: null,
  //     meta: {
  //       chunk
  //     },
  //   }
  // }

  // loadChunkFailed(error): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_CHUNK_FAILED,
  //     payload: null,
  //     meta: null,
  //     error
  //   }
  // }

  // // PeIt Graphs
  // static LOAD_PEIT_GRAPHS = 'ActiveProject::LOAD_PEIT_GRAPHS';
  // static LOAD_PEIT_GRAPHS_SUCCEEDED = 'ActiveProject::LOAD_PEIT_GRAPHS_SUCCEEDED';
  // static LOAD_PEIT_GRAPHS_FAILED = 'ActiveProject::LOAD_PEIT_GRAPHS_FAILED';


  // loadPeItGraphs(pk_project: number, pk_entities: number[]): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_PEIT_GRAPHS,
  //     payload: null,
  //     meta: {
  //       pk_project, pk_entities
  //     }
  //   }
  // }

  // loadPeItGraphsSucceeded(peItGraphs: InfPersistentItem[]): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_PEIT_GRAPHS_SUCCEEDED,
  //     payload: null,
  //     meta: {
  //       peItGraphs
  //     },
  //   }
  // }

  // loadPeItGraphsFailed(error): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_PEIT_GRAPHS_FAILED,
  //     payload: null,
  //     meta: null,
  //     error
  //   }
  // }

  // // TeEn Graphs
  // static LOAD_TEEN_GRAPHS = 'ActiveProject::LOAD_TEEN_GRAPHS';
  // static LOAD_TEEN_GRAPHS_SUCCEEDED = 'ActiveProject::LOAD_TEEN_GRAPHS_SUCCEEDED';
  // static LOAD_TEEN_GRAPHS_FAILED = 'ActiveProject::LOAD_TEEN_GRAPHS_FAILED';

  // loadTeEnGraphs(pk_project: number, pk_entities: number[]): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_TEEN_GRAPHS,
  //     payload: null,
  //     meta: {
  //       pk_project, pk_entities
  //     }
  //   }
  // }

  // loadTeEnGraphsSucceeded(teEnGraphs: InfTemporalEntity[]): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_TEEN_GRAPHS_SUCCEEDED,
  //     payload: null,
  //     meta: {
  //       teEnGraphs
  //     },
  //   }
  // }

  // loadTeEnGraphsFailed(error): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_TEEN_GRAPHS_FAILED,
  //     payload: null,
  //     meta: null,
  //     error
  //   }
  // }


  // // Queries
  // static LOAD_QUERIES = 'ActiveProject::LOAD_QUERIES';
  // static LOAD_QUERIES_SUCCEEDED = 'ActiveProject::LOAD_QUERIES_SUCCEEDED';
  // static LOAD_QUERIES_FAILED = 'ActiveProject::LOAD_QUERIES_FAILED';

  // loadQueries(pk_project: number): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_QUERIES,
  //     payload: null,
  //     meta: {
  //       pk_project
  //     }
  //   }
  // }

  // loadQueriesSucceeded(comQueryArray: ComQueryV[]): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_QUERIES_SUCCEEDED,
  //     payload: null,
  //     meta: {
  //       comQueryArray
  //     },
  //   }
  // }

  // loadQueriesFailed(error): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_QUERIES_FAILED,
  //     payload: null,
  //     meta: null,
  //     error
  //   }
  // }


  // // Query Version
  // static LOAD_QUERY_VERSION = 'ActiveProject::LOAD_QUERY_VERSION';
  // static LOAD_QUERY_VERSION_SUCCEEDED = 'ActiveProject::LOAD_QUERY_VERSION_SUCCEEDED';
  // static LOAD_QUERY_VERSION_FAILED = 'ActiveProject::LOAD_QUERY_VERSION_FAILED';

  // loadQueryVersion(pk_project: number, pk_entity: number, entity_version: number): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_QUERY_VERSION,
  //     payload: null,
  //     meta: {
  //       pk_project, pk_entity, entity_version
  //     }
  //   }
  // }

  // loadQueryVersionSucceeded(comQuery: ProQuery): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_QUERY_VERSION_SUCCEEDED,
  //     payload: null,
  //     meta: {
  //       comQuery
  //     },
  //   }
  // }

  // loadQueryVersionFailed(error): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_QUERY_VERSION_FAILED,
  //     payload: null,
  //     meta: null,
  //     error
  //   }
  // }



  // // Visuals
  // static LOAD_VISUALS = 'ActiveProject::LOAD_VISUALS';
  // static LOAD_VISUALS_SUCCEEDED = 'ActiveProject::LOAD_VISUALS_SUCCEEDED';
  // static LOAD_VISUALS_FAILED = 'ActiveProject::LOAD_VISUALS_FAILED';

  // loadVisuals(pk_project: number): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_VISUALS,
  //     payload: null,
  //     meta: {
  //       pk_project
  //     }
  //   }
  // }

  // loadVisualsSucceeded(comVisualArray: ComVisualV[]): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_VISUALS_SUCCEEDED,
  //     payload: null,
  //     meta: {
  //       comVisualArray
  //     },
  //   }
  // }

  // loadVisualsFailed(error): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_VISUALS_FAILED,
  //     payload: null,
  //     meta: null,
  //     error
  //   }
  // }
  // // Visual Version
  // static LOAD_VISUAL_VERSION = 'ActiveProject::LOAD_VISUAL_VERSION';
  // static LOAD_VISUAL_VERSION_SUCCEEDED = 'ActiveProject::LOAD_VISUAL_VERSION_SUCCEEDED';
  // static LOAD_VISUAL_VERSION_FAILED = 'ActiveProject::LOAD_VISUAL_VERSION_FAILED';

  // loadVisualVersion(pk_project: number, pk_entity: number, entity_version?: number): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_VISUAL_VERSION,
  //     payload: null,
  //     meta: {
  //       pk_project, pk_entity, entity_version
  //     }
  //   }
  // }

  // loadVisualVersionSucceeded(comVisualArray: ComVisualV[]): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_VISUAL_VERSION_SUCCEEDED,
  //     payload: null,
  //     meta: {
  //       comVisualArray
  //     },
  //   }
  // }

  // loadVisualVersionFailed(error): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.LOAD_VISUAL_VERSION_FAILED,
  //     payload: null,
  //     meta: null,
  //     error
  //   }
  // }




  /************************************************************************************
   *  Things for Mentionings / Annotations
  ************************************************************************************/
  static UPDATE_SELECTED_CHUNK = 'ActiveProject::UPDATE_SELECTED_CHUNK';
  static SET_REFINING_CHUNK = 'ActiveProject::SET_REFINING_CHUNK';
  static SET_CREATING_MENTIONING = 'ActiveProject::SET_CREATING_MENTIONING';


  // updateSelectedChunk(selectedChunk: DatChunk): ActiveProjectAction {
  //   return {
  //     type: ActiveProjectActions.UPDATE_SELECTED_CHUNK,
  //     payload: { selectedChunk },
  //     meta: null
  //   }
  // }

  setRefiningChunk(refiningChunk: boolean): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_REFINING_CHUNK,
      payload: { refiningChunk },
      meta: null
    }
  }

  setCreatingMentioning(creatingMentioning: boolean): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_CREATING_MENTIONING,
      payload: { creatingMentioning },
      meta: null
    }
  }

  /************************************************************************************
  * Highlighting of mentionings in the gui
  ************************************************************************************/
  static SET_MENTIONINGS_FOCUSED_IN_TEXT = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TEXT';
  static SET_MENTIONINGS_FOCUSED_IN_TABLE = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TABLE';

  setMentioningsFocusedInText(mentioningsFocusedInText: number[]): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT,
      payload: { mentioningsFocusedInText },
      meta: null
    }
  }

  setMentioningsFocusedInTable(mentioningsFocusedInTable: number[]): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE,
      payload: { mentioningsFocusedInTable },
      meta: null
    }
  }


  // /*********************************************************************
  //  *  Methods to manage enabling and disabling a class for the project
  //  *********************************************************************/
  // static readonly UPSERT_CLASS_PROJ_REL = 'ActiveProject::UPSERT_CLASS_PROJ_REL';
  // static readonly UPSERT_CLASS_PROJ_REL_SUCCEEDED = 'ActiveProject::UPSERT_CLASS_PROJ_REL_SUCCEEDED';
  // static readonly UPSERT_CLASS_PROJ_REL_FAILED = 'ActiveProject::UPSERT_CLASS_PROJ_REL_FAILED';

  // upsertClassProjRel = (projRel: ProDfhClassProjRel, dfh_pk_class: number): ActiveProjectAction => ({
  //   type: ActiveProjectActions.UPSERT_CLASS_PROJ_REL,
  //   meta: { projRel, dfh_pk_class },
  //   payload: null,
  // });

  // upsertClassProjRelSucceeded = (projRel: ProDfhClassProjRel, dfh_pk_class: number): ActiveProjectAction => ({
  //   type: ActiveProjectActions.UPSERT_CLASS_PROJ_REL_SUCCEEDED,
  //   meta: { projRel, dfh_pk_class },
  //   payload: null
  // })

  // upsertClassProjRelFailed = (error, dfh_pk_class: number): ActiveProjectAction => ({
  //   type: ActiveProjectActions.UPSERT_CLASS_PROJ_REL_FAILED,
  //   meta: { dfh_pk_class },
  //   payload: null,
  //   error,
  // })


  // /*********************************************************************
  //  *  Methods to manage enabling and disabling an entity for the project
  //  *********************************************************************/
  // static readonly UPSERT_ENTITY_PROJ_REL = 'ActiveProject::UPSERT_ENTITY_PROJ_REL';
  // static readonly UPSERT_ENTITY_PROJ_REL_SUCCEEDED = 'ActiveProject::UPSERT_ENTITY_PROJ_REL_SUCCEEDED';
  // static readonly UPSERT_ENTITY_PROJ_REL_FAILED = 'ActiveProject::UPSERT_ENTITY_PROJ_REL_FAILED';

  // upsertEntityProjRel = (infProjRel: ProInfoProjRel): ActiveProjectAction => ({
  //   type: ActiveProjectActions.UPSERT_ENTITY_PROJ_REL,
  //   meta: { infProjRel },
  //   payload: null,
  // });

  // upsertEntityProjRelSucceeded = (infProjRel: ProInfoProjRel): ActiveProjectAction => ({
  //   type: ActiveProjectActions.UPSERT_ENTITY_PROJ_REL_SUCCEEDED,
  //   meta: { infProjRel },
  //   payload: null
  // })

  // upsertEntityProjRelFailed = (error): ActiveProjectAction => ({
  //   type: ActiveProjectActions.UPSERT_ENTITY_PROJ_REL_FAILED,
  //   meta: null,
  //   payload: null,
  //   error,
  // })


  /************************************************************************************
   * Destroy the active project state (on closing a project)
  ************************************************************************************/
  static DESTROY = 'ActiveProject::DESTROY';
  destroy(): ActiveProjectAction {
    return {
      type: ActiveProjectActions.DESTROY,
      payload: null,
      meta: null,
    }
  }
}
