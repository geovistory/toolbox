import { ConfigurationPipesService, DisplayType, Field, SectionName } from '@kleiolab/lib-redux';
import { DfhClass } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { ActiveProjectService } from '../../../../../core/active-project/active-project.service';
import { CommentMenuModule } from '../../../../../shared/components/comment-menu/comment-menu.module';
import { InitStateModule } from '../../../../../shared/components/init-state/init-state.module';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_02_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2022-02-09';
import { PROFILE_16_INTERACTIONS_S_2022_02_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2022-02-09';
import { PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2022-01-18';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { PROFILE_8_MARITIME_HISTOR_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2022-01-18';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataModule } from '../../../data.module';
import { FactoidPropertyMappingComponent } from './factoid-property-mapping.component';

/*****************************************************************************
 * MOCK services
 *****************************************************************************/
const initialSchemaObects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_16_INTERACTIONS_S_2022_02_09, // add social interactions profile
      PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, // add biographical profile
      PROFILE_8_MARITIME_HISTOR_2022_01_18, // add maritime profile
      PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 // add phyical profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  }),
  GvSchemaObjectMock.project1, // add project and its default language
]
class ConfigurationPipesServiceMock {
  pipeSection(pkClass: number, displayType: DisplayType, section: SectionName) {
    if (section == 'basic') {
      return of([
        { label: 'SELECT ME', property: { fkProperty: 2 }, targetClasses: [21] }])
    }
    if (section == 'metadata') {
      return of([
        { label: 'property label metadata 1', property: { fkProperty: 3 } },
        { label: 'property label metadata 2', property: { fkProperty: 4 } }])
    }
    if (section == 'specific') {
      return of([
        { label: 'property label specific 1', property: { fkProperty: 5 } },
        { label: 'property label specific 2', property: { fkProperty: 6 } }])
    }
    if (section == 'simpleForm') return of([])
  }
  pipeClassesEnabledByProjectProfiles(): Observable<Partial<DfhClass>[]> {
    return of([
      { pk_class: 21, basic_type: 8 },
      { pk_class: 21, basic_type: 8 },
      { pk_class: 21, basic_type: 8 },
      { pk_class: 21, basic_type: 8 }
    ])
  }
  pipeClassLabel(pkClass: number): Observable<string> {
    let toReturn = '';
    if (pkClass == 21) toReturn = 'Person';
    if (pkClass == 61) toReturn = 'Birth';
    if (pkClass == 51) toReturn = 'Place';
    return of(toReturn)
  }
  pipeFields(pkClass: number, noNesting = false): Observable<Partial<Field>[]> {
    return of([{
      property: {
        fkProperty: 2
      },
      targetClasses: [21]
    }])
  }
}
class ActiveProjectServiceMock {
  sys$ = {
    config$: {
      main$: new BehaviorSubject(SysConfigValueMock.SYS_CONFIC_VALID)
    }
  }
  dfh$ = {
    property$: {
      by_pk_property$: {
        key: (pk) => new BehaviorSubject({
          21: {
            identifier_in_namespace: 'P9999'
          }
        })
      }
    }
  }
  dat$ = {
    column$: {
      by_fk_digital$: {
        key: pkDigital => new BehaviorSubject({
          11: { pk_entity: 11 },
          12: { pk_entity: 12 },
          13: { pk_entity: 13 },
          14: { pk_entity: 14 },
          15: { pk_entity: 15 }
        })
      }
    },
    class_column_mapping$: {
      by_fk_column$: {
        key: (pk) => {
          if (pk == 11) return new BehaviorSubject({ 41: { pk_entity: 41, fk_column: 11, fk_class: 21 } })
          if (pk == 12) return new BehaviorSubject({ 42: { pk_entity: 42, fk_column: 12, fk_class: 61 } })
          if (pk == 13) return new BehaviorSubject({ 43: { pk_entity: 43, fk_column: 13, fk_class: 21 } })
          if (pk == 14) return new BehaviorSubject({ 44: { pk_entity: 44, fk_column: 14, fk_class: 51 } })
          return new BehaviorSubject({})
        }
      }
    },
    text_property$: {
      by_fk_entity__fk_system_type$: {
        key: (pk) => {
          if (pk == '41_3295') return new BehaviorSubject({ 51: { pk_entity: 51, string: 'Person\'s name' } })
          if (pk == '42_3295') return new BehaviorSubject({ 52: { pk_entity: 52, string: 'His birth' } })
          if (pk == '43_3295') return new BehaviorSubject({ 53: { pk_entity: 53, string: 'His mother' } })
          if (pk == '44_3295') return new BehaviorSubject({ 53: { pk_entity: 53, string: 'Place of birth' } })
          return new BehaviorSubject({})
        }
      }
    }
  }
}
/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(FactoidPropertyMappingComponent, {
  declareComponent: false,
  imports: [
    CommentMenuModule,
    DataModule,
    InitStateModule,
  ],
  providers: [
    { provide: ConfigurationPipesService, useClass: ConfigurationPipesServiceMock },
    { provide: ActiveProjectService, useClass: ActiveProjectServiceMock }
  ]
})
  .add('FactoidPropertyMappingComponent', {
    context: {
      fm: {
        pkClass: 21,
        pkDigital: 11
      },
      fpm1: {
        pkProperty: 2
      },
      fpm2: {
        pkProperty: 2,
        pkColumn: 11
      },
      fpm3: {
        pkProperty: 2,
        pkColumn: 13,
        default: { pkEntity: 8 }
      },
      schemaObjects: initialSchemaObects,
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <span style="width:100%; display:flex; flex-direction:row; justify-content:center;">Empty</span>
        <div style="display:flex; flex-direction:row; justify-content:center">
            <gv-factoid-property-mapping style="width:800px" [fm]="fm"></gv-factoid-property-mapping>
        </div>

        <br/>
        <span style="width:100%; display:flex; flex-direction:row; justify-content:center;">with property</span>
        <div style="display:flex; flex-direction:row; justify-content:center">
            <gv-factoid-property-mapping style="width:800px" [fm]="fm" [fpm]="fpm1"></gv-factoid-property-mapping>
        </div>

        <br/>
        <span style="width:100%; display:flex; flex-direction:row; justify-content:center;">with property + col mapping</span>
        <div style="display:flex; flex-direction:row; justify-content:center">
            <gv-factoid-property-mapping style="width:800px" [fm]="fm" [fpm]="fpm2"></gv-factoid-property-mapping>
        </div>

        <br/>
        <span style="width:100%; display:flex; flex-direction:row; justify-content:center;">with property + col mapping + default value</span>
        <div style="display:flex; flex-direction:row; justify-content:center">
            <gv-factoid-property-mapping style="width:800px" [fm]="fm" [fpm]="fpm3"></gv-factoid-property-mapping>
        </div>
    `
  })
