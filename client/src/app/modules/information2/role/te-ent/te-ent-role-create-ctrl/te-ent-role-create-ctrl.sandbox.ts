import { sandboxOf } from 'angular-playground';
import { InfRole } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { RoleDetail, RoleSet } from '../../../information.models';
import { Information2Module } from '../../../information2.module';
import { TeEntRoleCreateCtrlComponent } from './te-ent-role-create-ctrl.component';




export default sandboxOf(TeEntRoleCreateCtrlComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('TeEnt Role Create Ctrl | Appe filled ', {
        context: {
            model: {
                role: {
                    fk_property: 99,
                    appellation: {
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
                }
            },
            parentPath: ['_role_set_1'],
            index: '_role_1',
            initState: {
                _role_set_1: {
                    _role_list: {
                        _role_1: {
                            role: {
                                fk_property: 99,
                                appellation: {
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






