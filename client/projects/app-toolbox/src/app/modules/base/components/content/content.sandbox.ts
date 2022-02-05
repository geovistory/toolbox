import { SectionName } from '@kleiolab/lib-queries';
import { APP_INITIAL_STATE } from '@kleiolab/lib-redux';
import { GvFieldPageReq, GvFieldPageScope, GvPaginationObject, GvSubfieldPageInfo, InfResource, InfStatement, ProInfoProjRel, StatementTargetEntity, StatementWithTarget, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { P_979_CARRIERS_PROVIDED_BY_ID } from 'projects/app-toolbox/src/app/ontome-ids';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { createStatementWithTarget } from 'projects/__test__/data/auto-gen/api-responses/GvPaginationObjectMock';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { OmitEntity } from 'projects/__test__/data/auto-gen/gvDB/local-model.helpers';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { PubAccountMock } from 'projects/__test__/data/auto-gen/gvDB/PubAccountMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2022-01-18';
import { PROFILE_16_INTERACTIONS_S_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2022-01-18';
import { PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2022-01-18';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { PROFILE_8_MARITIME_HISTOR_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2022-01-18';
import { FieldMock } from 'projects/__test__/data/FieldMock';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { MockPaginationControllerForSandboxes } from 'projects/__test__/mock-services/MockPaginationControllerForSandboxes';
import { concat, keys, mergeDeepWith, values } from 'ramda';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BaseModule } from '../../base.module';
import { ContentComponent } from './content.component';

const inProjectScope: GvFieldPageScope = { inProject: IAppStateMock.stateProject1.activeProject.pk_project }
// mock schema objects to initialize sandboxes below
const initialSchemaObects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_16_INTERACTIONS_S_2022_01_18, // add social interactions profile
      PROFILE_12_BIOGRAPHICAL_BA_2022_01_18, // add biographical profile
      PROFILE_8_MARITIME_HISTOR_2022_01_18, // add maritime profile
      PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 // add phyical profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  }),
  GvSchemaObjectMock.project1, // add project and its default language
]
export class MockPageLoadService {
  warEntityPreviewSerial: number;
  proInfoProjRelSerial: number;
  infStatementSerial: number;
  infTemporalEntitySerial: number;
  infAppellationSerial: number;
  infPlaceSerial: number;
  infDimensionSerial: number
  infTimePrimitiveSerial: number;

  subfieldPageControllerLoadSubfieldPages(gvLoadSubfieldPageReqs?: GvFieldPageReq[]): Observable<GvPaginationObject> {
    // this.resetIdBase();
    console.log('REST API called: subfieldPageControllerLoadSubfieldPage')
    return new BehaviorSubject(this.handleRequests(gvLoadSubfieldPageReqs)).pipe(delay(250))

  }


  handleRequests(gvLoadSubfieldPageReqs?: GvFieldPageReq[]): GvPaginationObject {
    const results = gvLoadSubfieldPageReqs.map(req => this.generateData(req))
    let result: GvPaginationObject = { subfieldPages: [] };
    for (const obj of results) {
      result = mergeDeepWith(concat, result, obj);
    }
    return result;
  }

  generateData(req?: GvFieldPageReq): GvPaginationObject {

    // from manif prod type to expression
    if (req.page.property.fkProperty === P_979_CARRIERS_PROVIDED_BY_ID) {

    }

    // from expression to expression portions

    // from expression portions to transcriptions

    // generate response with emtpy field for some properties
    if ([1842, 1499, 1429, 133, 188, 1344, 1409].includes(req?.page?.property.fkProperty)) {
      return this.generateEmptyField(req)
    }

    else if (values(req.targets)[0].entityPreview) {
      return this.generateDataForEntity(req);
    }
  }

  generateEmptyField(req: GvFieldPageReq) {
    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          req,
          count: 0,
          paginatedStatements: []
        }
      ]
    }
    return paginationObject
  }

  generateDataForEntity(
    req: GvFieldPageReq,
  ): GvPaginationObject {
    const page = req.page
    const limit = page.limit
    const offset = page.offset
    const count = 46;
    const paginatedStatements: StatementWithTarget[] = []
    const subfieldPages: GvSubfieldPageInfo[] = [
      {
        req,
        count: count,
        paginatedStatements
      }
    ]

    const paginationObject: GvPaginationObject = { subfieldPages }

    for (let i = offset; i < (offset + limit); i++) {
      const resource: OmitEntity<InfResource> = {
        pk_entity: this.infTemporalEntitySerial + i,
        fk_class: parseInt(keys(req.targets)[0].toString())
        // fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
      }
      const entity: StatementTargetEntity = {
        resource: resource,
        entityPreview: {
          ...resource,
          project: ProProjectMock.PROJECT_1.pk_entity,
          fk_project: ProProjectMock.PROJECT_1.pk_entity,
          entity_label: 'Label of entity ' + resource.pk_entity
        }
      }

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.infStatementSerial + i,
        fk_subject_info: resource.pk_entity,
        fk_property: req.page.property.fkProperty,
        // fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON.dfh_pk_property,
        fk_object_info: page.source.fkInfo,
      }
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.proInfoProjRelSerial + i,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      paginatedStatements.push(createStatementWithTarget(statement, 1, { entity }, page.isOutgoing, projRel))


    }


    return paginationObject
  }

}

export default sandboxOf(ContentComponent, {
  declareComponent: false,
  imports: [
    InitStateModule,
    BaseModule,
  ],
  providers: [
    { provide: APP_INITIAL_STATE, useValue: IAppStateMock.stateProject1 },
    { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes }
  ]
})
  .add('Content  ', {
    context: {
      field: FieldMock.manifestationSingletonHasDefinition,
      source: { fkInfo: InfResourceMock.HABS_EMP_MANIF_PROD_TYPE.pk_entity },
      pkClass$: new BehaviorSubject(InfResourceMock.HABS_EMP_MANIF_PROD_TYPE.fk_class),
      scope: inProjectScope,
      showOntoInfo$: new BehaviorSubject(false),
      readonly$: new BehaviorSubject(false),
      sectionName: SectionName.linkedSources,
      selectedIndex: 0,
      schemaObjects: initialSchemaObects,

    },
    template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

    <div class="mat-bg-grey-500" style="padding: 40px">
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
        <button (click)="readonly$.next(!readonly$.value)">toggle readonly</button>

      </div>
      <div class="d-flex d-flex-direction-row justify-content-center mt-5">

        <gv-content [scope]="scope" [source]="source" [pkClass$]="pkClass$"
          [showOntoInfo$]="showOntoInfo$" [readonly$]="readonly$" [section]=sectionName
          [showEmptyFieldsOnInit]="true">
        </gv-content>

      </div>
    </div>
    `
  })
