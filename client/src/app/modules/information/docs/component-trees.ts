/**
 * PeIt Component trees
 */

// for _peIt_create
export const PeItCreateForm = { // Container        
    PeItCreateCtrl: { // Simple Component
        // for each roleSet of _roleSet_list
        PeItRoleSetCreateCtrl: { // Simple Component
            // for each of _role_list
            PeItRoleCreateCtrl: { // Simple Component
                // for teEnt_create
                TeEntCreateCtrl: { // Simple Component
                    // for each of _roleSet_list
                    TeEntRoleSetCreateCtrl: { // Simple Component
                        // for each of _role_list
                        TeEntRoleCreateCtrl: { // Simple Component
                            // for _lang_create
                            LanguageCtrl: {}, // Simple Component
                            // for _appe_create
                            AppellationCtrl: {}, // Simple Component
                            // for _timePrimitive_create
                            TimePrimitiveCtrl: {}, // Simple Component
                            // for _leaf_peIt_create
                            LeafPeItCtrl: {}, // Simple Component
                            // for _leaf_teEnt_create
                            LeafTeEntCtrl: {} // Simple Component
                        }
                    }
                }
            }
        }
    }
}

// for _peIt_add
export const PeItAddForm = { // Container    
    PeItAddCtrl: {
        // for each of _roleSet_list
        PeItRoleSetAddCtrl: {
            // for each of _role_list
            PeItRoleAddCtrl: {
                // for _teEnt
                TeEntAddCtrl: {
                    // for each of _roleSet_list
                    TeEntRoleSetAddCtrl: {
                        // for each of _role_list
                        TeEntRoleAddCtrl: {
                            LanguageView: {},
                            AppellationView: {},
                            TimePrimitiveView: {},
                            LeafPeItView: {},
                            LeafTeEntView: {}
                        }
                    }
                }
            }
        }
    }
}

// PeIt Editable Component Tree
export const PeItEditable = {
    // for each RoleSetState of _roleSet_list    
    PeItRoleSetEditable: {
        // for each RoleState of _role_list
        PeItRoleEditable: {
            // for TeEntDetails of _teEnt      
            TeEntEditable: {
                // for each RoleSet of _roleSet_list
                TeEntRoleSetEditable: {
                    // for each RoleDetails of _role_list
                    TeEntRoleEditable: {
                        LanguageView: {},
                        AppellationView: {},
                        TimePrimitiveView: {},
                        LeafPeItView: {},
                        LeafTeEntView: {}
                    },
                    // for RoleSetForm of _role_set_form
                    TeEntRoleSetForm: {} // TeEntRoleSetForm
                }
            }
        },
        //for _role_set_form
        PeItRoleSetForm: {} // see PeItRoleSetForm
    }
}

/**
 * PeIt Role Add Form Component trees
 */

// PeItRole Add (/ Create)
// when user adds a new PeIt Role (e.g. Has own Birth), append to PeItRoleSetEditable: 
export const PeItRoleSetForm = { // Container
    // for each RoleDetails _role_create_list
    PeItRoleCreateCtrl: { // Simple Component 
        TeEntCreateCtrl: { // Simple Component
            TeEntRoleSetCreateCtrl: { // Simple Component
                TeEntRoleCreateCtrl: { // Simple Component
                    LanguageCtrl: {}, // Simple Component
                    AppellationCtrl: {}, // Simple Component
                    TimePrimitiveCtrl: {}, // Simple Component
                    LeafPeItCtrl: {}, // Simple Component
                    LeafTeEntCtrl: {} // Simple Component
                }
            }
        }
    },
    // for each RoleDetails _role_add_list
    PeItRoleAddCtrl: { // Simple Component 
        TeEntAddCtrl: { // Simple Component
            TeEntRoleSetAddCtrl: { // Simple Component
                TeEntRoleAddCtrl: { // Simple Component
                    LanguageCtrl: {}, // Simple Component
                    AppellationCtrl: {}, // Simple Component
                    TimePrimitiveCtrl: {}, // Simple Component
                    LeafPeItCtrl: {}, // Simple Component
                    LeafTeEntCtrl: {} // Simple Component
                }
            }
        }
    }
}


/**
 * TeEnt Role Add Form Component trees
 */

// PeItRole Add (/ Create)
// when user adds a new PeIt Role (e.g. Has own Birth), append to PeItRoleSetEditable: 
export const TeEntRoleSetForm = { // Container
    // for each RoleDetails _role_create_list
    TeEntRoleCreateCtrl: { // Simple Component
        LanguageCtrl: {}, // Simple Component
        AppellationCtrl: {}, // Simple Component
        TimePrimitiveCtrl: {}, // Simple Component
        LeafPeItCtrl: {}, // Simple Component
        LeafTeEntCtrl: {} // Simple Component


    },
    // for each RoleDetails _role_add_list
    TeEntRoleAddCtrl: { // Simple Component
        LanguageCtrl: {}, // Simple Component
        AppellationCtrl: {}, // Simple Component
        TimePrimitiveCtrl: {}, // Simple Component
        LeafPeItCtrl: {}, // Simple Component
        LeafTeEntCtrl: {} // Simple Component
    }
}





/**
 * Abstract Classes
 */

 
/**
 * Abstract class for components that 
 * - act as a form control for its parent
 * - have a reactive form as child  
 */
export const BaseCtrlWithForm = {

}