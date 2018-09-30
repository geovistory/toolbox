import { TestBed } from '@angular/core/testing';
import { crm } from 'app/core/active-project/_mock-data';
import { InfRole } from 'app/core/sdk/models';
import { RoleDetail, RoleSet } from '../../models';
import { AppeDetailService } from './appe-detail';
import { DataUnitService } from './data-unit';
import { ExistenceTimeDetailService } from './existence-time-detail';
import { LangDetailService } from './lang-detail';
import { PeItDetailService } from './pe-it-detail';
import { PlaceDetailService } from './place-detail';
import { RoleDetailService } from './role-detail';
import { RoleSetService } from './role-set';
import { TeEntDetailService } from './te-ent-detail';
import { TimePrimitveDetailService } from './time-primitive-detail';

class MockedStateCreatorClass {
    createState = () => ('foo');
}

describe('RoleSetService', () => {
    let roleSetService: RoleSetService;
    let role1, role2;

    beforeEach(() => {
        role1 = new InfRole({ pk_entity: 1, fk_entity: 2, fk_temporal_entity: 3, fk_property: 363 });
        role2 = new InfRole({ pk_entity: 33, fk_entity: 2, fk_temporal_entity: 3, fk_property: 363 });

        TestBed.configureTestingModule({
            providers: [
                RoleSetService,
                RoleDetailService,
                { provice: LangDetailService, useValue: new MockedStateCreatorClass() },
                { provice: AppeDetailService, useValue: new MockedStateCreatorClass() },
                { provice: PlaceDetailService, useValue: new MockedStateCreatorClass() },
                { provice: TimePrimitveDetailService, useValue: new MockedStateCreatorClass() },
                { provice: TeEntDetailService, useValue: new MockedStateCreatorClass() },
                { provice: PeItDetailService, useValue: new MockedStateCreatorClass() },
                { provice: DataUnitService, useValue: new MockedStateCreatorClass() },
                { provice: ExistenceTimeDetailService, useValue: new MockedStateCreatorClass() }
            ]
        })

        roleSetService = TestBed.get(RoleSetService);
    });

    it('#createState should return a RoleSet with _role_list of given InfRoles', () => {


        expect(roleSetService.createState(new RoleSet({ isOutgoing: true }), [role1, role2], crm, {})._role_list['1'].isOutgoing)
            .toBe(true)
    });

});
