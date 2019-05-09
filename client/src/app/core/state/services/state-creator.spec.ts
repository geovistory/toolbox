import { createRoleDetail, createPropertyField, createPlaceDetail, createTimePrimitveDetail, createAppeDetail, createLangDetail, createFieldList, createPeItDetail, createEntityAssociationDetail } from './state-creator';
import { roleWithPlace, place, roleWithLanguage, language, roleWithAppellation, appellation, roleWithTimePrimitive, time_primitive, role, roleWithTemporalEntity, temporal_entity, property, temporalEntityBirth } from './_mock-data';
import { crm } from 'app/core/active-project/_mock-data';
import { PropertyField, ExistenceTimeDetail, FieldList } from 'app/core/state/models';
import { InfPersistentItem, InfEntityAssociation } from 'app/core/sdk';
import { ComConfig } from 'app/core/config/com-config';


describe('StateCreator', () => {


    beforeEach(() => {

    });

    /***************************************************
     * createPeIt specs
     ***************************************************/
    it('#createPeIt should create a PeItDetail for creating a new person', () => {
        expect(((createPeItDetail({}, new InfPersistentItem({ fk_class: 21 }), crm, { pkUiContext: ComConfig.PK_UI_CONTEXT_DATAUNITS_CREATE }))
            ._fields._1192_ingoing as PropertyField)._role_list['_undefined']._teEnt._fields)
            .toBeTruthy()
    });

    /***************************************************
     * createFieldList specs
     ***************************************************/
    it('#createFieldList should create a FieldList with an ExistenceTimeDetail', () => {
        expect((createFieldList(temporalEntityBirth.fk_class, [roleWithTimePrimitive], [], crm, undefined)._field_48 as ExistenceTimeDetail)._fields._72_outgoing._role_list._1.role).toEqual(roleWithTimePrimitive)
    });
    /***************************************************
     * createRoleDetail specs
     ***************************************************/

    it('#createRoleDetail should create a RoleDetail where _place.place equals given place', () => {
        expect(createRoleDetail(undefined, roleWithPlace, crm, undefined)._place.place).toBe(place)
    });

    it('#createRoleDetail should create a RoleDetail where _lang.language equals given appellation', () => {
        expect(createRoleDetail(undefined, roleWithLanguage, crm, undefined)._lang.language).toBe(language)
    });

    it('#createRoleDetail should create a RoleDetail where _appe.appellation equals given appellation', () => {
        expect(createRoleDetail(undefined, roleWithAppellation, crm, undefined)._appe.appellation).toBe(appellation)
    });

    it('#createRoleDetail should create a RoleDetail where _timePrimitive.timePrimitive equals given timePrimitive', () => {
        expect(createRoleDetail(undefined, roleWithTimePrimitive, crm, undefined)._timePrimitive.timePrimitive).toBe(time_primitive)
    });

    it('#createRoleDetail should create a RoleDetail where _leaf_peIt.fkClass equals given fkClass', () => {
        expect(createRoleDetail({ targetClassPk: 989 }, role, crm, undefined)._leaf_peIt.fkClass).toBe(989)
    });

    it('#createRoleDetail should create a RoleDetail where _teEnt.teEnt equals given teEnt', () => {
        expect(createRoleDetail(undefined, roleWithTemporalEntity, crm, undefined)._teEnt.teEnt).toBe(temporal_entity)
    });

    /***************************************************
     * createPropertyField specs
     ***************************************************/

    it('#createPropertyField should return a PropertyField with _role_list of that contains a RoleDetail with the right key', () => {
        expect(createPropertyField(new PropertyField({ isOutgoing: true, property }), [role], crm, { pkUiContext: ComConfig.PK_UI_CONTEXT_DATAUNITS_CREATE })._role_list['_1'].isOutgoing).toBe(true)
    });

    /***************************************************
     * create<Value>Detail specs
     ***************************************************/

    it('#createPlaceDetail should return an object containg given place', () => {
        expect(createPlaceDetail(undefined, place, undefined, undefined).place).toBe(place)
    });

    it('#createTimePrimitveDetail should return an object containg given time_primitive', () => {
        expect(createTimePrimitveDetail(undefined, time_primitive, undefined, undefined).timePrimitive).toBe(time_primitive)
    });

    it('#createAppeDetail should return an object containg given appellation', () => {
        expect(createAppeDetail(undefined, appellation, undefined, undefined).appellation).toBe(appellation)
    });

    it('#createLangDetail should return an object containg given language', () => {
        expect(createLangDetail(undefined, language, undefined, undefined).language).toBe(language)
    });

    /***************************************************
     * create specs
     ***************************************************/
    it('#createEntityAssociation should create a entityAssociationDetail for creating a new section of a source', () => {
        expect(((createEntityAssociationDetail(
            { isOutgoing: false },
            {
                fk_property: 1015,
                fk_info_range: 99,
                // domain_pe_it: {
                //     domain_entity_associations: [
                //         { TODO: add a predefined peIt type for the create form
                //         }
                //     ]
                // }
            } as InfEntityAssociation,
            crm,
            { pkUiContext: ComConfig.PK_UI_CONTEXT_SOURCES_CREATE }
        ))._peIt._fields._100005_ingoing as PropertyField)._role_list['_undefined']._teEnt._fields).toBeTruthy()
    });




});
