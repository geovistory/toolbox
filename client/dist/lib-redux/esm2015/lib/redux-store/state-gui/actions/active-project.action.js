/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/active-project.action.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * @record
 */
export function ActiveProjectMeta() { }
if (false) {
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.projectPreview;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.pk_project;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.pk_entity;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.pk_entities;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.pk_classes;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.pk_ui_context;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.entity_version;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.chunk;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.teEnGraphs;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.peItGraphs;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.types;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.projRel;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.dfh_pk_class;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.infProjRel;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.panels;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.list;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.panelIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.panelSerial;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.tabIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.uiIdSerial;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.focusedPanel;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.previousPanelIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.currentPanelIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.previousTabIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.currentTabIndex;
    /** @type {?|undefined} */
    ActiveProjectMeta.prototype.tab;
}
;
export class ActiveProjectActions {
    /**
     * @param {?} pk_project
     * @return {?}
     */
    loadProjectBasics(pk_project) {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_BASICS,
            payload: null,
            meta: {
                pk_project
            }
        };
    }
    /**
     * @param {?} projectPreview
     * @return {?}
     */
    loadProjectBasiscsSucceded(projectPreview) {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED,
            payload: null,
            meta: { projectPreview },
        };
    }
    /**
     * @param {?} pk_project
     * @return {?}
     */
    loadProjectConfig(pk_project) {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_CONFIG,
            payload: null,
            meta: {
                pk_project
            },
        };
    }
    /**
     * @return {?}
     */
    loadProjectConfigSucceeded() {
        return {
            type: ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED,
            payload: {
            // crm
            },
            meta: null,
        };
    }
    /**
     * @param {?} list
     * @return {?}
     */
    setListType(list) {
        return {
            type: ActiveProjectActions.SET_LIST_TYPE,
            payload: null,
            meta: {
                list
            }
        };
    }
    /**
     * @param {?} panels
     * @param {?} uiIdSerial
     * @param {?} panelSerial
     * @param {?} focusedPanel
     * @return {?}
     */
    setPanels(panels, uiIdSerial, panelSerial, focusedPanel) {
        return {
            type: ActiveProjectActions.SET_PANELS,
            payload: null,
            meta: { panels, uiIdSerial, panelSerial, focusedPanel }
        };
    }
    /**
     * @param {?} panelIndex
     * @param {?} tabIndex
     * @return {?}
     */
    activateTab(panelIndex, tabIndex) {
        return {
            type: ActiveProjectActions.ACTIVATE_TAB,
            payload: null,
            meta: {
                panelIndex, tabIndex
            }
        };
    }
    /**
     * @param {?} previousPanelIndex
     * @param {?} currentPanelIndex
     * @param {?} previousTabIndex
     * @param {?} currentTabIndex
     * @return {?}
     */
    moveTab(previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex) {
        return {
            type: ActiveProjectActions.MOVE_TAB,
            payload: null,
            meta: {
                previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex
            }
        };
    }
    /**
     * @param {?} panelIndex
     * @param {?} tabIndex
     * @return {?}
     */
    closeTab(panelIndex, tabIndex) {
        return {
            type: ActiveProjectActions.CLOSE_TAB,
            payload: null,
            meta: {
                panelIndex, tabIndex
            }
        };
    }
    /**
     * @template TabData
     * @param {?} tab
     * @return {?}
     */
    addTab(tab) {
        return {
            type: ActiveProjectActions.ADD_TAB,
            payload: null,
            meta: { tab }
        };
    }
    /**
     * @param {?} previousPanelIndex
     * @param {?} tabIndex
     * @param {?} currentPanelIndex
     * @return {?}
     */
    splitPanel(previousPanelIndex, tabIndex, currentPanelIndex) {
        return {
            type: ActiveProjectActions.SPLIT_PANEL,
            payload: null,
            meta: { previousPanelIndex, tabIndex, currentPanelIndex }
        };
    }
    /**
     * @param {?} panelIndex
     * @return {?}
     */
    closePanel(panelIndex) {
        return {
            type: ActiveProjectActions.CLOSE_PANEL,
            payload: null,
            meta: { panelIndex }
        };
    }
    /**
     * @param {?} panelIndex
     * @return {?}
     */
    focusPanel(panelIndex) {
        return {
            type: ActiveProjectActions.FOCUS_PANEL,
            payload: null,
            meta: { panelIndex }
        };
    }
    // updateSelectedChunk(selectedChunk: DatChunk): ActiveProjectAction {
    //   return {
    //     type: ActiveProjectActions.UPDATE_SELECTED_CHUNK,
    //     payload: { selectedChunk },
    //     meta: null
    //   }
    // }
    /**
     * @param {?} refiningChunk
     * @return {?}
     */
    setRefiningChunk(refiningChunk) {
        return {
            type: ActiveProjectActions.SET_REFINING_CHUNK,
            payload: { refiningChunk },
            meta: null
        };
    }
    /**
     * @param {?} creatingMentioning
     * @return {?}
     */
    setCreatingMentioning(creatingMentioning) {
        return {
            type: ActiveProjectActions.SET_CREATING_MENTIONING,
            payload: { creatingMentioning },
            meta: null
        };
    }
    /**
     * @param {?} mentioningsFocusedInText
     * @return {?}
     */
    setMentioningsFocusedInText(mentioningsFocusedInText) {
        return {
            type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT,
            payload: { mentioningsFocusedInText },
            meta: null
        };
    }
    /**
     * @param {?} mentioningsFocusedInTable
     * @return {?}
     */
    setMentioningsFocusedInTable(mentioningsFocusedInTable) {
        return {
            type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE,
            payload: { mentioningsFocusedInTable },
            meta: null
        };
    }
    /**
     * @return {?}
     */
    destroy() {
        return {
            type: ActiveProjectActions.DESTROY,
            payload: null,
            meta: null,
        };
    }
}
/* tslint:disable:member-ordering */
/**
 * *********************************************************************************
 * CRM and Config (metadata, crm)
 * **********************************************************************************
 */
ActiveProjectActions.LOAD_PROJECT_BASICS = 'ActiveProject::LOAD_PROJECT_BASICS';
ActiveProjectActions.LOAD_PROJECT_BASICS_FAILED = 'ActiveProject::LOAD_PROJECT_BASICS_FAILED';
ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED = 'ActiveProject::LOAD_PROJECT_BASICS_SUCCEEDED';
ActiveProjectActions.LOAD_PROJECT_CONFIG = 'ActiveProject::LOAD_PROJECT_CONFIG';
ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED = 'ActiveProject::LOAD_PROJECT_CONFIG_SUCCEEDED';
/**
 * *********************************************************************************
 * Layout -- Tabs
 * **********************************************************************************
 */
ActiveProjectActions.SET_LIST_TYPE = 'ActiveProject::SET_LIST_TYPE';
ActiveProjectActions.SET_PANELS = 'ActiveProject::SET_PANELS';
ActiveProjectActions.ACTIVATE_TAB = 'ActiveProject::ACTIVATE_TAB';
ActiveProjectActions.MOVE_TAB = 'ActiveProject::MOVE_TAB';
ActiveProjectActions.CLOSE_TAB = 'ActiveProject::CLOSE_TAB';
ActiveProjectActions.ADD_TAB = 'ActiveProject::ADD_TAB';
ActiveProjectActions.SPLIT_PANEL = 'ActiveProject::SPLIT_PANEL';
ActiveProjectActions.CLOSE_PANEL = 'ActiveProject::CLOSE_PANEL';
ActiveProjectActions.FOCUS_PANEL = 'ActiveProject::FOCUS_PANEL';
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
/**
 * *********************************************************************************
 *  Things for Mentionings / Annotations
 * **********************************************************************************
 */
ActiveProjectActions.UPDATE_SELECTED_CHUNK = 'ActiveProject::UPDATE_SELECTED_CHUNK';
ActiveProjectActions.SET_REFINING_CHUNK = 'ActiveProject::SET_REFINING_CHUNK';
ActiveProjectActions.SET_CREATING_MENTIONING = 'ActiveProject::SET_CREATING_MENTIONING';
/**
 * *********************************************************************************
 * Highlighting of mentionings in the gui
 * **********************************************************************************
 */
ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TEXT';
ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TABLE';
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
/**
 * *********************************************************************************
 * Destroy the active project state (on closing a project)
 * **********************************************************************************
 */
ActiveProjectActions.DESTROY = 'ActiveProject::DESTROY';
ActiveProjectActions.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * *********************************************************************************
     * CRM and Config (metadata, crm)
     * **********************************************************************************
     * @type {?}
     */
    ActiveProjectActions.LOAD_PROJECT_BASICS;
    /** @type {?} */
    ActiveProjectActions.LOAD_PROJECT_BASICS_FAILED;
    /** @type {?} */
    ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED;
    /** @type {?} */
    ActiveProjectActions.LOAD_PROJECT_CONFIG;
    /** @type {?} */
    ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED;
    /**
     * *********************************************************************************
     * Layout -- Tabs
     * **********************************************************************************
     * @type {?}
     */
    ActiveProjectActions.SET_LIST_TYPE;
    /** @type {?} */
    ActiveProjectActions.SET_PANELS;
    /** @type {?} */
    ActiveProjectActions.ACTIVATE_TAB;
    /** @type {?} */
    ActiveProjectActions.MOVE_TAB;
    /** @type {?} */
    ActiveProjectActions.CLOSE_TAB;
    /** @type {?} */
    ActiveProjectActions.ADD_TAB;
    /** @type {?} */
    ActiveProjectActions.SPLIT_PANEL;
    /** @type {?} */
    ActiveProjectActions.CLOSE_PANEL;
    /** @type {?} */
    ActiveProjectActions.FOCUS_PANEL;
    /**
     * *********************************************************************************
     *  Things for Mentionings / Annotations
     * **********************************************************************************
     * @type {?}
     */
    ActiveProjectActions.UPDATE_SELECTED_CHUNK;
    /** @type {?} */
    ActiveProjectActions.SET_REFINING_CHUNK;
    /** @type {?} */
    ActiveProjectActions.SET_CREATING_MENTIONING;
    /**
     * *********************************************************************************
     * Highlighting of mentionings in the gui
     * **********************************************************************************
     * @type {?}
     */
    ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT;
    /** @type {?} */
    ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE;
    /**
     * *********************************************************************************
     * Destroy the active project state (on closing a project)
     * **********************************************************************************
     * @type {?}
     */
    ActiveProjectActions.DESTROY;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1ndWkvYWN0aW9ucy9hY3RpdmUtcHJvamVjdC5hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSzNDLHVDQXlDQzs7O0lBdkNDLDJDQUFnQzs7SUFFaEMsdUNBQW9COztJQUNwQixzQ0FBbUI7O0lBQ25CLHdDQUF1Qjs7SUFDdkIsdUNBQXFCOztJQUNyQiwwQ0FBdUI7O0lBQ3ZCLDJDQUF3Qjs7SUFHeEIsa0NBQWdCOztJQUNoQix1Q0FBZ0M7O0lBQ2hDLHVDQUFnQzs7SUFDaEMsa0NBQWtCOztJQUdsQixvQ0FBNkI7O0lBQzdCLHlDQUFzQjs7SUFJdEIsdUNBQTRCOztJQUc1QixtQ0FBaUI7O0lBQ2pCLGlDQUFnQjs7SUFDaEIsdUNBQW9COztJQUNwQix3Q0FBcUI7O0lBQ3JCLHFDQUFrQjs7SUFDbEIsdUNBQW9COztJQUNwQix5Q0FBc0I7O0lBQ3RCLCtDQUEyQjs7SUFDM0IsOENBQTBCOztJQUMxQiw2Q0FBeUI7O0lBQ3pCLDRDQUF3Qjs7SUFDeEIsZ0NBQW9COztBQUlyQixDQUFDO0FBTUYsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUFjL0IsaUJBQWlCLENBQUMsVUFBa0I7UUFDbEMsT0FBTztZQUNMLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxtQkFBbUI7WUFDOUMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUU7Z0JBQ0osVUFBVTthQUNYO1NBQ0YsQ0FBQTtJQUNILENBQUM7Ozs7O0lBRUQsMEJBQTBCLENBQUMsY0FBOEI7UUFDdkQsT0FBTztZQUNMLElBQUksRUFBRSxvQkFBb0IsQ0FBQyw2QkFBNkI7WUFDeEQsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsRUFB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dEYsbUNBQXNEOztJQVl0RCxnQ0FBZ0Q7O0lBVWhELGtDQUFvRDs7SUFXcEQsOEJBQTRDOztJQVc1QywrQkFBOEM7O0lBVzlDLDZCQUEwQzs7SUFTMUMsaUNBQWtEOztJQVNsRCxpQ0FBa0Q7O0lBVWxELGlDQUFrRDs7Ozs7OztJQW9ZbEQsMkNBQXNFOztJQUN0RSx3Q0FBZ0U7O0lBQ2hFLDZDQUEwRTs7Ozs7OztJQThCMUUscURBQTBGOztJQUMxRixzREFBNEY7Ozs7Ozs7SUE0RTVGLDZCQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdENodW5rLCBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mVGVtcG9yYWxFbnRpdHksIFByb0RmaENsYXNzUHJvalJlbCwgUHJvSW5mb1Byb2pSZWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgTGlzdFR5cGUsIFBhbmVsLCBQcm9qZWN0RGV0YWlsLCBQcm9qZWN0UHJldmlldywgUGFuZWxUYWIsIFR5cGVQZUl0IH0gZnJvbSAnLi4vbW9kZWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBBY3RpdmVQcm9qZWN0TWV0YSB7XG5cbiAgcHJvamVjdFByZXZpZXc/OiBQcm9qZWN0UHJldmlldztcblxuICBwa19wcm9qZWN0PzogbnVtYmVyO1xuICBwa19lbnRpdHk/OiBudW1iZXI7XG4gIHBrX2VudGl0aWVzPzogbnVtYmVyW107XG4gIHBrX2NsYXNzZXM/OiBudW1iZXJbXVxuICBwa191aV9jb250ZXh0PzogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbj86IG51bWJlcjtcblxuXG4gIGNodW5rPzogRGF0Q2h1bmtcbiAgdGVFbkdyYXBocz86IEluZlRlbXBvcmFsRW50aXR5W11cbiAgcGVJdEdyYXBocz86IEluZlBlcnNpc3RlbnRJdGVtW11cbiAgdHlwZXM/OiBUeXBlUGVJdFtdXG5cbiAgLy8gQ1JNIGFuZCBDb25maWdcbiAgcHJvalJlbD86IFByb0RmaENsYXNzUHJvalJlbDtcbiAgZGZoX3BrX2NsYXNzPzogbnVtYmVyO1xuICAvLyBoYXNUeXBlUHJvcGVydGllcz86IEhhc1R5cGVQcm9wZXJ0eVJlYWRhYmxlW11cblxuICAvLyBJbmZvcm1hdGlvblxuICBpbmZQcm9qUmVsPzogUHJvSW5mb1Byb2pSZWw7XG5cbiAgLy8gbGF5b3V0XG4gIHBhbmVscz86IFBhbmVsW107XG4gIGxpc3Q/OiBMaXN0VHlwZTtcbiAgcGFuZWxJbmRleD86IG51bWJlcjtcbiAgcGFuZWxTZXJpYWw/OiBudW1iZXI7XG4gIHRhYkluZGV4PzogbnVtYmVyO1xuICB1aUlkU2VyaWFsPzogbnVtYmVyO1xuICBmb2N1c2VkUGFuZWw/OiBudW1iZXI7XG4gIHByZXZpb3VzUGFuZWxJbmRleD86IG51bWJlclxuICBjdXJyZW50UGFuZWxJbmRleD86IG51bWJlclxuICBwcmV2aW91c1RhYkluZGV4PzogbnVtYmVyXG4gIGN1cnJlbnRUYWJJbmRleD86IG51bWJlclxuICB0YWI/OiBQYW5lbFRhYjxhbnk+O1xuXG4gIC8vIExheW91dCBNb2RhbHNcbiAgLy8gY3JlYXRlT3JBZGRFbnRpdHk/OiBDcmVhdGVPckFkZEVudGl0eTsgLy8gQ2hlY2sgaWYgdGhpcyByZWFsbHkgYmVsb25ndCBpbiBzdGF0ZVxufTtcbnR5cGUgUGF5bG9hZCA9IFByb2plY3REZXRhaWw7XG5leHBvcnQgdHlwZSBBY3RpdmVQcm9qZWN0QWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIEFjdGl2ZVByb2plY3RNZXRhPjtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWN0aXZlUHJvamVjdEFjdGlvbnMge1xuXG4gIC8qIHRzbGludDpkaXNhYmxlOm1lbWJlci1vcmRlcmluZyAqL1xuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogQ1JNIGFuZCBDb25maWcgKG1ldGFkYXRhLCBjcm0pXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgc3RhdGljIExPQURfUFJPSkVDVF9CQVNJQ1MgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9QUk9KRUNUX0JBU0lDUyc7XG4gIHN0YXRpYyBMT0FEX1BST0pFQ1RfQkFTSUNTX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1BST0pFQ1RfQkFTSUNTX0ZBSUxFRCc7XG4gIHN0YXRpYyBMT0FEX1BST0pFQ1RfQkFTSUNTX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1BST0pFQ1RfQkFTSUNTX1NVQ0NFRURFRCc7XG4gIHN0YXRpYyBMT0FEX1BST0pFQ1RfQ09ORklHID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUFJPSkVDVF9DT05GSUcnO1xuICBzdGF0aWMgTE9BRF9QUk9KRUNUX0NPTkZJR19TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9QUk9KRUNUX0NPTkZJR19TVUNDRUVERUQnO1xuXG5cbiAgbG9hZFByb2plY3RCYXNpY3MocGtfcHJvamVjdDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9CQVNJQ1MsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YToge1xuICAgICAgICBwa19wcm9qZWN0XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbG9hZFByb2plY3RCYXNpc2NzU3VjY2VkZWQocHJvamVjdFByZXZpZXc6IFByb2plY3RQcmV2aWV3KTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9CQVNJQ1NfU1VDQ0VFREVELFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgcHJvamVjdFByZXZpZXcgfSxcbiAgICB9XG4gIH1cblxuICBsb2FkUHJvamVjdENvbmZpZyhwa19wcm9qZWN0OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0NPTkZJRyxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7XG4gICAgICAgIHBrX3Byb2plY3RcbiAgICAgIH0sXG4gICAgfVxuICB9XG5cbiAgbG9hZFByb2plY3RDb25maWdTdWNjZWVkZWQoKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9DT05GSUdfU1VDQ0VFREVELFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICAvLyBjcm1cbiAgICAgIH0sXG4gICAgICBtZXRhOiBudWxsLFxuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogTGF5b3V0IC0tIFRhYnNcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICBzdGF0aWMgU0VUX0xJU1RfVFlQRSA9ICdBY3RpdmVQcm9qZWN0OjpTRVRfTElTVF9UWVBFJztcblxuICBzZXRMaXN0VHlwZShsaXN0OiBMaXN0VHlwZSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfTElTVF9UWVBFLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgbGlzdFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBTRVRfUEFORUxTID0gJ0FjdGl2ZVByb2plY3Q6OlNFVF9QQU5FTFMnO1xuXG4gIHNldFBhbmVscyhwYW5lbHM6IFBhbmVsW10sIHVpSWRTZXJpYWw6IG51bWJlciwgcGFuZWxTZXJpYWw6IG51bWJlciwgZm9jdXNlZFBhbmVsOiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX1BBTkVMUyxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IHBhbmVscywgdWlJZFNlcmlhbCwgcGFuZWxTZXJpYWwsIGZvY3VzZWRQYW5lbCB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIEFDVElWQVRFX1RBQiA9ICdBY3RpdmVQcm9qZWN0OjpBQ1RJVkFURV9UQUInO1xuXG4gIGFjdGl2YXRlVGFiKHBhbmVsSW5kZXg6IG51bWJlciwgdGFiSW5kZXg6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5BQ1RJVkFURV9UQUIsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YToge1xuICAgICAgICBwYW5lbEluZGV4LCB0YWJJbmRleFxuICAgICAgfVxuICAgIH1cbiAgfVxuICBzdGF0aWMgTU9WRV9UQUIgPSAnQWN0aXZlUHJvamVjdDo6TU9WRV9UQUInO1xuICBtb3ZlVGFiKHByZXZpb3VzUGFuZWxJbmRleDogbnVtYmVyLCBjdXJyZW50UGFuZWxJbmRleDogbnVtYmVyLCBwcmV2aW91c1RhYkluZGV4OiBudW1iZXIsIGN1cnJlbnRUYWJJbmRleDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLk1PVkVfVEFCLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgcHJldmlvdXNQYW5lbEluZGV4LCBjdXJyZW50UGFuZWxJbmRleCwgcHJldmlvdXNUYWJJbmRleCwgY3VycmVudFRhYkluZGV4XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIENMT1NFX1RBQiA9ICdBY3RpdmVQcm9qZWN0OjpDTE9TRV9UQUInO1xuICBjbG9zZVRhYihwYW5lbEluZGV4OiBudW1iZXIsIHRhYkluZGV4OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuQ0xPU0VfVEFCLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgcGFuZWxJbmRleCwgdGFiSW5kZXhcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgQUREX1RBQiA9ICdBY3RpdmVQcm9qZWN0OjpBRERfVEFCJztcbiAgYWRkVGFiPFRhYkRhdGE+KHRhYjogUGFuZWxUYWI8VGFiRGF0YT4pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuQUREX1RBQixcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IHRhYiB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIFNQTElUX1BBTkVMID0gJ0FjdGl2ZVByb2plY3Q6OlNQTElUX1BBTkVMJztcbiAgc3BsaXRQYW5lbChwcmV2aW91c1BhbmVsSW5kZXg6IG51bWJlciwgdGFiSW5kZXg6IG51bWJlciwgY3VycmVudFBhbmVsSW5kZXg6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TUExJVF9QQU5FTCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IHByZXZpb3VzUGFuZWxJbmRleCwgdGFiSW5kZXgsIGN1cnJlbnRQYW5lbEluZGV4IH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgQ0xPU0VfUEFORUwgPSAnQWN0aXZlUHJvamVjdDo6Q0xPU0VfUEFORUwnO1xuICBjbG9zZVBhbmVsKHBhbmVsSW5kZXg6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9QQU5FTCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IHBhbmVsSW5kZXggfVxuICAgIH1cbiAgfVxuXG5cbiAgc3RhdGljIEZPQ1VTX1BBTkVMID0gJ0FjdGl2ZVByb2plY3Q6OkZPQ1VTX1BBTkVMJztcbiAgZm9jdXNQYW5lbChwYW5lbEluZGV4OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuRk9DVVNfUEFORUwsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBwYW5lbEluZGV4IH1cbiAgICB9XG4gIH1cblxuXG4gIC8vIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gICogTGF5b3V0IC0tIE1vZGFsc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIC8vIGNyZWF0ZSBvciBhZGQgZW50aXR5IG1vZGFsXG4gIC8vIHN0YXRpYyByZWFkb25seSBPUEVOX0FERF9GT1JNID0gJ0FjdGl2ZVByb2plY3Q6Ok9QRU5fQUREX0ZPUk0nO1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgQ0xPU0VfQUREX0ZPUk0gPSAnQWN0aXZlUHJvamVjdDo6Q0xPU0VfQUREX0ZPUk0nO1xuXG4gIC8vIG9wZW5BZGRGb3JtID0gKGNyZWF0ZU9yQWRkRW50aXR5OiBDcmVhdGVPckFkZEVudGl0eSk6IEFjdGl2ZVByb2plY3RBY3Rpb24gPT4gKHtcbiAgLy8gICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5PUEVOX0FERF9GT1JNLFxuICAvLyAgIG1ldGE6IHsgY3JlYXRlT3JBZGRFbnRpdHkgfSxcbiAgLy8gICBwYXlsb2FkOiBudWxsXG4gIC8vIH0pXG5cbiAgLy8gY2xvc2VBZGRGb3JtID0gKCk6IEFjdGl2ZVByb2plY3RBY3Rpb24gPT4gKHtcbiAgLy8gICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9BRERfRk9STSxcbiAgLy8gICBtZXRhOiBudWxsLFxuICAvLyAgIHBheWxvYWQ6IG51bGxcbiAgLy8gfSlcblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgKiBJbmZvcm1hdGlvbiBjYWNoZVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLy8gRW50aXR5UHJldmlld3NcbiAgLy8gc3RhdGljIExPQURfRU5USVRZX1BSRVZJRVcgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9FTlRJVFlfUFJFVklFVyc7XG4gIC8vIHN0YXRpYyBMT0FEX0VOVElUWV9QUkVWSUVXX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX0VOVElUWV9QUkVWSUVXX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyBMT0FEX0VOVElUWV9QUkVWSUVXX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX0VOVElUWV9QUkVWSUVXX0ZBSUxFRCc7XG5cblxuICAvLyBsb2FkRW50aXR5UHJldmlldyhwa19wcm9qZWN0OiBudW1iZXIsIHBrX2VudGl0eTogbnVtYmVyLCBwa191aV9jb250ZXh0OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9FTlRJVFlfUFJFVklFVyxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBrX3Byb2plY3QsIHBrX2VudGl0eSwgcGtfdWlfY29udGV4dFxuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRFbnRpdHlQcmV2aWV3U3VjY2VlZGVkKGVudGl0eVByZXZpZXc6IEVudGl0eVByZXZpZXcpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9FTlRJVFlfUFJFVklFV19TVUNDRUVERUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBlbnRpdHlQcmV2aWV3XG4gIC8vICAgICB9LFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRFbnRpdHlQcmV2aWV3RmFpbGVkKGVycm9yKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfRU5USVRZX1BSRVZJRVdfRkFJTEVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IG51bGwsXG4gIC8vICAgICBlcnJvclxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIC8vIEVudGl0eVByZXZpZXdzXG4gIC8vIHN0YXRpYyBMT0FEX1RZUEVTID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVFlQRVMnO1xuICAvLyBzdGF0aWMgTE9BRF9UWVBFU19TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9UWVBFU19TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgTE9BRF9UWVBFU19GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9UWVBFU19GQUlMRUQnO1xuICAvLyBsb2FkVHlwZXMocGtfcHJvamVjdDogbnVtYmVyLCBwa19jbGFzc2VzOiBudW1iZXJbXSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1RZUEVTLFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGtfcHJvamVjdCwgcGtfY2xhc3Nlc1xuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRUeXBlc1N1Y2NlZWRlZCh0eXBlczogVHlwZVBlSXRbXSwgcGtfY2xhc3NlczogbnVtYmVyW10pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9UWVBFU19TVUNDRUVERUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICB0eXBlcywgcGtfY2xhc3Nlc1xuICAvLyAgICAgfSxcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkVHlwZXNGYWlsZWQoZXJyb3IpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9UWVBFU19GQUlMRUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YTogbnVsbCxcbiAgLy8gICAgIGVycm9yXG4gIC8vICAgfVxuICAvLyB9XG5cblxuXG4gIC8vIC8vIEVudGl0aWVzIERldGFpbHMgZm9yIGRpc3BsYXkgaW4gTW9kYWxzXG4gIC8vIHN0YXRpYyBMT0FEX0VOVElUWV9ERVRBSUxfRk9SX01PREFMID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfRU5USVRZX0RFVEFJTF9GT1JfTU9EQUwnO1xuICAvLyBzdGF0aWMgTE9BRF9QRV9JVF9ERVRBSUxfRk9SX01PREFMX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1BFX0lUX0RFVEFJTF9GT1JfTU9EQUxfU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIExPQURfVEVfRU5fREVUQUlMX0ZPUl9NT0RBTF9TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9URV9FTl9ERVRBSUxfRk9SX01PREFMX1NVQ0NFRURFRCc7IC8vIFRPRE86IEltcGxlbWVudCBhY3Rpb24vcmVkdWNlclxuICAvLyBzdGF0aWMgTE9BRF9FTlRJVFlfREVUQUlMX0ZPUl9NT0RBTF9GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9FTlRJVFlfREVUQUlMX0ZPUl9NT0RBTF9GQUlMRUQnO1xuXG4gIC8vIGxvYWRFbnRpdHlEZXRhaWxGb3JNb2RhbChwa19wcm9qZWN0OiBudW1iZXIsIHBrX2VudGl0eTogbnVtYmVyLCBwa191aV9jb250ZXh0OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9FTlRJVFlfREVUQUlMX0ZPUl9NT0RBTCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBrX3Byb2plY3QsIHBrX2VudGl0eSwgcGtfdWlfY29udGV4dFxuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRQZUl0RGV0YWlsc0Zvck1vZGFsU3VjY2VlZGVkKHBlSXREZXRhaWw6IEVudGl0eURldGFpbCk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BFX0lUX0RFVEFJTF9GT1JfTU9EQUxfU1VDQ0VFREVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGVJdERldGFpbFxuICAvLyAgICAgfSxcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FFbnRpdHl0RGV0YWlsc0Zvck1vZGFsRmFpbGVkKGVycm9yKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfRU5USVRZX0RFVEFJTF9GT1JfTU9EQUxfRkFJTEVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IG51bGwsXG4gIC8vICAgICBlcnJvclxuICAvLyAgIH1cbiAgLy8gfVxuXG5cbiAgLy8gLy8gQ2h1bmtzXG4gIC8vIHN0YXRpYyBMT0FEX0NIVU5LID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfQ0hVTksnO1xuICAvLyBzdGF0aWMgTE9BRF9DSFVOS19TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9DSFVOS19TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgTE9BRF9DSFVOS19GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9DSFVOS19GQUlMRUQnO1xuXG4gIC8vIGxvYWRDaHVuayhwa19wcm9qZWN0OiBudW1iZXIsIHBrX2VudGl0eTogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfQ0hVTkssXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwa19wcm9qZWN0LCBwa19lbnRpdHlcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkQ2h1bmtTdWNjZWVkZWQoY2h1bms6IERhdENodW5rKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfQ0hVTktfU1VDQ0VFREVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgY2h1bmtcbiAgLy8gICAgIH0sXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZENodW5rRmFpbGVkKGVycm9yKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfQ0hVTktfRkFJTEVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IG51bGwsXG4gIC8vICAgICBlcnJvclxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIC8vIFBlSXQgR3JhcGhzXG4gIC8vIHN0YXRpYyBMT0FEX1BFSVRfR1JBUEhTID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUEVJVF9HUkFQSFMnO1xuICAvLyBzdGF0aWMgTE9BRF9QRUlUX0dSQVBIU19TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9QRUlUX0dSQVBIU19TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgTE9BRF9QRUlUX0dSQVBIU19GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9QRUlUX0dSQVBIU19GQUlMRUQnO1xuXG5cbiAgLy8gbG9hZFBlSXRHcmFwaHMocGtfcHJvamVjdDogbnVtYmVyLCBwa19lbnRpdGllczogbnVtYmVyW10pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QRUlUX0dSQVBIUyxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBrX3Byb2plY3QsIHBrX2VudGl0aWVzXG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFBlSXRHcmFwaHNTdWNjZWVkZWQocGVJdEdyYXBoczogSW5mUGVyc2lzdGVudEl0ZW1bXSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BFSVRfR1JBUEhTX1NVQ0NFRURFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBlSXRHcmFwaHNcbiAgLy8gICAgIH0sXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFBlSXRHcmFwaHNGYWlsZWQoZXJyb3IpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QRUlUX0dSQVBIU19GQUlMRUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YTogbnVsbCxcbiAgLy8gICAgIGVycm9yXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLy8gVGVFbiBHcmFwaHNcbiAgLy8gc3RhdGljIExPQURfVEVFTl9HUkFQSFMgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9URUVOX0dSQVBIUyc7XG4gIC8vIHN0YXRpYyBMT0FEX1RFRU5fR1JBUEhTX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1RFRU5fR1JBUEhTX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyBMT0FEX1RFRU5fR1JBUEhTX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1RFRU5fR1JBUEhTX0ZBSUxFRCc7XG5cbiAgLy8gbG9hZFRlRW5HcmFwaHMocGtfcHJvamVjdDogbnVtYmVyLCBwa19lbnRpdGllczogbnVtYmVyW10pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9URUVOX0dSQVBIUyxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBrX3Byb2plY3QsIHBrX2VudGl0aWVzXG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFRlRW5HcmFwaHNTdWNjZWVkZWQodGVFbkdyYXBoczogSW5mVGVtcG9yYWxFbnRpdHlbXSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1RFRU5fR1JBUEhTX1NVQ0NFRURFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHRlRW5HcmFwaHNcbiAgLy8gICAgIH0sXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFRlRW5HcmFwaHNGYWlsZWQoZXJyb3IpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9URUVOX0dSQVBIU19GQUlMRUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YTogbnVsbCxcbiAgLy8gICAgIGVycm9yXG4gIC8vICAgfVxuICAvLyB9XG5cblxuICAvLyAvLyBRdWVyaWVzXG4gIC8vIHN0YXRpYyBMT0FEX1FVRVJJRVMgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9RVUVSSUVTJztcbiAgLy8gc3RhdGljIExPQURfUVVFUklFU19TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9RVUVSSUVTX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyBMT0FEX1FVRVJJRVNfRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUVVFUklFU19GQUlMRUQnO1xuXG4gIC8vIGxvYWRRdWVyaWVzKHBrX3Byb2plY3Q6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1FVRVJJRVMsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwa19wcm9qZWN0XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFF1ZXJpZXNTdWNjZWVkZWQoY29tUXVlcnlBcnJheTogQ29tUXVlcnlWW10pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9RVUVSSUVTX1NVQ0NFRURFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIGNvbVF1ZXJ5QXJyYXlcbiAgLy8gICAgIH0sXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFF1ZXJpZXNGYWlsZWQoZXJyb3IpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9RVUVSSUVTX0ZBSUxFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiBudWxsLFxuICAvLyAgICAgZXJyb3JcbiAgLy8gICB9XG4gIC8vIH1cblxuXG4gIC8vIC8vIFF1ZXJ5IFZlcnNpb25cbiAgLy8gc3RhdGljIExPQURfUVVFUllfVkVSU0lPTiA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1FVRVJZX1ZFUlNJT04nO1xuICAvLyBzdGF0aWMgTE9BRF9RVUVSWV9WRVJTSU9OX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1FVRVJZX1ZFUlNJT05fU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIExPQURfUVVFUllfVkVSU0lPTl9GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9RVUVSWV9WRVJTSU9OX0ZBSUxFRCc7XG5cbiAgLy8gbG9hZFF1ZXJ5VmVyc2lvbihwa19wcm9qZWN0OiBudW1iZXIsIHBrX2VudGl0eTogbnVtYmVyLCBlbnRpdHlfdmVyc2lvbjogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUVVFUllfVkVSU0lPTixcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBrX3Byb2plY3QsIHBrX2VudGl0eSwgZW50aXR5X3ZlcnNpb25cbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkUXVlcnlWZXJzaW9uU3VjY2VlZGVkKGNvbVF1ZXJ5OiBQcm9RdWVyeSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1FVRVJZX1ZFUlNJT05fU1VDQ0VFREVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgY29tUXVlcnlcbiAgLy8gICAgIH0sXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFF1ZXJ5VmVyc2lvbkZhaWxlZChlcnJvcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1FVRVJZX1ZFUlNJT05fRkFJTEVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IG51bGwsXG4gIC8vICAgICBlcnJvclxuICAvLyAgIH1cbiAgLy8gfVxuXG5cblxuICAvLyAvLyBWaXN1YWxzXG4gIC8vIHN0YXRpYyBMT0FEX1ZJU1VBTFMgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9WSVNVQUxTJztcbiAgLy8gc3RhdGljIExPQURfVklTVUFMU19TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9WSVNVQUxTX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyBMT0FEX1ZJU1VBTFNfRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVklTVUFMU19GQUlMRUQnO1xuXG4gIC8vIGxvYWRWaXN1YWxzKHBrX3Byb2plY3Q6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1ZJU1VBTFMsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwa19wcm9qZWN0XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFZpc3VhbHNTdWNjZWVkZWQoY29tVmlzdWFsQXJyYXk6IENvbVZpc3VhbFZbXSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1ZJU1VBTFNfU1VDQ0VFREVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgY29tVmlzdWFsQXJyYXlcbiAgLy8gICAgIH0sXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFZpc3VhbHNGYWlsZWQoZXJyb3IpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9WSVNVQUxTX0ZBSUxFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiBudWxsLFxuICAvLyAgICAgZXJyb3JcbiAgLy8gICB9XG4gIC8vIH1cbiAgLy8gLy8gVmlzdWFsIFZlcnNpb25cbiAgLy8gc3RhdGljIExPQURfVklTVUFMX1ZFUlNJT04gPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9WSVNVQUxfVkVSU0lPTic7XG4gIC8vIHN0YXRpYyBMT0FEX1ZJU1VBTF9WRVJTSU9OX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1ZJU1VBTF9WRVJTSU9OX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyBMT0FEX1ZJU1VBTF9WRVJTSU9OX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1ZJU1VBTF9WRVJTSU9OX0ZBSUxFRCc7XG5cbiAgLy8gbG9hZFZpc3VhbFZlcnNpb24ocGtfcHJvamVjdDogbnVtYmVyLCBwa19lbnRpdHk6IG51bWJlciwgZW50aXR5X3ZlcnNpb24/OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9WSVNVQUxfVkVSU0lPTixcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBrX3Byb2plY3QsIHBrX2VudGl0eSwgZW50aXR5X3ZlcnNpb25cbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkVmlzdWFsVmVyc2lvblN1Y2NlZWRlZChjb21WaXN1YWxBcnJheTogQ29tVmlzdWFsVltdKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVklTVUFMX1ZFUlNJT05fU1VDQ0VFREVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgY29tVmlzdWFsQXJyYXlcbiAgLy8gICAgIH0sXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFZpc3VhbFZlcnNpb25GYWlsZWQoZXJyb3IpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9WSVNVQUxfVkVSU0lPTl9GQUlMRUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YTogbnVsbCxcbiAgLy8gICAgIGVycm9yXG4gIC8vICAgfVxuICAvLyB9XG5cblxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiAgVGhpbmdzIGZvciBNZW50aW9uaW5ncyAvIEFubm90YXRpb25zXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgc3RhdGljIFVQREFURV9TRUxFQ1RFRF9DSFVOSyA9ICdBY3RpdmVQcm9qZWN0OjpVUERBVEVfU0VMRUNURURfQ0hVTksnO1xuICBzdGF0aWMgU0VUX1JFRklOSU5HX0NIVU5LID0gJ0FjdGl2ZVByb2plY3Q6OlNFVF9SRUZJTklOR19DSFVOSyc7XG4gIHN0YXRpYyBTRVRfQ1JFQVRJTkdfTUVOVElPTklORyA9ICdBY3RpdmVQcm9qZWN0OjpTRVRfQ1JFQVRJTkdfTUVOVElPTklORyc7XG5cblxuICAvLyB1cGRhdGVTZWxlY3RlZENodW5rKHNlbGVjdGVkQ2h1bms6IERhdENodW5rKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlVQREFURV9TRUxFQ1RFRF9DSFVOSyxcbiAgLy8gICAgIHBheWxvYWQ6IHsgc2VsZWN0ZWRDaHVuayB9LFxuICAvLyAgICAgbWV0YTogbnVsbFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIHNldFJlZmluaW5nQ2h1bmsocmVmaW5pbmdDaHVuazogYm9vbGVhbik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfUkVGSU5JTkdfQ0hVTkssXG4gICAgICBwYXlsb2FkOiB7IHJlZmluaW5nQ2h1bmsgfSxcbiAgICAgIG1ldGE6IG51bGxcbiAgICB9XG4gIH1cblxuICBzZXRDcmVhdGluZ01lbnRpb25pbmcoY3JlYXRpbmdNZW50aW9uaW5nOiBib29sZWFuKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9DUkVBVElOR19NRU5USU9OSU5HLFxuICAgICAgcGF5bG9hZDogeyBjcmVhdGluZ01lbnRpb25pbmcgfSxcbiAgICAgIG1ldGE6IG51bGxcbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICogSGlnaGxpZ2h0aW5nIG9mIG1lbnRpb25pbmdzIGluIHRoZSBndWlcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICBzdGF0aWMgU0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEVYVCA9ICdBY3RpdmVQcm9qZWN0OjpTRVRfTUVOVElPTklOR1NfRk9DVVNFRF9JTl9URVhUJztcbiAgc3RhdGljIFNFVF9NRU5USU9OSU5HU19GT0NVU0VEX0lOX1RBQkxFID0gJ0FjdGl2ZVByb2plY3Q6OlNFVF9NRU5USU9OSU5HU19GT0NVU0VEX0lOX1RBQkxFJztcblxuICBzZXRNZW50aW9uaW5nc0ZvY3VzZWRJblRleHQobWVudGlvbmluZ3NGb2N1c2VkSW5UZXh0OiBudW1iZXJbXSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfTUVOVElPTklOR1NfRk9DVVNFRF9JTl9URVhULFxuICAgICAgcGF5bG9hZDogeyBtZW50aW9uaW5nc0ZvY3VzZWRJblRleHQgfSxcbiAgICAgIG1ldGE6IG51bGxcbiAgICB9XG4gIH1cblxuICBzZXRNZW50aW9uaW5nc0ZvY3VzZWRJblRhYmxlKG1lbnRpb25pbmdzRm9jdXNlZEluVGFibGU6IG51bWJlcltdKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9NRU5USU9OSU5HU19GT0NVU0VEX0lOX1RBQkxFLFxuICAgICAgcGF5bG9hZDogeyBtZW50aW9uaW5nc0ZvY3VzZWRJblRhYmxlIH0sXG4gICAgICBtZXRhOiBudWxsXG4gICAgfVxuICB9XG5cblxuICAvLyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vICAqICBNZXRob2RzIHRvIG1hbmFnZSBlbmFibGluZyBhbmQgZGlzYWJsaW5nIGEgY2xhc3MgZm9yIHRoZSBwcm9qZWN0XG4gIC8vICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIHN0YXRpYyByZWFkb25seSBVUFNFUlRfQ0xBU1NfUFJPSl9SRUwgPSAnQWN0aXZlUHJvamVjdDo6VVBTRVJUX0NMQVNTX1BST0pfUkVMJztcbiAgLy8gc3RhdGljIHJlYWRvbmx5IFVQU0VSVF9DTEFTU19QUk9KX1JFTF9TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6VVBTRVJUX0NMQVNTX1BST0pfUkVMX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyByZWFkb25seSBVUFNFUlRfQ0xBU1NfUFJPSl9SRUxfRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OlVQU0VSVF9DTEFTU19QUk9KX1JFTF9GQUlMRUQnO1xuXG4gIC8vIHVwc2VydENsYXNzUHJvalJlbCA9IChwcm9qUmVsOiBQcm9EZmhDbGFzc1Byb2pSZWwsIGRmaF9wa19jbGFzczogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiA9PiAoe1xuICAvLyAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlVQU0VSVF9DTEFTU19QUk9KX1JFTCxcbiAgLy8gICBtZXRhOiB7IHByb2pSZWwsIGRmaF9wa19jbGFzcyB9LFxuICAvLyAgIHBheWxvYWQ6IG51bGwsXG4gIC8vIH0pO1xuXG4gIC8vIHVwc2VydENsYXNzUHJvalJlbFN1Y2NlZWRlZCA9IChwcm9qUmVsOiBQcm9EZmhDbGFzc1Byb2pSZWwsIGRmaF9wa19jbGFzczogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiA9PiAoe1xuICAvLyAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlVQU0VSVF9DTEFTU19QUk9KX1JFTF9TVUNDRUVERUQsXG4gIC8vICAgbWV0YTogeyBwcm9qUmVsLCBkZmhfcGtfY2xhc3MgfSxcbiAgLy8gICBwYXlsb2FkOiBudWxsXG4gIC8vIH0pXG5cbiAgLy8gdXBzZXJ0Q2xhc3NQcm9qUmVsRmFpbGVkID0gKGVycm9yLCBkZmhfcGtfY2xhc3M6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24gPT4gKHtcbiAgLy8gICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5VUFNFUlRfQ0xBU1NfUFJPSl9SRUxfRkFJTEVELFxuICAvLyAgIG1ldGE6IHsgZGZoX3BrX2NsYXNzIH0sXG4gIC8vICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICBlcnJvcixcbiAgLy8gfSlcblxuXG4gIC8vIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gICogIE1ldGhvZHMgdG8gbWFuYWdlIGVuYWJsaW5nIGFuZCBkaXNhYmxpbmcgYW4gZW50aXR5IGZvciB0aGUgcHJvamVjdFxuICAvLyAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgVVBTRVJUX0VOVElUWV9QUk9KX1JFTCA9ICdBY3RpdmVQcm9qZWN0OjpVUFNFUlRfRU5USVRZX1BST0pfUkVMJztcbiAgLy8gc3RhdGljIHJlYWRvbmx5IFVQU0VSVF9FTlRJVFlfUFJPSl9SRUxfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OlVQU0VSVF9FTlRJVFlfUFJPSl9SRUxfU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIHJlYWRvbmx5IFVQU0VSVF9FTlRJVFlfUFJPSl9SRUxfRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OlVQU0VSVF9FTlRJVFlfUFJPSl9SRUxfRkFJTEVEJztcblxuICAvLyB1cHNlcnRFbnRpdHlQcm9qUmVsID0gKGluZlByb2pSZWw6IFByb0luZm9Qcm9qUmVsKTogQWN0aXZlUHJvamVjdEFjdGlvbiA9PiAoe1xuICAvLyAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlVQU0VSVF9FTlRJVFlfUFJPSl9SRUwsXG4gIC8vICAgbWV0YTogeyBpbmZQcm9qUmVsIH0sXG4gIC8vICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gfSk7XG5cbiAgLy8gdXBzZXJ0RW50aXR5UHJvalJlbFN1Y2NlZWRlZCA9IChpbmZQcm9qUmVsOiBQcm9JbmZvUHJvalJlbCk6IEFjdGl2ZVByb2plY3RBY3Rpb24gPT4gKHtcbiAgLy8gICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5VUFNFUlRfRU5USVRZX1BST0pfUkVMX1NVQ0NFRURFRCxcbiAgLy8gICBtZXRhOiB7IGluZlByb2pSZWwgfSxcbiAgLy8gICBwYXlsb2FkOiBudWxsXG4gIC8vIH0pXG5cbiAgLy8gdXBzZXJ0RW50aXR5UHJvalJlbEZhaWxlZCA9IChlcnJvcik6IEFjdGl2ZVByb2plY3RBY3Rpb24gPT4gKHtcbiAgLy8gICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5VUFNFUlRfRU5USVRZX1BST0pfUkVMX0ZBSUxFRCxcbiAgLy8gICBtZXRhOiBudWxsLFxuICAvLyAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgZXJyb3IsXG4gIC8vIH0pXG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIERlc3Ryb3kgdGhlIGFjdGl2ZSBwcm9qZWN0IHN0YXRlIChvbiBjbG9zaW5nIGEgcHJvamVjdClcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICBzdGF0aWMgREVTVFJPWSA9ICdBY3RpdmVQcm9qZWN0OjpERVNUUk9ZJztcbiAgZGVzdHJveSgpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuREVTVFJPWSxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiBudWxsLFxuICAgIH1cbiAgfVxufVxuIl19