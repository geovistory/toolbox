/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/actions/active-project.action.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtZ3VpL2FjdGlvbnMvYWN0aXZlLXByb2plY3QuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUszQyx1Q0F5Q0M7OztJQXZDQywyQ0FBZ0M7O0lBRWhDLHVDQUFvQjs7SUFDcEIsc0NBQW1COztJQUNuQix3Q0FBdUI7O0lBQ3ZCLHVDQUFxQjs7SUFDckIsMENBQXVCOztJQUN2QiwyQ0FBd0I7O0lBR3hCLGtDQUFnQjs7SUFDaEIsdUNBQWdDOztJQUNoQyx1Q0FBZ0M7O0lBQ2hDLGtDQUFrQjs7SUFHbEIsb0NBQTZCOztJQUM3Qix5Q0FBc0I7O0lBSXRCLHVDQUE0Qjs7SUFHNUIsbUNBQWlCOztJQUNqQixpQ0FBZ0I7O0lBQ2hCLHVDQUFvQjs7SUFDcEIsd0NBQXFCOztJQUNyQixxQ0FBa0I7O0lBQ2xCLHVDQUFvQjs7SUFDcEIseUNBQXNCOztJQUN0QiwrQ0FBMkI7O0lBQzNCLDhDQUEwQjs7SUFDMUIsNkNBQXlCOztJQUN6Qiw0Q0FBd0I7O0lBQ3hCLGdDQUFvQjs7QUFJckIsQ0FBQztBQU1GLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBYy9CLGlCQUFpQixDQUFDLFVBQWtCO1FBQ2xDLE9BQU87WUFDTCxJQUFJLEVBQUUsb0JBQW9CLENBQUMsbUJBQW1CO1lBQzlDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFO2dCQUNKLFVBQVU7YUFDWDtTQUNGLENBQUE7SUFDSCxDQUFDOzs7OztJQUVELDBCQUEwQixDQUFDLGNBQThCO1FBQ3ZELE9BQU87WUFDTCxJQUFJLEVBQUUsb0JBQW9CLENBQUMsNkJBQTZCO1lBQ3hELE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFF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SUE0Q3RGLG1DQUFzRDs7SUFZdEQsZ0NBQWdEOztJQVVoRCxrQ0FBb0Q7O0lBV3BELDhCQUE0Qzs7SUFXNUMsK0JBQThDOztJQVc5Qyw2QkFBMEM7O0lBUzFDLGlDQUFrRDs7SUFTbEQsaUNBQWtEOztJQVVsRCxpQ0FBa0Q7Ozs7Ozs7SUFvWWxELDJDQUFzRTs7SUFDdEUsd0NBQWdFOztJQUNoRSw2Q0FBMEU7Ozs7Ozs7SUE4QjFFLHFEQUEwRjs7SUFDMUYsc0RBQTRGOzs7Ozs7O0lBNEU1Riw2QkFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRDaHVuaywgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlRlbXBvcmFsRW50aXR5LCBQcm9EZmhDbGFzc1Byb2pSZWwsIFByb0luZm9Qcm9qUmVsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IExpc3RUeXBlLCBQYW5lbCwgUHJvamVjdERldGFpbCwgUHJvamVjdFByZXZpZXcsIFBhbmVsVGFiLCBUeXBlUGVJdCB9IGZyb20gJy4uL21vZGVscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aXZlUHJvamVjdE1ldGEge1xuXG4gIHByb2plY3RQcmV2aWV3PzogUHJvamVjdFByZXZpZXc7XG5cbiAgcGtfcHJvamVjdD86IG51bWJlcjtcbiAgcGtfZW50aXR5PzogbnVtYmVyO1xuICBwa19lbnRpdGllcz86IG51bWJlcltdO1xuICBwa19jbGFzc2VzPzogbnVtYmVyW11cbiAgcGtfdWlfY29udGV4dD86IG51bWJlcjtcbiAgZW50aXR5X3ZlcnNpb24/OiBudW1iZXI7XG5cblxuICBjaHVuaz86IERhdENodW5rXG4gIHRlRW5HcmFwaHM/OiBJbmZUZW1wb3JhbEVudGl0eVtdXG4gIHBlSXRHcmFwaHM/OiBJbmZQZXJzaXN0ZW50SXRlbVtdXG4gIHR5cGVzPzogVHlwZVBlSXRbXVxuXG4gIC8vIENSTSBhbmQgQ29uZmlnXG4gIHByb2pSZWw/OiBQcm9EZmhDbGFzc1Byb2pSZWw7XG4gIGRmaF9wa19jbGFzcz86IG51bWJlcjtcbiAgLy8gaGFzVHlwZVByb3BlcnRpZXM/OiBIYXNUeXBlUHJvcGVydHlSZWFkYWJsZVtdXG5cbiAgLy8gSW5mb3JtYXRpb25cbiAgaW5mUHJvalJlbD86IFByb0luZm9Qcm9qUmVsO1xuXG4gIC8vIGxheW91dFxuICBwYW5lbHM/OiBQYW5lbFtdO1xuICBsaXN0PzogTGlzdFR5cGU7XG4gIHBhbmVsSW5kZXg/OiBudW1iZXI7XG4gIHBhbmVsU2VyaWFsPzogbnVtYmVyO1xuICB0YWJJbmRleD86IG51bWJlcjtcbiAgdWlJZFNlcmlhbD86IG51bWJlcjtcbiAgZm9jdXNlZFBhbmVsPzogbnVtYmVyO1xuICBwcmV2aW91c1BhbmVsSW5kZXg/OiBudW1iZXJcbiAgY3VycmVudFBhbmVsSW5kZXg/OiBudW1iZXJcbiAgcHJldmlvdXNUYWJJbmRleD86IG51bWJlclxuICBjdXJyZW50VGFiSW5kZXg/OiBudW1iZXJcbiAgdGFiPzogUGFuZWxUYWI8YW55PjtcblxuICAvLyBMYXlvdXQgTW9kYWxzXG4gIC8vIGNyZWF0ZU9yQWRkRW50aXR5PzogQ3JlYXRlT3JBZGRFbnRpdHk7IC8vIENoZWNrIGlmIHRoaXMgcmVhbGx5IGJlbG9uZ3QgaW4gc3RhdGVcbn07XG50eXBlIFBheWxvYWQgPSBQcm9qZWN0RGV0YWlsO1xuZXhwb3J0IHR5cGUgQWN0aXZlUHJvamVjdEFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBBY3RpdmVQcm9qZWN0TWV0YT47XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjdGl2ZVByb2plY3RBY3Rpb25zIHtcblxuICAvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIENSTSBhbmQgQ29uZmlnIChtZXRhZGF0YSwgY3JtKVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIHN0YXRpYyBMT0FEX1BST0pFQ1RfQkFTSUNTID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUFJPSkVDVF9CQVNJQ1MnO1xuICBzdGF0aWMgTE9BRF9QUk9KRUNUX0JBU0lDU19GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9QUk9KRUNUX0JBU0lDU19GQUlMRUQnO1xuICBzdGF0aWMgTE9BRF9QUk9KRUNUX0JBU0lDU19TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9QUk9KRUNUX0JBU0lDU19TVUNDRUVERUQnO1xuICBzdGF0aWMgTE9BRF9QUk9KRUNUX0NPTkZJRyA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1BST0pFQ1RfQ09ORklHJztcbiAgc3RhdGljIExPQURfUFJPSkVDVF9DT05GSUdfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUFJPSkVDVF9DT05GSUdfU1VDQ0VFREVEJztcblxuXG4gIGxvYWRQcm9qZWN0QmFzaWNzKHBrX3Byb2plY3Q6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQkFTSUNTLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgcGtfcHJvamVjdFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxvYWRQcm9qZWN0QmFzaXNjc1N1Y2NlZGVkKHByb2plY3RQcmV2aWV3OiBQcm9qZWN0UHJldmlldyk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQkFTSUNTX1NVQ0NFRURFRCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IHByb2plY3RQcmV2aWV3IH0sXG4gICAgfVxuICB9XG5cbiAgbG9hZFByb2plY3RDb25maWcocGtfcHJvamVjdDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9DT05GSUcsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YToge1xuICAgICAgICBwa19wcm9qZWN0XG4gICAgICB9LFxuICAgIH1cbiAgfVxuXG4gIGxvYWRQcm9qZWN0Q29uZmlnU3VjY2VlZGVkKCk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQ09ORklHX1NVQ0NFRURFRCxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgLy8gY3JtXG4gICAgICB9LFxuICAgICAgbWV0YTogbnVsbCxcbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIExheW91dCAtLSBUYWJzXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgc3RhdGljIFNFVF9MSVNUX1RZUEUgPSAnQWN0aXZlUHJvamVjdDo6U0VUX0xJU1RfVFlQRSc7XG5cbiAgc2V0TGlzdFR5cGUobGlzdDogTGlzdFR5cGUpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX0xJU1RfVFlQRSxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7XG4gICAgICAgIGxpc3RcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgU0VUX1BBTkVMUyA9ICdBY3RpdmVQcm9qZWN0OjpTRVRfUEFORUxTJztcblxuICBzZXRQYW5lbHMocGFuZWxzOiBQYW5lbFtdLCB1aUlkU2VyaWFsOiBudW1iZXIsIHBhbmVsU2VyaWFsOiBudW1iZXIsIGZvY3VzZWRQYW5lbDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9QQU5FTFMsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBwYW5lbHMsIHVpSWRTZXJpYWwsIHBhbmVsU2VyaWFsLCBmb2N1c2VkUGFuZWwgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBBQ1RJVkFURV9UQUIgPSAnQWN0aXZlUHJvamVjdDo6QUNUSVZBVEVfVEFCJztcblxuICBhY3RpdmF0ZVRhYihwYW5lbEluZGV4OiBudW1iZXIsIHRhYkluZGV4OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuQUNUSVZBVEVfVEFCLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgcGFuZWxJbmRleCwgdGFiSW5kZXhcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc3RhdGljIE1PVkVfVEFCID0gJ0FjdGl2ZVByb2plY3Q6Ok1PVkVfVEFCJztcbiAgbW92ZVRhYihwcmV2aW91c1BhbmVsSW5kZXg6IG51bWJlciwgY3VycmVudFBhbmVsSW5kZXg6IG51bWJlciwgcHJldmlvdXNUYWJJbmRleDogbnVtYmVyLCBjdXJyZW50VGFiSW5kZXg6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5NT1ZFX1RBQixcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7XG4gICAgICAgIHByZXZpb3VzUGFuZWxJbmRleCwgY3VycmVudFBhbmVsSW5kZXgsIHByZXZpb3VzVGFiSW5kZXgsIGN1cnJlbnRUYWJJbmRleFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBDTE9TRV9UQUIgPSAnQWN0aXZlUHJvamVjdDo6Q0xPU0VfVEFCJztcbiAgY2xvc2VUYWIocGFuZWxJbmRleDogbnVtYmVyLCB0YWJJbmRleDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1RBQixcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7XG4gICAgICAgIHBhbmVsSW5kZXgsIHRhYkluZGV4XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIEFERF9UQUIgPSAnQWN0aXZlUHJvamVjdDo6QUREX1RBQic7XG4gIGFkZFRhYjxUYWJEYXRhPih0YWI6IFBhbmVsVGFiPFRhYkRhdGE+KTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkFERF9UQUIsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyB0YWIgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBTUExJVF9QQU5FTCA9ICdBY3RpdmVQcm9qZWN0OjpTUExJVF9QQU5FTCc7XG4gIHNwbGl0UGFuZWwocHJldmlvdXNQYW5lbEluZGV4OiBudW1iZXIsIHRhYkluZGV4OiBudW1iZXIsIGN1cnJlbnRQYW5lbEluZGV4OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuU1BMSVRfUEFORUwsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBwcmV2aW91c1BhbmVsSW5kZXgsIHRhYkluZGV4LCBjdXJyZW50UGFuZWxJbmRleCB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIENMT1NFX1BBTkVMID0gJ0FjdGl2ZVByb2plY3Q6OkNMT1NFX1BBTkVMJztcbiAgY2xvc2VQYW5lbChwYW5lbEluZGV4OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuQ0xPU0VfUEFORUwsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBwYW5lbEluZGV4IH1cbiAgICB9XG4gIH1cblxuXG4gIHN0YXRpYyBGT0NVU19QQU5FTCA9ICdBY3RpdmVQcm9qZWN0OjpGT0NVU19QQU5FTCc7XG4gIGZvY3VzUGFuZWwocGFuZWxJbmRleDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkZPQ1VTX1BBTkVMLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgcGFuZWxJbmRleCB9XG4gICAgfVxuICB9XG5cblxuICAvLyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vICAqIExheW91dCAtLSBNb2RhbHNcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyAvLyBjcmVhdGUgb3IgYWRkIGVudGl0eSBtb2RhbFxuICAvLyBzdGF0aWMgcmVhZG9ubHkgT1BFTl9BRERfRk9STSA9ICdBY3RpdmVQcm9qZWN0OjpPUEVOX0FERF9GT1JNJztcbiAgLy8gc3RhdGljIHJlYWRvbmx5IENMT1NFX0FERF9GT1JNID0gJ0FjdGl2ZVByb2plY3Q6OkNMT1NFX0FERF9GT1JNJztcblxuICAvLyBvcGVuQWRkRm9ybSA9IChjcmVhdGVPckFkZEVudGl0eTogQ3JlYXRlT3JBZGRFbnRpdHkpOiBBY3RpdmVQcm9qZWN0QWN0aW9uID0+ICh7XG4gIC8vICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuT1BFTl9BRERfRk9STSxcbiAgLy8gICBtZXRhOiB7IGNyZWF0ZU9yQWRkRW50aXR5IH0sXG4gIC8vICAgcGF5bG9hZDogbnVsbFxuICAvLyB9KVxuXG4gIC8vIGNsb3NlQWRkRm9ybSA9ICgpOiBBY3RpdmVQcm9qZWN0QWN0aW9uID0+ICh7XG4gIC8vICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuQ0xPU0VfQUREX0ZPUk0sXG4gIC8vICAgbWV0YTogbnVsbCxcbiAgLy8gICBwYXlsb2FkOiBudWxsXG4gIC8vIH0pXG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICogSW5mb3JtYXRpb24gY2FjaGVcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8vIEVudGl0eVByZXZpZXdzXG4gIC8vIHN0YXRpYyBMT0FEX0VOVElUWV9QUkVWSUVXID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfRU5USVRZX1BSRVZJRVcnO1xuICAvLyBzdGF0aWMgTE9BRF9FTlRJVFlfUFJFVklFV19TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9FTlRJVFlfUFJFVklFV19TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgTE9BRF9FTlRJVFlfUFJFVklFV19GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9FTlRJVFlfUFJFVklFV19GQUlMRUQnO1xuXG5cbiAgLy8gbG9hZEVudGl0eVByZXZpZXcocGtfcHJvamVjdDogbnVtYmVyLCBwa19lbnRpdHk6IG51bWJlciwgcGtfdWlfY29udGV4dDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfRU5USVRZX1BSRVZJRVcsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwa19wcm9qZWN0LCBwa19lbnRpdHksIHBrX3VpX2NvbnRleHRcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkRW50aXR5UHJldmlld1N1Y2NlZWRlZChlbnRpdHlQcmV2aWV3OiBFbnRpdHlQcmV2aWV3KTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfRU5USVRZX1BSRVZJRVdfU1VDQ0VFREVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgZW50aXR5UHJldmlld1xuICAvLyAgICAgfSxcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkRW50aXR5UHJldmlld0ZhaWxlZChlcnJvcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX0VOVElUWV9QUkVWSUVXX0ZBSUxFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiBudWxsLFxuICAvLyAgICAgZXJyb3JcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyAvLyBFbnRpdHlQcmV2aWV3c1xuICAvLyBzdGF0aWMgTE9BRF9UWVBFUyA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1RZUEVTJztcbiAgLy8gc3RhdGljIExPQURfVFlQRVNfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVFlQRVNfU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIExPQURfVFlQRVNfRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVFlQRVNfRkFJTEVEJztcbiAgLy8gbG9hZFR5cGVzKHBrX3Byb2plY3Q6IG51bWJlciwgcGtfY2xhc3NlczogbnVtYmVyW10pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9UWVBFUyxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBrX3Byb2plY3QsIHBrX2NsYXNzZXNcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkVHlwZXNTdWNjZWVkZWQodHlwZXM6IFR5cGVQZUl0W10sIHBrX2NsYXNzZXM6IG51bWJlcltdKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVFlQRVNfU1VDQ0VFREVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgdHlwZXMsIHBrX2NsYXNzZXNcbiAgLy8gICAgIH0sXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFR5cGVzRmFpbGVkKGVycm9yKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVFlQRVNfRkFJTEVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IG51bGwsXG4gIC8vICAgICBlcnJvclxuICAvLyAgIH1cbiAgLy8gfVxuXG5cblxuICAvLyAvLyBFbnRpdGllcyBEZXRhaWxzIGZvciBkaXNwbGF5IGluIE1vZGFsc1xuICAvLyBzdGF0aWMgTE9BRF9FTlRJVFlfREVUQUlMX0ZPUl9NT0RBTCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX0VOVElUWV9ERVRBSUxfRk9SX01PREFMJztcbiAgLy8gc3RhdGljIExPQURfUEVfSVRfREVUQUlMX0ZPUl9NT0RBTF9TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9QRV9JVF9ERVRBSUxfRk9SX01PREFMX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyBMT0FEX1RFX0VOX0RFVEFJTF9GT1JfTU9EQUxfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVEVfRU5fREVUQUlMX0ZPUl9NT0RBTF9TVUNDRUVERUQnOyAvLyBUT0RPOiBJbXBsZW1lbnQgYWN0aW9uL3JlZHVjZXJcbiAgLy8gc3RhdGljIExPQURfRU5USVRZX0RFVEFJTF9GT1JfTU9EQUxfRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfRU5USVRZX0RFVEFJTF9GT1JfTU9EQUxfRkFJTEVEJztcblxuICAvLyBsb2FkRW50aXR5RGV0YWlsRm9yTW9kYWwocGtfcHJvamVjdDogbnVtYmVyLCBwa19lbnRpdHk6IG51bWJlciwgcGtfdWlfY29udGV4dDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfRU5USVRZX0RFVEFJTF9GT1JfTU9EQUwsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwa19wcm9qZWN0LCBwa19lbnRpdHksIHBrX3VpX2NvbnRleHRcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkUGVJdERldGFpbHNGb3JNb2RhbFN1Y2NlZWRlZChwZUl0RGV0YWlsOiBFbnRpdHlEZXRhaWwpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QRV9JVF9ERVRBSUxfRk9SX01PREFMX1NVQ0NFRURFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBlSXREZXRhaWxcbiAgLy8gICAgIH0sXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hRW50aXR5dERldGFpbHNGb3JNb2RhbEZhaWxlZChlcnJvcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX0VOVElUWV9ERVRBSUxfRk9SX01PREFMX0ZBSUxFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiBudWxsLFxuICAvLyAgICAgZXJyb3JcbiAgLy8gICB9XG4gIC8vIH1cblxuXG4gIC8vIC8vIENodW5rc1xuICAvLyBzdGF0aWMgTE9BRF9DSFVOSyA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX0NIVU5LJztcbiAgLy8gc3RhdGljIExPQURfQ0hVTktfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfQ0hVTktfU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIExPQURfQ0hVTktfRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfQ0hVTktfRkFJTEVEJztcblxuICAvLyBsb2FkQ2h1bmsocGtfcHJvamVjdDogbnVtYmVyLCBwa19lbnRpdHk6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX0NIVU5LLFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGtfcHJvamVjdCwgcGtfZW50aXR5XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZENodW5rU3VjY2VlZGVkKGNodW5rOiBEYXRDaHVuayk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX0NIVU5LX1NVQ0NFRURFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIGNodW5rXG4gIC8vICAgICB9LFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRDaHVua0ZhaWxlZChlcnJvcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX0NIVU5LX0ZBSUxFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiBudWxsLFxuICAvLyAgICAgZXJyb3JcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyAvLyBQZUl0IEdyYXBoc1xuICAvLyBzdGF0aWMgTE9BRF9QRUlUX0dSQVBIUyA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1BFSVRfR1JBUEhTJztcbiAgLy8gc3RhdGljIExPQURfUEVJVF9HUkFQSFNfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUEVJVF9HUkFQSFNfU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIExPQURfUEVJVF9HUkFQSFNfRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUEVJVF9HUkFQSFNfRkFJTEVEJztcblxuXG4gIC8vIGxvYWRQZUl0R3JhcGhzKHBrX3Byb2plY3Q6IG51bWJlciwgcGtfZW50aXRpZXM6IG51bWJlcltdKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUEVJVF9HUkFQSFMsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwa19wcm9qZWN0LCBwa19lbnRpdGllc1xuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRQZUl0R3JhcGhzU3VjY2VlZGVkKHBlSXRHcmFwaHM6IEluZlBlcnNpc3RlbnRJdGVtW10pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QRUlUX0dSQVBIU19TVUNDRUVERUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwZUl0R3JhcGhzXG4gIC8vICAgICB9LFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRQZUl0R3JhcGhzRmFpbGVkKGVycm9yKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUEVJVF9HUkFQSFNfRkFJTEVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IG51bGwsXG4gIC8vICAgICBlcnJvclxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIC8vIFRlRW4gR3JhcGhzXG4gIC8vIHN0YXRpYyBMT0FEX1RFRU5fR1JBUEhTID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVEVFTl9HUkFQSFMnO1xuICAvLyBzdGF0aWMgTE9BRF9URUVOX0dSQVBIU19TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9URUVOX0dSQVBIU19TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgTE9BRF9URUVOX0dSQVBIU19GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9URUVOX0dSQVBIU19GQUlMRUQnO1xuXG4gIC8vIGxvYWRUZUVuR3JhcGhzKHBrX3Byb2plY3Q6IG51bWJlciwgcGtfZW50aXRpZXM6IG51bWJlcltdKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVEVFTl9HUkFQSFMsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwa19wcm9qZWN0LCBwa19lbnRpdGllc1xuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRUZUVuR3JhcGhzU3VjY2VlZGVkKHRlRW5HcmFwaHM6IEluZlRlbXBvcmFsRW50aXR5W10pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9URUVOX0dSQVBIU19TVUNDRUVERUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICB0ZUVuR3JhcGhzXG4gIC8vICAgICB9LFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRUZUVuR3JhcGhzRmFpbGVkKGVycm9yKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVEVFTl9HUkFQSFNfRkFJTEVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IG51bGwsXG4gIC8vICAgICBlcnJvclxuICAvLyAgIH1cbiAgLy8gfVxuXG5cbiAgLy8gLy8gUXVlcmllc1xuICAvLyBzdGF0aWMgTE9BRF9RVUVSSUVTID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUVVFUklFUyc7XG4gIC8vIHN0YXRpYyBMT0FEX1FVRVJJRVNfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUVVFUklFU19TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgTE9BRF9RVUVSSUVTX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1FVRVJJRVNfRkFJTEVEJztcblxuICAvLyBsb2FkUXVlcmllcyhwa19wcm9qZWN0OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9RVUVSSUVTLFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGtfcHJvamVjdFxuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRRdWVyaWVzU3VjY2VlZGVkKGNvbVF1ZXJ5QXJyYXk6IENvbVF1ZXJ5VltdKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUVVFUklFU19TVUNDRUVERUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBjb21RdWVyeUFycmF5XG4gIC8vICAgICB9LFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRRdWVyaWVzRmFpbGVkKGVycm9yKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUVVFUklFU19GQUlMRUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YTogbnVsbCxcbiAgLy8gICAgIGVycm9yXG4gIC8vICAgfVxuICAvLyB9XG5cblxuICAvLyAvLyBRdWVyeSBWZXJzaW9uXG4gIC8vIHN0YXRpYyBMT0FEX1FVRVJZX1ZFUlNJT04gPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9RVUVSWV9WRVJTSU9OJztcbiAgLy8gc3RhdGljIExPQURfUVVFUllfVkVSU0lPTl9TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9RVUVSWV9WRVJTSU9OX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyBMT0FEX1FVRVJZX1ZFUlNJT05fRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUVVFUllfVkVSU0lPTl9GQUlMRUQnO1xuXG4gIC8vIGxvYWRRdWVyeVZlcnNpb24ocGtfcHJvamVjdDogbnVtYmVyLCBwa19lbnRpdHk6IG51bWJlciwgZW50aXR5X3ZlcnNpb246IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1FVRVJZX1ZFUlNJT04sXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwa19wcm9qZWN0LCBwa19lbnRpdHksIGVudGl0eV92ZXJzaW9uXG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFF1ZXJ5VmVyc2lvblN1Y2NlZWRlZChjb21RdWVyeTogUHJvUXVlcnkpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9RVUVSWV9WRVJTSU9OX1NVQ0NFRURFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIGNvbVF1ZXJ5XG4gIC8vICAgICB9LFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRRdWVyeVZlcnNpb25GYWlsZWQoZXJyb3IpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9RVUVSWV9WRVJTSU9OX0ZBSUxFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiBudWxsLFxuICAvLyAgICAgZXJyb3JcbiAgLy8gICB9XG4gIC8vIH1cblxuXG5cbiAgLy8gLy8gVmlzdWFsc1xuICAvLyBzdGF0aWMgTE9BRF9WSVNVQUxTID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVklTVUFMUyc7XG4gIC8vIHN0YXRpYyBMT0FEX1ZJU1VBTFNfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVklTVUFMU19TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgTE9BRF9WSVNVQUxTX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1ZJU1VBTFNfRkFJTEVEJztcblxuICAvLyBsb2FkVmlzdWFscyhwa19wcm9qZWN0OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9WSVNVQUxTLFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGtfcHJvamVjdFxuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRWaXN1YWxzU3VjY2VlZGVkKGNvbVZpc3VhbEFycmF5OiBDb21WaXN1YWxWW10pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9WSVNVQUxTX1NVQ0NFRURFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIGNvbVZpc3VhbEFycmF5XG4gIC8vICAgICB9LFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRWaXN1YWxzRmFpbGVkKGVycm9yKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVklTVUFMU19GQUlMRUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YTogbnVsbCxcbiAgLy8gICAgIGVycm9yXG4gIC8vICAgfVxuICAvLyB9XG4gIC8vIC8vIFZpc3VhbCBWZXJzaW9uXG4gIC8vIHN0YXRpYyBMT0FEX1ZJU1VBTF9WRVJTSU9OID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVklTVUFMX1ZFUlNJT04nO1xuICAvLyBzdGF0aWMgTE9BRF9WSVNVQUxfVkVSU0lPTl9TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9WSVNVQUxfVkVSU0lPTl9TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgTE9BRF9WSVNVQUxfVkVSU0lPTl9GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9WSVNVQUxfVkVSU0lPTl9GQUlMRUQnO1xuXG4gIC8vIGxvYWRWaXN1YWxWZXJzaW9uKHBrX3Byb2plY3Q6IG51bWJlciwgcGtfZW50aXR5OiBudW1iZXIsIGVudGl0eV92ZXJzaW9uPzogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVklTVUFMX1ZFUlNJT04sXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwa19wcm9qZWN0LCBwa19lbnRpdHksIGVudGl0eV92ZXJzaW9uXG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFZpc3VhbFZlcnNpb25TdWNjZWVkZWQoY29tVmlzdWFsQXJyYXk6IENvbVZpc3VhbFZbXSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1ZJU1VBTF9WRVJTSU9OX1NVQ0NFRURFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIGNvbVZpc3VhbEFycmF5XG4gIC8vICAgICB9LFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRWaXN1YWxWZXJzaW9uRmFpbGVkKGVycm9yKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVklTVUFMX1ZFUlNJT05fRkFJTEVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IG51bGwsXG4gIC8vICAgICBlcnJvclxuICAvLyAgIH1cbiAgLy8gfVxuXG5cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogIFRoaW5ncyBmb3IgTWVudGlvbmluZ3MgLyBBbm5vdGF0aW9uc1xuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIHN0YXRpYyBVUERBVEVfU0VMRUNURURfQ0hVTksgPSAnQWN0aXZlUHJvamVjdDo6VVBEQVRFX1NFTEVDVEVEX0NIVU5LJztcbiAgc3RhdGljIFNFVF9SRUZJTklOR19DSFVOSyA9ICdBY3RpdmVQcm9qZWN0OjpTRVRfUkVGSU5JTkdfQ0hVTksnO1xuICBzdGF0aWMgU0VUX0NSRUFUSU5HX01FTlRJT05JTkcgPSAnQWN0aXZlUHJvamVjdDo6U0VUX0NSRUFUSU5HX01FTlRJT05JTkcnO1xuXG5cbiAgLy8gdXBkYXRlU2VsZWN0ZWRDaHVuayhzZWxlY3RlZENodW5rOiBEYXRDaHVuayk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5VUERBVEVfU0VMRUNURURfQ0hVTkssXG4gIC8vICAgICBwYXlsb2FkOiB7IHNlbGVjdGVkQ2h1bmsgfSxcbiAgLy8gICAgIG1ldGE6IG51bGxcbiAgLy8gICB9XG4gIC8vIH1cblxuICBzZXRSZWZpbmluZ0NodW5rKHJlZmluaW5nQ2h1bms6IGJvb2xlYW4pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX1JFRklOSU5HX0NIVU5LLFxuICAgICAgcGF5bG9hZDogeyByZWZpbmluZ0NodW5rIH0sXG4gICAgICBtZXRhOiBudWxsXG4gICAgfVxuICB9XG5cbiAgc2V0Q3JlYXRpbmdNZW50aW9uaW5nKGNyZWF0aW5nTWVudGlvbmluZzogYm9vbGVhbik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfQ1JFQVRJTkdfTUVOVElPTklORyxcbiAgICAgIHBheWxvYWQ6IHsgY3JlYXRpbmdNZW50aW9uaW5nIH0sXG4gICAgICBtZXRhOiBudWxsXG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAqIEhpZ2hsaWdodGluZyBvZiBtZW50aW9uaW5ncyBpbiB0aGUgZ3VpXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgc3RhdGljIFNFVF9NRU5USU9OSU5HU19GT0NVU0VEX0lOX1RFWFQgPSAnQWN0aXZlUHJvamVjdDo6U0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEVYVCc7XG4gIHN0YXRpYyBTRVRfTUVOVElPTklOR1NfRk9DVVNFRF9JTl9UQUJMRSA9ICdBY3RpdmVQcm9qZWN0OjpTRVRfTUVOVElPTklOR1NfRk9DVVNFRF9JTl9UQUJMRSc7XG5cbiAgc2V0TWVudGlvbmluZ3NGb2N1c2VkSW5UZXh0KG1lbnRpb25pbmdzRm9jdXNlZEluVGV4dDogbnVtYmVyW10pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEVYVCxcbiAgICAgIHBheWxvYWQ6IHsgbWVudGlvbmluZ3NGb2N1c2VkSW5UZXh0IH0sXG4gICAgICBtZXRhOiBudWxsXG4gICAgfVxuICB9XG5cbiAgc2V0TWVudGlvbmluZ3NGb2N1c2VkSW5UYWJsZShtZW50aW9uaW5nc0ZvY3VzZWRJblRhYmxlOiBudW1iZXJbXSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfTUVOVElPTklOR1NfRk9DVVNFRF9JTl9UQUJMRSxcbiAgICAgIHBheWxvYWQ6IHsgbWVudGlvbmluZ3NGb2N1c2VkSW5UYWJsZSB9LFxuICAgICAgbWV0YTogbnVsbFxuICAgIH1cbiAgfVxuXG5cbiAgLy8gLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyAgKiAgTWV0aG9kcyB0byBtYW5hZ2UgZW5hYmxpbmcgYW5kIGRpc2FibGluZyBhIGNsYXNzIGZvciB0aGUgcHJvamVjdFxuICAvLyAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgVVBTRVJUX0NMQVNTX1BST0pfUkVMID0gJ0FjdGl2ZVByb2plY3Q6OlVQU0VSVF9DTEFTU19QUk9KX1JFTCc7XG4gIC8vIHN0YXRpYyByZWFkb25seSBVUFNFUlRfQ0xBU1NfUFJPSl9SRUxfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OlVQU0VSVF9DTEFTU19QUk9KX1JFTF9TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgVVBTRVJUX0NMQVNTX1BST0pfUkVMX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpVUFNFUlRfQ0xBU1NfUFJPSl9SRUxfRkFJTEVEJztcblxuICAvLyB1cHNlcnRDbGFzc1Byb2pSZWwgPSAocHJvalJlbDogUHJvRGZoQ2xhc3NQcm9qUmVsLCBkZmhfcGtfY2xhc3M6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24gPT4gKHtcbiAgLy8gICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5VUFNFUlRfQ0xBU1NfUFJPSl9SRUwsXG4gIC8vICAgbWV0YTogeyBwcm9qUmVsLCBkZmhfcGtfY2xhc3MgfSxcbiAgLy8gICBwYXlsb2FkOiBudWxsLFxuICAvLyB9KTtcblxuICAvLyB1cHNlcnRDbGFzc1Byb2pSZWxTdWNjZWVkZWQgPSAocHJvalJlbDogUHJvRGZoQ2xhc3NQcm9qUmVsLCBkZmhfcGtfY2xhc3M6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24gPT4gKHtcbiAgLy8gICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5VUFNFUlRfQ0xBU1NfUFJPSl9SRUxfU1VDQ0VFREVELFxuICAvLyAgIG1ldGE6IHsgcHJvalJlbCwgZGZoX3BrX2NsYXNzIH0sXG4gIC8vICAgcGF5bG9hZDogbnVsbFxuICAvLyB9KVxuXG4gIC8vIHVwc2VydENsYXNzUHJvalJlbEZhaWxlZCA9IChlcnJvciwgZGZoX3BrX2NsYXNzOiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uID0+ICh7XG4gIC8vICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuVVBTRVJUX0NMQVNTX1BST0pfUkVMX0ZBSUxFRCxcbiAgLy8gICBtZXRhOiB7IGRmaF9wa19jbGFzcyB9LFxuICAvLyAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgZXJyb3IsXG4gIC8vIH0pXG5cblxuICAvLyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vICAqICBNZXRob2RzIHRvIG1hbmFnZSBlbmFibGluZyBhbmQgZGlzYWJsaW5nIGFuIGVudGl0eSBmb3IgdGhlIHByb2plY3RcbiAgLy8gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gc3RhdGljIHJlYWRvbmx5IFVQU0VSVF9FTlRJVFlfUFJPSl9SRUwgPSAnQWN0aXZlUHJvamVjdDo6VVBTRVJUX0VOVElUWV9QUk9KX1JFTCc7XG4gIC8vIHN0YXRpYyByZWFkb25seSBVUFNFUlRfRU5USVRZX1BST0pfUkVMX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpVUFNFUlRfRU5USVRZX1BST0pfUkVMX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyByZWFkb25seSBVUFNFUlRfRU5USVRZX1BST0pfUkVMX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpVUFNFUlRfRU5USVRZX1BST0pfUkVMX0ZBSUxFRCc7XG5cbiAgLy8gdXBzZXJ0RW50aXR5UHJvalJlbCA9IChpbmZQcm9qUmVsOiBQcm9JbmZvUHJvalJlbCk6IEFjdGl2ZVByb2plY3RBY3Rpb24gPT4gKHtcbiAgLy8gICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5VUFNFUlRfRU5USVRZX1BST0pfUkVMLFxuICAvLyAgIG1ldGE6IHsgaW5mUHJvalJlbCB9LFxuICAvLyAgIHBheWxvYWQ6IG51bGwsXG4gIC8vIH0pO1xuXG4gIC8vIHVwc2VydEVudGl0eVByb2pSZWxTdWNjZWVkZWQgPSAoaW5mUHJvalJlbDogUHJvSW5mb1Byb2pSZWwpOiBBY3RpdmVQcm9qZWN0QWN0aW9uID0+ICh7XG4gIC8vICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuVVBTRVJUX0VOVElUWV9QUk9KX1JFTF9TVUNDRUVERUQsXG4gIC8vICAgbWV0YTogeyBpbmZQcm9qUmVsIH0sXG4gIC8vICAgcGF5bG9hZDogbnVsbFxuICAvLyB9KVxuXG4gIC8vIHVwc2VydEVudGl0eVByb2pSZWxGYWlsZWQgPSAoZXJyb3IpOiBBY3RpdmVQcm9qZWN0QWN0aW9uID0+ICh7XG4gIC8vICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuVVBTRVJUX0VOVElUWV9QUk9KX1JFTF9GQUlMRUQsXG4gIC8vICAgbWV0YTogbnVsbCxcbiAgLy8gICBwYXlsb2FkOiBudWxsLFxuICAvLyAgIGVycm9yLFxuICAvLyB9KVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBEZXN0cm95IHRoZSBhY3RpdmUgcHJvamVjdCBzdGF0ZSAob24gY2xvc2luZyBhIHByb2plY3QpXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgc3RhdGljIERFU1RST1kgPSAnQWN0aXZlUHJvamVjdDo6REVTVFJPWSc7XG4gIGRlc3Ryb3koKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkRFU1RST1ksXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogbnVsbCxcbiAgICB9XG4gIH1cbn1cbiJdfQ==