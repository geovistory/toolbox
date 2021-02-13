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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtZ3VpL2FjdGlvbnMvYWN0aXZlLXByb2plY3QuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUszQyx1Q0F5Q0M7OztJQXZDQywyQ0FBZ0M7O0lBRWhDLHVDQUFvQjs7SUFDcEIsc0NBQW1COztJQUNuQix3Q0FBdUI7O0lBQ3ZCLHVDQUFxQjs7SUFDckIsMENBQXVCOztJQUN2QiwyQ0FBd0I7O0lBR3hCLGtDQUFnQjs7SUFDaEIsdUNBQWdDOztJQUNoQyx1Q0FBZ0M7O0lBQ2hDLGtDQUFrQjs7SUFHbEIsb0NBQTZCOztJQUM3Qix5Q0FBc0I7O0lBSXRCLHVDQUE0Qjs7SUFHNUIsbUNBQWlCOztJQUNqQixpQ0FBZ0I7O0lBQ2hCLHVDQUFvQjs7SUFDcEIsd0NBQXFCOztJQUNyQixxQ0FBa0I7O0lBQ2xCLHVDQUFvQjs7SUFDcEIseUNBQXNCOztJQUN0QiwrQ0FBMkI7O0lBQzNCLDhDQUEwQjs7SUFDMUIsNkNBQXlCOztJQUN6Qiw0Q0FBd0I7O0lBQ3hCLGdDQUFvQjs7QUFJckIsQ0FBQztBQU1GLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBYy9CLGlCQUFpQixDQUFDLFVBQWtCO1FBQ2xDLE9BQU87WUFDTCxJQUFJLEVBQUUsb0JBQW9CLENBQUMsbUJBQW1CO1lBQzlDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFO2dCQUNKLFVBQVU7YUFDWDtTQUNGLENBQUE7SUFDSCxDQUFDOzs7OztJQUVELDBCQUEwQixDQUFDLGNBQThCO1FBQ3ZELE9BQU87WUFDTCxJQUFJLEVBQUUsb0JBQW9CLENBQUMsNkJBQTZCO1lBQ3hELE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFF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SUE0Q3RGLG1DQUFzRDs7SUFZdEQsZ0NBQWdEOztJQVVoRCxrQ0FBb0Q7O0lBV3BELDhCQUE0Qzs7SUFXNUMsK0JBQThDOztJQVc5Qyw2QkFBMEM7O0lBUzFDLGlDQUFrRDs7SUFTbEQsaUNBQWtEOztJQVVsRCxpQ0FBa0Q7Ozs7Ozs7SUFvWWxELDJDQUFzRTs7SUFDdEUsd0NBQWdFOztJQUNoRSw2Q0FBMEU7Ozs7Ozs7SUE4QjFFLHFEQUEwRjs7SUFDMUYsc0RBQTRGOzs7Ozs7O0lBNEU1Riw2QkFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRDaHVuaywgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlRlbXBvcmFsRW50aXR5LCBQcm9EZmhDbGFzc1Byb2pSZWwsIFByb0luZm9Qcm9qUmVsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IExpc3RUeXBlLCBQYW5lbCwgUHJvamVjdERldGFpbCwgUHJvamVjdFByZXZpZXcsIFBhbmVsVGFiLCBUeXBlUGVJdCB9IGZyb20gJy4uL21vZGVscy9hY3RpdmUtcHJvamVjdC5tb2RlbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGl2ZVByb2plY3RNZXRhIHtcblxuICBwcm9qZWN0UHJldmlldz86IFByb2plY3RQcmV2aWV3O1xuXG4gIHBrX3Byb2plY3Q/OiBudW1iZXI7XG4gIHBrX2VudGl0eT86IG51bWJlcjtcbiAgcGtfZW50aXRpZXM/OiBudW1iZXJbXTtcbiAgcGtfY2xhc3Nlcz86IG51bWJlcltdXG4gIHBrX3VpX2NvbnRleHQ/OiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uPzogbnVtYmVyO1xuXG5cbiAgY2h1bms/OiBEYXRDaHVua1xuICB0ZUVuR3JhcGhzPzogSW5mVGVtcG9yYWxFbnRpdHlbXVxuICBwZUl0R3JhcGhzPzogSW5mUGVyc2lzdGVudEl0ZW1bXVxuICB0eXBlcz86IFR5cGVQZUl0W11cblxuICAvLyBDUk0gYW5kIENvbmZpZ1xuICBwcm9qUmVsPzogUHJvRGZoQ2xhc3NQcm9qUmVsO1xuICBkZmhfcGtfY2xhc3M/OiBudW1iZXI7XG4gIC8vIGhhc1R5cGVQcm9wZXJ0aWVzPzogSGFzVHlwZVByb3BlcnR5UmVhZGFibGVbXVxuXG4gIC8vIEluZm9ybWF0aW9uXG4gIGluZlByb2pSZWw/OiBQcm9JbmZvUHJvalJlbDtcblxuICAvLyBsYXlvdXRcbiAgcGFuZWxzPzogUGFuZWxbXTtcbiAgbGlzdD86IExpc3RUeXBlO1xuICBwYW5lbEluZGV4PzogbnVtYmVyO1xuICBwYW5lbFNlcmlhbD86IG51bWJlcjtcbiAgdGFiSW5kZXg/OiBudW1iZXI7XG4gIHVpSWRTZXJpYWw/OiBudW1iZXI7XG4gIGZvY3VzZWRQYW5lbD86IG51bWJlcjtcbiAgcHJldmlvdXNQYW5lbEluZGV4PzogbnVtYmVyXG4gIGN1cnJlbnRQYW5lbEluZGV4PzogbnVtYmVyXG4gIHByZXZpb3VzVGFiSW5kZXg/OiBudW1iZXJcbiAgY3VycmVudFRhYkluZGV4PzogbnVtYmVyXG4gIHRhYj86IFBhbmVsVGFiPGFueT47XG5cbiAgLy8gTGF5b3V0IE1vZGFsc1xuICAvLyBjcmVhdGVPckFkZEVudGl0eT86IENyZWF0ZU9yQWRkRW50aXR5OyAvLyBDaGVjayBpZiB0aGlzIHJlYWxseSBiZWxvbmd0IGluIHN0YXRlXG59O1xudHlwZSBQYXlsb2FkID0gUHJvamVjdERldGFpbDtcbmV4cG9ydCB0eXBlIEFjdGl2ZVByb2plY3RBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgQWN0aXZlUHJvamVjdE1ldGE+O1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY3RpdmVQcm9qZWN0QWN0aW9ucyB7XG5cbiAgLyogdHNsaW50OmRpc2FibGU6bWVtYmVyLW9yZGVyaW5nICovXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBDUk0gYW5kIENvbmZpZyAobWV0YWRhdGEsIGNybSlcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICBzdGF0aWMgTE9BRF9QUk9KRUNUX0JBU0lDUyA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1BST0pFQ1RfQkFTSUNTJztcbiAgc3RhdGljIExPQURfUFJPSkVDVF9CQVNJQ1NfRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUFJPSkVDVF9CQVNJQ1NfRkFJTEVEJztcbiAgc3RhdGljIExPQURfUFJPSkVDVF9CQVNJQ1NfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUFJPSkVDVF9CQVNJQ1NfU1VDQ0VFREVEJztcbiAgc3RhdGljIExPQURfUFJPSkVDVF9DT05GSUcgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9QUk9KRUNUX0NPTkZJRyc7XG4gIHN0YXRpYyBMT0FEX1BST0pFQ1RfQ09ORklHX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1BST0pFQ1RfQ09ORklHX1NVQ0NFRURFRCc7XG5cblxuICBsb2FkUHJvamVjdEJhc2ljcyhwa19wcm9qZWN0OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0JBU0lDUyxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7XG4gICAgICAgIHBrX3Byb2plY3RcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsb2FkUHJvamVjdEJhc2lzY3NTdWNjZWRlZChwcm9qZWN0UHJldmlldzogUHJvamVjdFByZXZpZXcpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0JBU0lDU19TVUNDRUVERUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBwcm9qZWN0UHJldmlldyB9LFxuICAgIH1cbiAgfVxuXG4gIGxvYWRQcm9qZWN0Q29uZmlnKHBrX3Byb2plY3Q6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQ09ORklHLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgcGtfcHJvamVjdFxuICAgICAgfSxcbiAgICB9XG4gIH1cblxuICBsb2FkUHJvamVjdENvbmZpZ1N1Y2NlZWRlZCgpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0NPTkZJR19TVUNDRUVERUQsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIC8vIGNybVxuICAgICAgfSxcbiAgICAgIG1ldGE6IG51bGwsXG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBMYXlvdXQgLS0gVGFic1xuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIHN0YXRpYyBTRVRfTElTVF9UWVBFID0gJ0FjdGl2ZVByb2plY3Q6OlNFVF9MSVNUX1RZUEUnO1xuXG4gIHNldExpc3RUeXBlKGxpc3Q6IExpc3RUeXBlKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9MSVNUX1RZUEUsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YToge1xuICAgICAgICBsaXN0XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIFNFVF9QQU5FTFMgPSAnQWN0aXZlUHJvamVjdDo6U0VUX1BBTkVMUyc7XG5cbiAgc2V0UGFuZWxzKHBhbmVsczogUGFuZWxbXSwgdWlJZFNlcmlhbDogbnVtYmVyLCBwYW5lbFNlcmlhbDogbnVtYmVyLCBmb2N1c2VkUGFuZWw6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfUEFORUxTLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgcGFuZWxzLCB1aUlkU2VyaWFsLCBwYW5lbFNlcmlhbCwgZm9jdXNlZFBhbmVsIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgQUNUSVZBVEVfVEFCID0gJ0FjdGl2ZVByb2plY3Q6OkFDVElWQVRFX1RBQic7XG5cbiAgYWN0aXZhdGVUYWIocGFuZWxJbmRleDogbnVtYmVyLCB0YWJJbmRleDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkFDVElWQVRFX1RBQixcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7XG4gICAgICAgIHBhbmVsSW5kZXgsIHRhYkluZGV4XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHN0YXRpYyBNT1ZFX1RBQiA9ICdBY3RpdmVQcm9qZWN0OjpNT1ZFX1RBQic7XG4gIG1vdmVUYWIocHJldmlvdXNQYW5lbEluZGV4OiBudW1iZXIsIGN1cnJlbnRQYW5lbEluZGV4OiBudW1iZXIsIHByZXZpb3VzVGFiSW5kZXg6IG51bWJlciwgY3VycmVudFRhYkluZGV4OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTU9WRV9UQUIsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YToge1xuICAgICAgICBwcmV2aW91c1BhbmVsSW5kZXgsIGN1cnJlbnRQYW5lbEluZGV4LCBwcmV2aW91c1RhYkluZGV4LCBjdXJyZW50VGFiSW5kZXhcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgQ0xPU0VfVEFCID0gJ0FjdGl2ZVByb2plY3Q6OkNMT1NFX1RBQic7XG4gIGNsb3NlVGFiKHBhbmVsSW5kZXg6IG51bWJlciwgdGFiSW5kZXg6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9UQUIsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YToge1xuICAgICAgICBwYW5lbEluZGV4LCB0YWJJbmRleFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBBRERfVEFCID0gJ0FjdGl2ZVByb2plY3Q6OkFERF9UQUInO1xuICBhZGRUYWI8VGFiRGF0YT4odGFiOiBQYW5lbFRhYjxUYWJEYXRhPik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5BRERfVEFCLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgdGFiIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgU1BMSVRfUEFORUwgPSAnQWN0aXZlUHJvamVjdDo6U1BMSVRfUEFORUwnO1xuICBzcGxpdFBhbmVsKHByZXZpb3VzUGFuZWxJbmRleDogbnVtYmVyLCB0YWJJbmRleDogbnVtYmVyLCBjdXJyZW50UGFuZWxJbmRleDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlNQTElUX1BBTkVMLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgcHJldmlvdXNQYW5lbEluZGV4LCB0YWJJbmRleCwgY3VycmVudFBhbmVsSW5kZXggfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBDTE9TRV9QQU5FTCA9ICdBY3RpdmVQcm9qZWN0OjpDTE9TRV9QQU5FTCc7XG4gIGNsb3NlUGFuZWwocGFuZWxJbmRleDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1BBTkVMLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgcGFuZWxJbmRleCB9XG4gICAgfVxuICB9XG5cblxuICBzdGF0aWMgRk9DVVNfUEFORUwgPSAnQWN0aXZlUHJvamVjdDo6Rk9DVVNfUEFORUwnO1xuICBmb2N1c1BhbmVsKHBhbmVsSW5kZXg6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5GT0NVU19QQU5FTCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IHBhbmVsSW5kZXggfVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyAgKiBMYXlvdXQgLS0gTW9kYWxzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gLy8gY3JlYXRlIG9yIGFkZCBlbnRpdHkgbW9kYWxcbiAgLy8gc3RhdGljIHJlYWRvbmx5IE9QRU5fQUREX0ZPUk0gPSAnQWN0aXZlUHJvamVjdDo6T1BFTl9BRERfRk9STSc7XG4gIC8vIHN0YXRpYyByZWFkb25seSBDTE9TRV9BRERfRk9STSA9ICdBY3RpdmVQcm9qZWN0OjpDTE9TRV9BRERfRk9STSc7XG5cbiAgLy8gb3BlbkFkZEZvcm0gPSAoY3JlYXRlT3JBZGRFbnRpdHk6IENyZWF0ZU9yQWRkRW50aXR5KTogQWN0aXZlUHJvamVjdEFjdGlvbiA9PiAoe1xuICAvLyAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLk9QRU5fQUREX0ZPUk0sXG4gIC8vICAgbWV0YTogeyBjcmVhdGVPckFkZEVudGl0eSB9LFxuICAvLyAgIHBheWxvYWQ6IG51bGxcbiAgLy8gfSlcblxuICAvLyBjbG9zZUFkZEZvcm0gPSAoKTogQWN0aXZlUHJvamVjdEFjdGlvbiA9PiAoe1xuICAvLyAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX0FERF9GT1JNLFxuICAvLyAgIG1ldGE6IG51bGwsXG4gIC8vICAgcGF5bG9hZDogbnVsbFxuICAvLyB9KVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAqIEluZm9ybWF0aW9uIGNhY2hlXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAvLyBFbnRpdHlQcmV2aWV3c1xuICAvLyBzdGF0aWMgTE9BRF9FTlRJVFlfUFJFVklFVyA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX0VOVElUWV9QUkVWSUVXJztcbiAgLy8gc3RhdGljIExPQURfRU5USVRZX1BSRVZJRVdfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfRU5USVRZX1BSRVZJRVdfU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIExPQURfRU5USVRZX1BSRVZJRVdfRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfRU5USVRZX1BSRVZJRVdfRkFJTEVEJztcblxuXG4gIC8vIGxvYWRFbnRpdHlQcmV2aWV3KHBrX3Byb2plY3Q6IG51bWJlciwgcGtfZW50aXR5OiBudW1iZXIsIHBrX3VpX2NvbnRleHQ6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX0VOVElUWV9QUkVWSUVXLFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGtfcHJvamVjdCwgcGtfZW50aXR5LCBwa191aV9jb250ZXh0XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZEVudGl0eVByZXZpZXdTdWNjZWVkZWQoZW50aXR5UHJldmlldzogRW50aXR5UHJldmlldyk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX0VOVElUWV9QUkVWSUVXX1NVQ0NFRURFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIGVudGl0eVByZXZpZXdcbiAgLy8gICAgIH0sXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZEVudGl0eVByZXZpZXdGYWlsZWQoZXJyb3IpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9FTlRJVFlfUFJFVklFV19GQUlMRUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YTogbnVsbCxcbiAgLy8gICAgIGVycm9yXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLy8gRW50aXR5UHJldmlld3NcbiAgLy8gc3RhdGljIExPQURfVFlQRVMgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9UWVBFUyc7XG4gIC8vIHN0YXRpYyBMT0FEX1RZUEVTX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1RZUEVTX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyBMT0FEX1RZUEVTX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1RZUEVTX0ZBSUxFRCc7XG4gIC8vIGxvYWRUeXBlcyhwa19wcm9qZWN0OiBudW1iZXIsIHBrX2NsYXNzZXM6IG51bWJlcltdKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVFlQRVMsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwa19wcm9qZWN0LCBwa19jbGFzc2VzXG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFR5cGVzU3VjY2VlZGVkKHR5cGVzOiBUeXBlUGVJdFtdLCBwa19jbGFzc2VzOiBudW1iZXJbXSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1RZUEVTX1NVQ0NFRURFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHR5cGVzLCBwa19jbGFzc2VzXG4gIC8vICAgICB9LFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRUeXBlc0ZhaWxlZChlcnJvcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1RZUEVTX0ZBSUxFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiBudWxsLFxuICAvLyAgICAgZXJyb3JcbiAgLy8gICB9XG4gIC8vIH1cblxuXG5cbiAgLy8gLy8gRW50aXRpZXMgRGV0YWlscyBmb3IgZGlzcGxheSBpbiBNb2RhbHNcbiAgLy8gc3RhdGljIExPQURfRU5USVRZX0RFVEFJTF9GT1JfTU9EQUwgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9FTlRJVFlfREVUQUlMX0ZPUl9NT0RBTCc7XG4gIC8vIHN0YXRpYyBMT0FEX1BFX0lUX0RFVEFJTF9GT1JfTU9EQUxfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUEVfSVRfREVUQUlMX0ZPUl9NT0RBTF9TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgTE9BRF9URV9FTl9ERVRBSUxfRk9SX01PREFMX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1RFX0VOX0RFVEFJTF9GT1JfTU9EQUxfU1VDQ0VFREVEJzsgLy8gVE9ETzogSW1wbGVtZW50IGFjdGlvbi9yZWR1Y2VyXG4gIC8vIHN0YXRpYyBMT0FEX0VOVElUWV9ERVRBSUxfRk9SX01PREFMX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX0VOVElUWV9ERVRBSUxfRk9SX01PREFMX0ZBSUxFRCc7XG5cbiAgLy8gbG9hZEVudGl0eURldGFpbEZvck1vZGFsKHBrX3Byb2plY3Q6IG51bWJlciwgcGtfZW50aXR5OiBudW1iZXIsIHBrX3VpX2NvbnRleHQ6IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX0VOVElUWV9ERVRBSUxfRk9SX01PREFMLFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGtfcHJvamVjdCwgcGtfZW50aXR5LCBwa191aV9jb250ZXh0XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gbG9hZFBlSXREZXRhaWxzRm9yTW9kYWxTdWNjZWVkZWQocGVJdERldGFpbDogRW50aXR5RGV0YWlsKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUEVfSVRfREVUQUlMX0ZPUl9NT0RBTF9TVUNDRUVERUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBwZUl0RGV0YWlsXG4gIC8vICAgICB9LFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYUVudGl0eXREZXRhaWxzRm9yTW9kYWxGYWlsZWQoZXJyb3IpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9FTlRJVFlfREVUQUlMX0ZPUl9NT0RBTF9GQUlMRUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YTogbnVsbCxcbiAgLy8gICAgIGVycm9yXG4gIC8vICAgfVxuICAvLyB9XG5cblxuICAvLyAvLyBDaHVua3NcbiAgLy8gc3RhdGljIExPQURfQ0hVTksgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9DSFVOSyc7XG4gIC8vIHN0YXRpYyBMT0FEX0NIVU5LX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX0NIVU5LX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyBMT0FEX0NIVU5LX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX0NIVU5LX0ZBSUxFRCc7XG5cbiAgLy8gbG9hZENodW5rKHBrX3Byb2plY3Q6IG51bWJlciwgcGtfZW50aXR5OiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9DSFVOSyxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBrX3Byb2plY3QsIHBrX2VudGl0eVxuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRDaHVua1N1Y2NlZWRlZChjaHVuazogRGF0Q2h1bmspOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9DSFVOS19TVUNDRUVERUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBjaHVua1xuICAvLyAgICAgfSxcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkQ2h1bmtGYWlsZWQoZXJyb3IpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9DSFVOS19GQUlMRUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YTogbnVsbCxcbiAgLy8gICAgIGVycm9yXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLy8gUGVJdCBHcmFwaHNcbiAgLy8gc3RhdGljIExPQURfUEVJVF9HUkFQSFMgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9QRUlUX0dSQVBIUyc7XG4gIC8vIHN0YXRpYyBMT0FEX1BFSVRfR1JBUEhTX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1BFSVRfR1JBUEhTX1NVQ0NFRURFRCc7XG4gIC8vIHN0YXRpYyBMT0FEX1BFSVRfR1JBUEhTX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1BFSVRfR1JBUEhTX0ZBSUxFRCc7XG5cblxuICAvLyBsb2FkUGVJdEdyYXBocyhwa19wcm9qZWN0OiBudW1iZXIsIHBrX2VudGl0aWVzOiBudW1iZXJbXSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BFSVRfR1JBUEhTLFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGtfcHJvamVjdCwgcGtfZW50aXRpZXNcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkUGVJdEdyYXBoc1N1Y2NlZWRlZChwZUl0R3JhcGhzOiBJbmZQZXJzaXN0ZW50SXRlbVtdKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUEVJVF9HUkFQSFNfU1VDQ0VFREVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGVJdEdyYXBoc1xuICAvLyAgICAgfSxcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkUGVJdEdyYXBoc0ZhaWxlZChlcnJvcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BFSVRfR1JBUEhTX0ZBSUxFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiBudWxsLFxuICAvLyAgICAgZXJyb3JcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyAvLyBUZUVuIEdyYXBoc1xuICAvLyBzdGF0aWMgTE9BRF9URUVOX0dSQVBIUyA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1RFRU5fR1JBUEhTJztcbiAgLy8gc3RhdGljIExPQURfVEVFTl9HUkFQSFNfU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVEVFTl9HUkFQSFNfU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIExPQURfVEVFTl9HUkFQSFNfRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVEVFTl9HUkFQSFNfRkFJTEVEJztcblxuICAvLyBsb2FkVGVFbkdyYXBocyhwa19wcm9qZWN0OiBudW1iZXIsIHBrX2VudGl0aWVzOiBudW1iZXJbXSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1RFRU5fR1JBUEhTLFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGtfcHJvamVjdCwgcGtfZW50aXRpZXNcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkVGVFbkdyYXBoc1N1Y2NlZWRlZCh0ZUVuR3JhcGhzOiBJbmZUZW1wb3JhbEVudGl0eVtdKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVEVFTl9HUkFQSFNfU1VDQ0VFREVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgdGVFbkdyYXBoc1xuICAvLyAgICAgfSxcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkVGVFbkdyYXBoc0ZhaWxlZChlcnJvcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1RFRU5fR1JBUEhTX0ZBSUxFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiBudWxsLFxuICAvLyAgICAgZXJyb3JcbiAgLy8gICB9XG4gIC8vIH1cblxuXG4gIC8vIC8vIFF1ZXJpZXNcbiAgLy8gc3RhdGljIExPQURfUVVFUklFUyA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1FVRVJJRVMnO1xuICAvLyBzdGF0aWMgTE9BRF9RVUVSSUVTX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1FVRVJJRVNfU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIExPQURfUVVFUklFU19GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9RVUVSSUVTX0ZBSUxFRCc7XG5cbiAgLy8gbG9hZFF1ZXJpZXMocGtfcHJvamVjdDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUVVFUklFUyxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBrX3Byb2plY3RcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkUXVlcmllc1N1Y2NlZWRlZChjb21RdWVyeUFycmF5OiBDb21RdWVyeVZbXSk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1FVRVJJRVNfU1VDQ0VFREVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgY29tUXVlcnlBcnJheVxuICAvLyAgICAgfSxcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkUXVlcmllc0ZhaWxlZChlcnJvcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1FVRVJJRVNfRkFJTEVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IG51bGwsXG4gIC8vICAgICBlcnJvclxuICAvLyAgIH1cbiAgLy8gfVxuXG5cbiAgLy8gLy8gUXVlcnkgVmVyc2lvblxuICAvLyBzdGF0aWMgTE9BRF9RVUVSWV9WRVJTSU9OID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUVVFUllfVkVSU0lPTic7XG4gIC8vIHN0YXRpYyBMT0FEX1FVRVJZX1ZFUlNJT05fU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfUVVFUllfVkVSU0lPTl9TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgTE9BRF9RVUVSWV9WRVJTSU9OX0ZBSUxFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1FVRVJZX1ZFUlNJT05fRkFJTEVEJztcblxuICAvLyBsb2FkUXVlcnlWZXJzaW9uKHBrX3Byb2plY3Q6IG51bWJlciwgcGtfZW50aXR5OiBudW1iZXIsIGVudGl0eV92ZXJzaW9uOiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9RVUVSWV9WRVJTSU9OLFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGtfcHJvamVjdCwgcGtfZW50aXR5LCBlbnRpdHlfdmVyc2lvblxuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRRdWVyeVZlcnNpb25TdWNjZWVkZWQoY29tUXVlcnk6IFByb1F1ZXJ5KTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUVVFUllfVkVSU0lPTl9TVUNDRUVERUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBjb21RdWVyeVxuICAvLyAgICAgfSxcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkUXVlcnlWZXJzaW9uRmFpbGVkKGVycm9yKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUVVFUllfVkVSU0lPTl9GQUlMRUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YTogbnVsbCxcbiAgLy8gICAgIGVycm9yXG4gIC8vICAgfVxuICAvLyB9XG5cblxuXG4gIC8vIC8vIFZpc3VhbHNcbiAgLy8gc3RhdGljIExPQURfVklTVUFMUyA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1ZJU1VBTFMnO1xuICAvLyBzdGF0aWMgTE9BRF9WSVNVQUxTX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1ZJU1VBTFNfU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIExPQURfVklTVUFMU19GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6TE9BRF9WSVNVQUxTX0ZBSUxFRCc7XG5cbiAgLy8gbG9hZFZpc3VhbHMocGtfcHJvamVjdDogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVklTVUFMUyxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiB7XG4gIC8vICAgICAgIHBrX3Byb2plY3RcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkVmlzdWFsc1N1Y2NlZWRlZChjb21WaXN1YWxBcnJheTogQ29tVmlzdWFsVltdKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfVklTVUFMU19TVUNDRUVERUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBjb21WaXN1YWxBcnJheVxuICAvLyAgICAgfSxcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkVmlzdWFsc0ZhaWxlZChlcnJvcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1ZJU1VBTFNfRkFJTEVELFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IG51bGwsXG4gIC8vICAgICBlcnJvclxuICAvLyAgIH1cbiAgLy8gfVxuICAvLyAvLyBWaXN1YWwgVmVyc2lvblxuICAvLyBzdGF0aWMgTE9BRF9WSVNVQUxfVkVSU0lPTiA9ICdBY3RpdmVQcm9qZWN0OjpMT0FEX1ZJU1VBTF9WRVJTSU9OJztcbiAgLy8gc3RhdGljIExPQURfVklTVUFMX1ZFUlNJT05fU1VDQ0VFREVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVklTVUFMX1ZFUlNJT05fU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIExPQURfVklTVUFMX1ZFUlNJT05fRkFJTEVEID0gJ0FjdGl2ZVByb2plY3Q6OkxPQURfVklTVUFMX1ZFUlNJT05fRkFJTEVEJztcblxuICAvLyBsb2FkVmlzdWFsVmVyc2lvbihwa19wcm9qZWN0OiBudW1iZXIsIHBrX2VudGl0eTogbnVtYmVyLCBlbnRpdHlfdmVyc2lvbj86IG51bWJlcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1ZJU1VBTF9WRVJTSU9OLFxuICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICAgIG1ldGE6IHtcbiAgLy8gICAgICAgcGtfcHJvamVjdCwgcGtfZW50aXR5LCBlbnRpdHlfdmVyc2lvblxuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIGxvYWRWaXN1YWxWZXJzaW9uU3VjY2VlZGVkKGNvbVZpc3VhbEFycmF5OiBDb21WaXN1YWxWW10pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9WSVNVQUxfVkVSU0lPTl9TVUNDRUVERUQsXG4gIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAvLyAgICAgbWV0YToge1xuICAvLyAgICAgICBjb21WaXN1YWxBcnJheVxuICAvLyAgICAgfSxcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBsb2FkVmlzdWFsVmVyc2lvbkZhaWxlZChlcnJvcik6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1ZJU1VBTF9WRVJTSU9OX0ZBSUxFRCxcbiAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gIC8vICAgICBtZXRhOiBudWxsLFxuICAvLyAgICAgZXJyb3JcbiAgLy8gICB9XG4gIC8vIH1cblxuXG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqICBUaGluZ3MgZm9yIE1lbnRpb25pbmdzIC8gQW5ub3RhdGlvbnNcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICBzdGF0aWMgVVBEQVRFX1NFTEVDVEVEX0NIVU5LID0gJ0FjdGl2ZVByb2plY3Q6OlVQREFURV9TRUxFQ1RFRF9DSFVOSyc7XG4gIHN0YXRpYyBTRVRfUkVGSU5JTkdfQ0hVTksgPSAnQWN0aXZlUHJvamVjdDo6U0VUX1JFRklOSU5HX0NIVU5LJztcbiAgc3RhdGljIFNFVF9DUkVBVElOR19NRU5USU9OSU5HID0gJ0FjdGl2ZVByb2plY3Q6OlNFVF9DUkVBVElOR19NRU5USU9OSU5HJztcblxuXG4gIC8vIHVwZGF0ZVNlbGVjdGVkQ2h1bmsoc2VsZWN0ZWRDaHVuazogRGF0Q2h1bmspOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuVVBEQVRFX1NFTEVDVEVEX0NIVU5LLFxuICAvLyAgICAgcGF5bG9hZDogeyBzZWxlY3RlZENodW5rIH0sXG4gIC8vICAgICBtZXRhOiBudWxsXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgc2V0UmVmaW5pbmdDaHVuayhyZWZpbmluZ0NodW5rOiBib29sZWFuKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9SRUZJTklOR19DSFVOSyxcbiAgICAgIHBheWxvYWQ6IHsgcmVmaW5pbmdDaHVuayB9LFxuICAgICAgbWV0YTogbnVsbFxuICAgIH1cbiAgfVxuXG4gIHNldENyZWF0aW5nTWVudGlvbmluZyhjcmVhdGluZ01lbnRpb25pbmc6IGJvb2xlYW4pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX0NSRUFUSU5HX01FTlRJT05JTkcsXG4gICAgICBwYXlsb2FkOiB7IGNyZWF0aW5nTWVudGlvbmluZyB9LFxuICAgICAgbWV0YTogbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgKiBIaWdobGlnaHRpbmcgb2YgbWVudGlvbmluZ3MgaW4gdGhlIGd1aVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIHN0YXRpYyBTRVRfTUVOVElPTklOR1NfRk9DVVNFRF9JTl9URVhUID0gJ0FjdGl2ZVByb2plY3Q6OlNFVF9NRU5USU9OSU5HU19GT0NVU0VEX0lOX1RFWFQnO1xuICBzdGF0aWMgU0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEFCTEUgPSAnQWN0aXZlUHJvamVjdDo6U0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEFCTEUnO1xuXG4gIHNldE1lbnRpb25pbmdzRm9jdXNlZEluVGV4dChtZW50aW9uaW5nc0ZvY3VzZWRJblRleHQ6IG51bWJlcltdKTogQWN0aXZlUHJvamVjdEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9NRU5USU9OSU5HU19GT0NVU0VEX0lOX1RFWFQsXG4gICAgICBwYXlsb2FkOiB7IG1lbnRpb25pbmdzRm9jdXNlZEluVGV4dCB9LFxuICAgICAgbWV0YTogbnVsbFxuICAgIH1cbiAgfVxuXG4gIHNldE1lbnRpb25pbmdzRm9jdXNlZEluVGFibGUobWVudGlvbmluZ3NGb2N1c2VkSW5UYWJsZTogbnVtYmVyW10pOiBBY3RpdmVQcm9qZWN0QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEFCTEUsXG4gICAgICBwYXlsb2FkOiB7IG1lbnRpb25pbmdzRm9jdXNlZEluVGFibGUgfSxcbiAgICAgIG1ldGE6IG51bGxcbiAgICB9XG4gIH1cblxuXG4gIC8vIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gICogIE1ldGhvZHMgdG8gbWFuYWdlIGVuYWJsaW5nIGFuZCBkaXNhYmxpbmcgYSBjbGFzcyBmb3IgdGhlIHByb2plY3RcbiAgLy8gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gc3RhdGljIHJlYWRvbmx5IFVQU0VSVF9DTEFTU19QUk9KX1JFTCA9ICdBY3RpdmVQcm9qZWN0OjpVUFNFUlRfQ0xBU1NfUFJPSl9SRUwnO1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgVVBTRVJUX0NMQVNTX1BST0pfUkVMX1NVQ0NFRURFRCA9ICdBY3RpdmVQcm9qZWN0OjpVUFNFUlRfQ0xBU1NfUFJPSl9SRUxfU1VDQ0VFREVEJztcbiAgLy8gc3RhdGljIHJlYWRvbmx5IFVQU0VSVF9DTEFTU19QUk9KX1JFTF9GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6VVBTRVJUX0NMQVNTX1BST0pfUkVMX0ZBSUxFRCc7XG5cbiAgLy8gdXBzZXJ0Q2xhc3NQcm9qUmVsID0gKHByb2pSZWw6IFByb0RmaENsYXNzUHJvalJlbCwgZGZoX3BrX2NsYXNzOiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uID0+ICh7XG4gIC8vICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuVVBTRVJUX0NMQVNTX1BST0pfUkVMLFxuICAvLyAgIG1ldGE6IHsgcHJvalJlbCwgZGZoX3BrX2NsYXNzIH0sXG4gIC8vICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gfSk7XG5cbiAgLy8gdXBzZXJ0Q2xhc3NQcm9qUmVsU3VjY2VlZGVkID0gKHByb2pSZWw6IFByb0RmaENsYXNzUHJvalJlbCwgZGZoX3BrX2NsYXNzOiBudW1iZXIpOiBBY3RpdmVQcm9qZWN0QWN0aW9uID0+ICh7XG4gIC8vICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuVVBTRVJUX0NMQVNTX1BST0pfUkVMX1NVQ0NFRURFRCxcbiAgLy8gICBtZXRhOiB7IHByb2pSZWwsIGRmaF9wa19jbGFzcyB9LFxuICAvLyAgIHBheWxvYWQ6IG51bGxcbiAgLy8gfSlcblxuICAvLyB1cHNlcnRDbGFzc1Byb2pSZWxGYWlsZWQgPSAoZXJyb3IsIGRmaF9wa19jbGFzczogbnVtYmVyKTogQWN0aXZlUHJvamVjdEFjdGlvbiA9PiAoe1xuICAvLyAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlVQU0VSVF9DTEFTU19QUk9KX1JFTF9GQUlMRUQsXG4gIC8vICAgbWV0YTogeyBkZmhfcGtfY2xhc3MgfSxcbiAgLy8gICBwYXlsb2FkOiBudWxsLFxuICAvLyAgIGVycm9yLFxuICAvLyB9KVxuXG5cbiAgLy8gLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyAgKiAgTWV0aG9kcyB0byBtYW5hZ2UgZW5hYmxpbmcgYW5kIGRpc2FibGluZyBhbiBlbnRpdHkgZm9yIHRoZSBwcm9qZWN0XG4gIC8vICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIHN0YXRpYyByZWFkb25seSBVUFNFUlRfRU5USVRZX1BST0pfUkVMID0gJ0FjdGl2ZVByb2plY3Q6OlVQU0VSVF9FTlRJVFlfUFJPSl9SRUwnO1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgVVBTRVJUX0VOVElUWV9QUk9KX1JFTF9TVUNDRUVERUQgPSAnQWN0aXZlUHJvamVjdDo6VVBTRVJUX0VOVElUWV9QUk9KX1JFTF9TVUNDRUVERUQnO1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgVVBTRVJUX0VOVElUWV9QUk9KX1JFTF9GQUlMRUQgPSAnQWN0aXZlUHJvamVjdDo6VVBTRVJUX0VOVElUWV9QUk9KX1JFTF9GQUlMRUQnO1xuXG4gIC8vIHVwc2VydEVudGl0eVByb2pSZWwgPSAoaW5mUHJvalJlbDogUHJvSW5mb1Byb2pSZWwpOiBBY3RpdmVQcm9qZWN0QWN0aW9uID0+ICh7XG4gIC8vICAgdHlwZTogQWN0aXZlUHJvamVjdEFjdGlvbnMuVVBTRVJUX0VOVElUWV9QUk9KX1JFTCxcbiAgLy8gICBtZXRhOiB7IGluZlByb2pSZWwgfSxcbiAgLy8gICBwYXlsb2FkOiBudWxsLFxuICAvLyB9KTtcblxuICAvLyB1cHNlcnRFbnRpdHlQcm9qUmVsU3VjY2VlZGVkID0gKGluZlByb2pSZWw6IFByb0luZm9Qcm9qUmVsKTogQWN0aXZlUHJvamVjdEFjdGlvbiA9PiAoe1xuICAvLyAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlVQU0VSVF9FTlRJVFlfUFJPSl9SRUxfU1VDQ0VFREVELFxuICAvLyAgIG1ldGE6IHsgaW5mUHJvalJlbCB9LFxuICAvLyAgIHBheWxvYWQ6IG51bGxcbiAgLy8gfSlcblxuICAvLyB1cHNlcnRFbnRpdHlQcm9qUmVsRmFpbGVkID0gKGVycm9yKTogQWN0aXZlUHJvamVjdEFjdGlvbiA9PiAoe1xuICAvLyAgIHR5cGU6IEFjdGl2ZVByb2plY3RBY3Rpb25zLlVQU0VSVF9FTlRJVFlfUFJPSl9SRUxfRkFJTEVELFxuICAvLyAgIG1ldGE6IG51bGwsXG4gIC8vICAgcGF5bG9hZDogbnVsbCxcbiAgLy8gICBlcnJvcixcbiAgLy8gfSlcblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogRGVzdHJveSB0aGUgYWN0aXZlIHByb2plY3Qgc3RhdGUgKG9uIGNsb3NpbmcgYSBwcm9qZWN0KVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIHN0YXRpYyBERVNUUk9ZID0gJ0FjdGl2ZVByb2plY3Q6OkRFU1RST1knO1xuICBkZXN0cm95KCk6IEFjdGl2ZVByb2plY3RBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY3RpdmVQcm9qZWN0QWN0aW9ucy5ERVNUUk9ZLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IG51bGwsXG4gICAgfVxuICB9XG59XG4iXX0=