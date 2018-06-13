import { sandboxOf } from 'angular-playground';
import { DfhClass, InfRole } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { RoleDetail, RoleSet } from '../../../information.models';
import { Information2Module } from '../../../information2.module';
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
                _role_set_1: {
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
                            targetDfhClass: {
                                dfh_pk_class: 22,
                                dfh_identifier_in_namespace: 'E2',
                                dfh_standard_label: 'Temporal Entity',
                                pk_entity: 787,
                                entity_version: 1,
                                notes: null,
                                tmsp_creation: '2018-06-12T16:17:27.562Z',
                                tmsp_last_modification: '2018-06-12T16:17:27.562Z',
                                sys_period: '["2018-06-12 16:17:27.562493+00",)'
                            } as DfhClass,
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
                } as RoleSet
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
