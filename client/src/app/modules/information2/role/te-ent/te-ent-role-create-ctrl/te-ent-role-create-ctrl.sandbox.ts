import { sandboxOf } from 'angular-playground';
import { InfRole, Project } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { RoleDetail, RoleSet } from '../../../information.models';
import { Information2Module } from '../../../information2.module';
import { TeEntRoleCreateCtrlComponent } from './te-ent-role-create-ctrl.component';
import { DfhConfig } from '../../../shared/dfh-config';




export default sandboxOf(TeEntRoleCreateCtrlComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('TeEnt Role Create Ctrl | Appe filled ', {
        context: {
            model: {},
            parentPath: ['_role_set_1'],
            index: '_role_1',
            initState: {
                _role_set_1: {
                    _role_list: {
                        _role_1: {
                            role: {
                                fk_property: 99,
                                appellation: {
                                    fk_class: DfhConfig.CLASS_PK_APPELLATION,
                                    appellation_label: {
                                        tokens: [
                                            {
                                                "id": 0,
                                                "string": "Hallo",
                                                "isSeparator": false
                                            },
                                            {
                                                "string": " ",
                                                "isSeparator": true
                                            },
                                            {
                                                "string": "Welt",
                                                "isSeparator": false
                                            }
                                        ],
                                        "latestTokenId": 2
                                    }
                                }
                            } as InfRole,
                            _appe: {
                                appellation: {
                                    appellation_label: {
                                        tokens: [
                                            {
                                                id: 1,
                                                string: 'Hoi'
                                            }
                                        ],
                                        latestId: 1
                                    }
                                }
                            }
                        } as RoleDetail
                    }
                } as RoleSet
            }

        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-te-ent-role-create-ctrl [parentPath]="parentPath" [index]="index"
                            name="role" [(ngModel)]="model.role" #role="ngModel" required>
                        </gv-te-ent-role-create-ctrl>
                    </form>                               
                </div>
                <div>
                    <p>Form.valid: {{f.valid | json}}</p>
        
                    <p>Form.touched: {{f.touched | json}}</p>
        
                    <p>Form.dirty: {{f.dirty | json}}</p>
        
                    <p>Form.value </p>
                    <pre>
                        {{f.value | json}}
                    </pre>
        
                </div>
            </div>
        `
    })

    .add('TeEnt Role Create Ctrl | Appe empty ', {
        context: {
            model: {
                role: {
                    fk_property: 99
                }
            },
            parentPath: ['_role_set_1'],
            index: '_role_1',
            initState: {
                _role_set_1: {
                    _role_list: {
                        _role_1: {
                            role: {
                                fk_property: 99
                            } as InfRole,
                            _appe: {
                            },
                            targetDfhClass: {
                                dfh_pk_class: 1234
                            }
                        } as RoleDetail
                    }
                } as RoleSet
            }

        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-te-ent-role-create-ctrl [parentPath]="parentPath" [index]="index"
                            name="role" [(ngModel)]="model.role" #role="ngModel" required>
                        </gv-te-ent-role-create-ctrl>
                    </form>                               
                </div>
                <div>
                    <p>Form.valid: {{f.valid | json}}</p>
        
                    <p>Form.touched: {{f.touched | json}}</p>
        
                    <p>Form.dirty: {{f.dirty | json}}</p>
        
                    <p>Form.value </p>
                    <pre>
                        {{f.value | json}}
                    </pre>
        
                </div>
            </div>
        `
    })

    .add('TeEnt Role Create Ctrl | Leaf PeIt ', {
        context: {
            model: {
                role: {
                    fk_property: 99
                }
            },
            parentPath: ['_role_set_1'],
            index: '_role_1',
            initState: {
                activeProject: {
                    pk_project: 50
                } as Project,
                _role_set_1: {
                    _role_list: {
                        _role_1: {
                            targetDfhClass: {
                                "dfh_pk_class": 1,
                                "dfh_identifier_in_namespace": "E21",
                                "dfh_standard_label": "Person",
                                "pk_entity": 726,
                            },
                            role: {
                                fk_property: 99
                            } as InfRole,
                            _leaf_peIt: {

                            }
                        } as RoleDetail
                    }
                } as RoleSet
            }

        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-te-ent-role-create-ctrl [parentPath]="parentPath" [index]="index"
                            name="role" [(ngModel)]="model.role" #role="ngModel" required>
                        </gv-te-ent-role-create-ctrl>
                    </form>                               
                </div>
                <div>
                    <p>Form.valid: {{f.valid | json}}</p>
        
                    <p>Form.touched: {{f.touched | json}}</p>
        
                    <p>Form.dirty: {{f.dirty | json}}</p>
        
                    <p>Form.value </p>
                    <pre>
                        {{f.value | json}}
                    </pre>
        
                </div>
            </div>
        `
    })

    .add('TeEnt Role Create Ctrl | Time Primitive Empty', {
        context: {
            model: {
                role: {
                    fk_property: DfhConfig.existenceTimeToFk.p82a
                }
            },
            parentPath: ['_role_set_1'],
            index: '_role_1',
            initState: {
                activeProject: {
                    pk_project: 50
                } as Project,
                _role_set_1: {
                    _role_list: {
                        _role_1: {
                            targetDfhClass: {
                                "dfh_pk_class": DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                                "dfh_identifier_in_namespace": "XYZ",
                                "dfh_standard_label": "Time Primitive"
                            },
                            role: {
                                fk_property: DfhConfig.existenceTimeToFk.p82a
                            } as InfRole,
                            _timePrimitive: {

                            }
                        } as RoleDetail
                    }
                } as RoleSet
            }

        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-te-ent-role-create-ctrl [parentPath]="parentPath" [index]="index"
                            name="role" [(ngModel)]="model.role" #role="ngModel" required>
                        </gv-te-ent-role-create-ctrl>
                    </form>                               
                </div>
                <div>
                    <p>Form.valid: {{f.valid | json}}</p>
        
                    <p>Form.touched: {{f.touched | json}}</p>
        
                    <p>Form.dirty: {{f.dirty | json}}</p>
        
                    <p>Form.value </p>
                    <pre>
                        {{f.value | json}}
                    </pre>
        
                </div>
            </div>
        `
    })

    .add('TeEnt Role Create Ctrl | Time Primitive Filled', {
        context: {
            model: {
                role: {
                    fk_property: DfhConfig.existenceTimeToFk.p82a
                }
            },
            parentPath: ['_role_set_1'],
            index: '_role_1',
            initState: {
                activeProject: {
                    pk_project: 50
                } as Project,
                _role_set_1: {
                    _role_list: {
                        _role_1: {
                            targetDfhClass: {
                                "dfh_pk_class": DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                                "dfh_identifier_in_namespace": "XYZ",
                                "dfh_standard_label": "Time Primitive"
                            },
                            role: {
                                pk_entity: 123123,
                                fk_property: DfhConfig.existenceTimeToFk.p82a,
                                "time_primitive": {
                                    "duration": "1 year",
                                    "julian_day": 2451558
                                },
                                "entity_version_project_rels": [
                                    {
                                        "calendar": "julian"
                                    }
                                ]
                            } as InfRole,
                            _timePrimitive: {

                            }
                        } as RoleDetail
                    }
                } as RoleSet
            }

        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-te-ent-role-create-ctrl [parentPath]="parentPath" [index]="index"
                            name="role" [(ngModel)]="model.role" #role="ngModel" required>
                        </gv-te-ent-role-create-ctrl>
                    </form>                               
                </div>
                <div>
                    <p>Form.valid: {{f.valid | json}}</p>
        
                    <p>Form.touched: {{f.touched | json}}</p>
        
                    <p>Form.dirty: {{f.dirty | json}}</p>
        
                    <p>Form.value </p>
                    <pre>
                        {{f.value | json}}
                    </pre>
        
                </div>
            </div>
        `
    })


    .add('TeEnt Role Create Ctrl | Place Empty', {
        context: {
            model: {
                role: {
                    fk_property: 999
                }
            },
            parentPath: ['_role_set_1'],
            index: '_role_1',
            initState: {
                activeProject: {
                    pk_project: 50
                } as Project,
                _role_set_1: {
                    _role_list: {
                        _role_1: {
                            targetDfhClass: {
                                "dfh_pk_class": 333,
                                "dfh_identifier_in_namespace": "XYZ",
                                "dfh_standard_label": "Place"
                            },
                            role: {
                                pk_entity: 123123,
                                fk_property: 999
                            } as InfRole,
                            _place: {}
                        } as RoleDetail
                    }
                } as RoleSet
            }

        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-te-ent-role-create-ctrl [parentPath]="parentPath" [index]="index"
                            name="role" [(ngModel)]="model.role" #role="ngModel" required>
                        </gv-te-ent-role-create-ctrl>
                    </form>                               
                </div>
                <div>
                    <p>Form.valid: {{f.valid | json}}</p>
        
                    <p>Form.touched: {{f.touched | json}}</p>
        
                    <p>Form.dirty: {{f.dirty | json}}</p>
        
                    <p>Form.value </p>
                    <pre>
                        {{f.value | json}}
                    </pre>
        
                </div>
            </div>
        `
    })