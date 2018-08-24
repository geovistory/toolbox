import { sandboxOf } from 'angular-playground';
import { DfhClass, InfRole } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { RoleDetail, RoleSet } from 'app/core/models';
import { Information2Module } from '../../../information.module';
import { TeEntRoleEditableComponent } from './te-ent-role-editable.component';




export default sandboxOf(TeEntRoleEditableComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('TeEnt Role Editable | TimePrimitive Filled ', {
        context: {
            parentPath: ['_role_set_1'],
            index: '_role_1',
            initState: {
                _role_set_1: new RoleSet({
                    _role_list: {
                        _role_1: {
                            role: {
                                fk_property: 152,
                                time_primitive: {
                                    fk_class: 335,
                                    duration: '1 year',
                                    julian_day: 2451558
                                },
                                entity_version_project_rels: [
                                    {
                                        calendar: 'julian'
                                    }
                                ]
                            } as InfRole,
                            isCircular: false,
                            isOutgoing: false,
                            targetClassPk: 22,
                            isDisplayRoleForRange: true,
                            _timePrimitive: {
                                timePrimitive: {
                                    fk_class: 335,
                                    duration: '1 year',
                                    julian_day: 2451558
                                }
                            }
                        } as RoleDetail
                    }
                })
            }

        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px" class="d-flex">
                        <gv-te-ent-role-editable [parentPath]="parentPath" [index]="index"></gv-te-ent-role-editable>
                </div>
            </div>
        `
    })

    .add('TeEnt Role Editable | Place ', {
        context: {
            parentPath: ['_role_set_1'],
            index: '_role_1',
            initState: {
                _role_set_1: new RoleSet({
                    _role_list: {
                        _role_1: {
                            role: {
                                fk_property: 152,
                                place: {
                                    fk_class: 51,
                                    lat: 12,
                                    long: 12
                                }
                            } as InfRole,
                            isCircular: false,
                            isOutgoing: true,
                            isDisplayRoleForRange: true,
                            _place: {}
                        } as RoleDetail
                    }
                })
            }

        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px" class="d-flex">
                        <gv-te-ent-role-editable [parentPath]="parentPath" [index]="index"></gv-te-ent-role-editable>
                </div>
            </div>
        `
    })
