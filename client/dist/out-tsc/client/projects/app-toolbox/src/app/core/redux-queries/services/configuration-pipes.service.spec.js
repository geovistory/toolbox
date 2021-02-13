import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { SchemaObjectService } from 'projects/app-toolbox/src/app/core/redux-store/schema-object.service';
import { SDKBrowserModule } from '@kleiolab/lib-sdk-lb3';
import { BehaviorSubject } from 'rxjs';
import { first, toArray } from 'rxjs/operators';
import { DfhApiClassMock } from '__tests__/helpers/data/auto-gen/DfhApiClassMock';
import { PK_DEFAULT_CONFIG_PROJECT } from '__tests__/helpers/data/auto-gen/local-model.helpers';
import { ProClassFieldConfigMock } from '__tests__/helpers/data/auto-gen/ProClassFieldConfigMock';
import { IAppStateMock } from '__tests__/helpers/data/IAppStateMock';
import { fieldsOfManifestationSingleton } from '__tests__/helpers/data/positive-schema-objects/fields-of-manifestation-singleton';
import { project1 } from '__tests__/helpers/data/positive-schema-objects/project-1';
import { setAppState } from '__tests__/helpers/set-app-state';
import { ReduxQueriesModule } from '../redux-queries.module';
import { ConfigurationPipesService } from './configuration-pipes.service';
import { sysConfig } from '__tests__/helpers/data/positive-schema-objects/sys-config';
import { basicClassesAndProperties } from '__tests__/helpers/data/positive-schema-objects/basic-classes-and-properties';
import { DfhApiPropertyMock } from '__tests__/helpers/data/auto-gen/DfhApiPropertyMock';
describe('ConfigurationPipeService', () => {
    let ngRedux;
    let service;
    let schemaObjServcie;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SDKBrowserModule.forRoot(),
                ReduxQueriesModule
            ]
        });
        service = TestBed.get(ConfigurationPipesService);
        schemaObjServcie = TestBed.get(SchemaObjectService);
        ngRedux = TestBed.get(NgRedux);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    describe('#pipeClassFieldConfigs', () => {
        it('should return class config for class C365_NAMING', (done) => {
            setAppState(ngRedux, IAppStateMock.state1);
            // seeding data
            const gvSchemaObj = { pro: { class_field_config: [ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME] } };
            schemaObjServcie.storeGv(new BehaviorSubject(gvSchemaObj), PK_DEFAULT_CONFIG_PROJECT);
            // using pipe
            const q$ = service.pipeFieldConfigs(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME.fk_domain_class);
            // testing pipe
            const expectedSequence = [[ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME]];
            q$.pipe(first(), toArray())
                .subscribe(actualSequence => {
                expect(actualSequence).toEqual(expectedSequence);
            }, null, done);
        });
    });
    describe('#pipeFieldLabel', () => {
        it('should return label for EN_1111_IS_APPE_OF', (done) => {
            setAppState(ngRedux, IAppStateMock.state1);
            schemaObjServcie.storeGv(new BehaviorSubject(project1), PK_DEFAULT_CONFIG_PROJECT);
            schemaObjServcie.storeGv(new BehaviorSubject(basicClassesAndProperties), PK_DEFAULT_CONFIG_PROJECT);
            // using pipe
            const q$ = service.pipeFieldLabel(DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property, DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_property_domain, DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_property_range);
            // testing pipe
            const expectedSequence = [[]];
            q$.pipe(first(), toArray())
                .subscribe(actualSequence => {
                expect(actualSequence[0]).toEqual(DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_property_label);
            }, null, done);
        });
        it('should return label for 1762_HAS_DEFINITION', (done) => {
            setAppState(ngRedux, IAppStateMock.state1);
            schemaObjServcie.storeGv(new BehaviorSubject(project1), PK_DEFAULT_CONFIG_PROJECT);
            schemaObjServcie.storeGv(new BehaviorSubject(basicClassesAndProperties), PK_DEFAULT_CONFIG_PROJECT);
            // using pipe
            const q$ = service.pipeFieldLabel(DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_pk_property, DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_domain, DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_range);
            // testing pipe
            const expectedSequence = [[]];
            q$.pipe(first(), toArray())
                .subscribe(actualSequence => {
                expect(actualSequence[0]).toEqual(DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_property_label);
            }, null, done);
        });
    });
    describe('#pipeSubfieldTypeOfClass', () => {
        it('should return subfieldtype for EN_784_SHORT_TITLE', (done) => {
            setAppState(ngRedux, IAppStateMock.state1);
            schemaObjServcie.storeGv(new BehaviorSubject(sysConfig), PK_DEFAULT_CONFIG_PROJECT);
            schemaObjServcie.storeGv(new BehaviorSubject(basicClassesAndProperties), PK_DEFAULT_CONFIG_PROJECT);
            // using pipe
            const q$ = service.pipeSubfieldTypeOfClass(sysConfig.sys.config[0], DfhApiClassMock.EN_784_SHORT_TITLE.dfh_pk_class, -1);
            // testing pipe
            const expectedSequence = [sysConfig.sys.config[0].classes[DfhApiClassMock.EN_784_SHORT_TITLE.dfh_pk_class].valueObjectType];
            q$.pipe(first(), toArray())
                .subscribe(actualSequence => {
                expect(actualSequence).toEqual(expectedSequence);
            }, null, done);
        });
        it('should return subfieldtype for EN_785_TEXT', (done) => {
            setAppState(ngRedux, IAppStateMock.state1);
            schemaObjServcie.storeGv(new BehaviorSubject(sysConfig), PK_DEFAULT_CONFIG_PROJECT);
            schemaObjServcie.storeGv(new BehaviorSubject(basicClassesAndProperties), PK_DEFAULT_CONFIG_PROJECT);
            // using pipe
            const q$ = service.pipeSubfieldTypeOfClass(sysConfig.sys.config[0], DfhApiClassMock.EN_785_TEXT.dfh_pk_class, -1);
            // testing pipe
            const expectedSequence = [sysConfig.sys.config[0].classes[DfhApiClassMock.EN_785_TEXT.dfh_pk_class].valueObjectType];
            q$.pipe(first(), toArray())
                .subscribe(actualSequence => {
                expect(actualSequence).toEqual(expectedSequence);
            }, null, done);
        });
    });
    describe('#pipeFields', () => {
        it('should return correct fields of manifestation singleton', (done) => {
            setAppState(ngRedux, IAppStateMock.state1);
            schemaObjServcie.storeGv(new BehaviorSubject(basicClassesAndProperties), PK_DEFAULT_CONFIG_PROJECT);
            schemaObjServcie.storeGv(new BehaviorSubject(fieldsOfManifestationSingleton), PK_DEFAULT_CONFIG_PROJECT);
            schemaObjServcie.storeGv(new BehaviorSubject(project1), PK_DEFAULT_CONFIG_PROJECT);
            schemaObjServcie.storeGv(new BehaviorSubject(sysConfig), PK_DEFAULT_CONFIG_PROJECT);
            // using pipe
            const q$ = service.pipeFields(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class);
            // testing pipe
            const expectedSequence = [[]];
            q$.pipe(first(), toArray())
                .subscribe(actualSequence => {
                expect(actualSequence[0].length).toEqual(6);
            }, null, done);
        });
    });
    fdescribe('#pipeBasicAndSpecificFields', () => {
        it('should return correct fields of temporal entity', (done) => {
            // setAppState(ngRedux, IAppStateMock.state2)
            // const x = ngRedux.getState()
            // // using pipe
            // const q$ = service.pipeClassFieldConfigs(21)
            // // testing pipe
            // const expectedSequence = [[ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME]]
            // q$.pipe(first(), toArray())
            //   .subscribe(
            //     actualSequence => {
            //       expect(actualSequence).toEqual(expectedSequence)
            //     },
            //     null,
            //     done);
        });
        fit('should return correct fields of manifestation singleton', (done) => {
            setAppState(ngRedux, IAppStateMock.state1);
            schemaObjServcie.storeGv(new BehaviorSubject(basicClassesAndProperties), PK_DEFAULT_CONFIG_PROJECT);
            schemaObjServcie.storeGv(new BehaviorSubject(fieldsOfManifestationSingleton), PK_DEFAULT_CONFIG_PROJECT);
            schemaObjServcie.storeGv(new BehaviorSubject(project1), PK_DEFAULT_CONFIG_PROJECT);
            schemaObjServcie.storeGv(new BehaviorSubject(sysConfig), PK_DEFAULT_CONFIG_PROJECT);
            // using pipe
            const q$ = service.pipeBasicAndSpecificFields(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class);
            // testing pipe
            const expectedSequence = [[]];
            q$.pipe(first(), toArray())
                .subscribe(actualSequence => {
                console.log(JSON.stringify(actualSequence));
                const fs = actualSequence[0];
                expect(fs[0].placeOfDisplay.basicFields.position).toEqual(1);
                expect(fs[0].label).toEqual('has short title');
                expect(fs[1].label).toEqual('* reverse of: is appellation for language of*');
                expect(fs[2].label).toEqual('has manifestation singleton type');
                expect(fs[3].label).toEqual('has definition');
                expect(fs[4].label).toEqual('is representative manifestation singleton for');
                expect(fs[5].label).toEqual('* reverse of: created*');
            }, null, done);
        });
    });
});
//# sourceMappingURL=configuration-pipes.service.spec.js.map