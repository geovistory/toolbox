import { sandboxOf } from 'angular-playground';
import { InfRole, ProProject, ProjectDetail } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { RoleDetail, PropertyField } from 'app/core/state/models';
import { Information2Module } from '../../../information.module';
import { TeEntRoleCreateCtrlComponent } from './te-ent-role-create-ctrl.component';
import { DfhConfig } from '../../../shared/dfh-config';
import { crm } from '../../../information.sandbox.mock';




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
            parentPath: ['sandboxState', '_property_field_1'],
            index: '_role_1',
            sandboxState: {
                _property_field_1: new PropertyField({
                    _role_list: {
                        _role_1: {
                            role: {
                                fk_property: 99,
                                appellation: {
                                    fk_class: DfhConfig.CLASS_PK_APPELLATION,
                                    quill_doc: {
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
                                    quill_doc: {
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
                })
            }

        },
        template: `
            <gv-init-state [sandboxState]="sandboxState"></gv-init-state>

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
            parentPath: ['sandboxState', '_property_field_1'],
            index: '_role_1',
            sandboxState: {
                _property_field_1: new PropertyField({
                    _role_list: {
                        _role_1: {
                            role: {
                                fk_property: 99
                            } as InfRole,
                            _appe: {
                            },
                            targetClassPk: 1234
                        } as RoleDetail
                    }
                })
            }

        },
        template: `
            <gv-init-state [sandboxState]="sandboxState"></gv-init-state>

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
    .add('TeEnt Role Create Ctrl | Lang empty ', {
        context: {
            model: {
                role: {
                    fk_property: 99
                }
            },
            parentPath: ['sandboxState', '_property_field_1'],
            index: '_role_1',
            sandboxState: {
                _property_field_1: new PropertyField({
                    _role_list: {
                        _role_1: {
                            role: {
                                fk_property: 99
                            } as InfRole,
                            _lang: {
                            },
                            targetClassPk: 1234
                        } as RoleDetail
                    }
                })
            }

        },
        template: `
            <gv-init-state [sandboxState]="sandboxState"></gv-init-state>

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
    .add('TeEnt Role Create Ctrl | Lang filled ', {
        context: {
            model: {
                role: {
                    fk_property: 99
                }
            },
            parentPath: ['sandboxState', '_property_field_1'],
            index: '_role_1',
            sandboxState: {
                _property_field_1: new PropertyField({
                    _role_list: {
                        _role_1: {
                            role: {
                                fk_property: 99,
                                language: {
                                    fk_class: 54,
                                    pk_language: 'eng',
                                    lang_type: 'living',
                                    scope: 'individual',
                                    iso6392b: 'eng',
                                    iso6392t: 'eng',
                                    iso6391: 'en ',
                                    notes: 'English',
                                    pk_entity: 18889
                                }
                            } as InfRole,
                            _lang: {
                            },
                            targetClassPk: 1234
                        } as RoleDetail
                    }
                })
            }

        },
        template: `
            <gv-init-state [sandboxState]="sandboxState"></gv-init-state>

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
            parentPath: ['_property_field_1'],
            index: '_role_1',
            initState: {
                activeProject: {
                    crm: crm,
                    pk_project: 12
                },
                _property_field_1: new PropertyField({
                    _role_list: {
                        _role_1: {
                            targetClassPk: 21,
                            role: {
                                fk_property: 99
                            } as InfRole,
                            _leaf_peIt: {

                            }
                        } as RoleDetail
                    }
                })
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
            parentPath: ['_property_field_1'],
            index: '_role_1',
            initState: {
                activeProject: {
                    pk_entity: 50
                } as ProProject,
                _property_field_1: new PropertyField({
                    _role_list: {
                        _role_1: {
                            targetClassPk: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                            role: {
                                fk_property: DfhConfig.existenceTimeToFk.p82a
                            } as InfRole,
                            _timePrimitive: {

                            }
                        } as RoleDetail
                    }
                })
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
            parentPath: ['_property_field_1'],
            index: '_role_1',
            initState: {
                activeProject: {
                    pk_entity: 50
                } as ProProject,
                _property_field_1: new PropertyField({
                    _role_list: {
                        _role_1: {
                            targetClassPk: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
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
                })
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
            parentPath: ['_property_field_1'],
            index: '_role_1',
            initState: {
                activeProject: {
                    pk_entity: 50
                } as ProProject,
                _property_field_1: new PropertyField({
                    _role_list: {
                        _role_1: {
                            targetClassPk: 333,
                            role: {
                                pk_entity: 123123,
                                fk_property: 999
                            } as InfRole,
                            _place: {}
                        } as RoleDetail
                    }
                })
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