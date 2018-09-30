import { crm } from 'app/core/active-project/_mock-data';
import { RoleDetail } from 'app/core/state/models';
import { appellation, language, place, role, roleWithAppellation, roleWithLanguage, roleWithPlace, roleWithTemporalEntity, roleWithTimePrimitive, temporal_entity, time_primitive } from '../_mock-data';
import { RoleDetailService } from './role-detail';
import { LangDetailService } from './lang-detail';
import { AppeDetailService } from './appe-detail';
import { PlaceDetailService } from './place-detail';
import { TimePrimitveDetailService } from './time-primitive-detail';
import { TeEntDetailService } from './te-ent-detail';
import { PeItDetailService } from './pe-it-detail';
import { DataUnitService } from './data-unit';
import { RoleSetService } from './role-set';
import { ExistenceTimeDetailService } from './existence-time-detail';
import { TestBed } from '@angular/core/testing';

describe('RoleDetailService', () => {
    let service: RoleDetailService;
    let roleSetServiceSpy: jasmine.SpyObj<RoleSetService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('RoleSetService', ['createState']);

        TestBed.configureTestingModule({
            providers: [
                RoleDetailService,
                LangDetailService,
                AppeDetailService,
                PlaceDetailService,
                TimePrimitveDetailService,
                TeEntDetailService,
                PeItDetailService,
                DataUnitService,
                { provide: RoleSetService, useValue: spy },
                ExistenceTimeDetailService
            ]
        })

        service = TestBed.get(RoleDetailService);
        roleSetServiceSpy = TestBed.get(RoleSetService);

    });


    it('#createState should create a RoleDetail where _place.place equals given place', () => {
        expect(service.createState(undefined, roleWithPlace, crm, undefined)._place.place).toBe(place)
    });

    it('#createState should create a RoleDetail where _lang.language equals given appellation', () => {
        expect(service.createState(undefined, roleWithLanguage, crm, undefined)._lang.language).toBe(language)
    });

    it('#createState should create a RoleDetail where _appe.appellation equals given appellation', () => {
        expect(service.createState(undefined, roleWithAppellation, crm, undefined)._appe.appellation).toBe(appellation)
    });

    it('#createState should create a RoleDetail where _timePrimitive.timePrimitive equals given timePrimitive', () => {
        expect(service.createState(undefined, roleWithTimePrimitive, crm, undefined)._timePrimitive.timePrimitive).toBe(time_primitive)
    });

    it('#createState should create a RoleDetail where _leaf_peIt.fkClass equals given fkClass', () => {
        expect(service.createState({ targetClassPk: 989 }, role, crm, undefined)._leaf_peIt.fkClass).toBe(989)
    });

    it('#createState should create a RoleDetail where _teEnt.teEnt equals given teEnt', () => {
        expect(service.createState(undefined, roleWithTemporalEntity, crm, undefined)._teEnt.teEnt).toBe(temporal_entity)
    });
});
