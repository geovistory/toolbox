import { APP_INITIAL_STATE } from '@kleiolab/lib-redux';
import { GvLoadSubfieldPageReq, GvPaginationObject, PaginatedStatementsControllerService } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { InfAppellationMock } from 'projects/lib-queries/src/__tests__/helpers/data/auto-gen/InfAppellationMock';
import { InfStatementMock } from 'projects/lib-queries/src/__tests__/helpers/data/auto-gen/InfStatementMock';
import { ProInfoProjRelMock } from 'projects/lib-queries/src/__tests__/helpers/data/auto-gen/ProInfoProjRelMock';
import { IAppStateMock } from 'projects/lib-queries/src/__tests__/helpers/data/IAppStateMock';
import { subfieldAppeHasAppeString } from 'projects/__test__/data/SubfieldMock';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BaseModule } from '../../base.module';
import { SubfieldComponent } from './subfield.component';

class MockPaginatedStatementsControllerService {

  paginatedStatementsControllerLoadSubfieldPage(
    gvLoadSubfieldPageReq?: GvLoadSubfieldPageReq
  ): Observable<GvPaginationObject> {
    return new BehaviorSubject({
      count: 1,
      paginatedStatements: [
        InfStatementMock.NAME_1_TO_APPE.pk_entity
      ],
      schemas: {
        inf: {
          statement: [
            InfStatementMock.NAME_1_TO_APPE
          ],
          appellation: [
            InfAppellationMock.JACK_THE_FOO
          ]
        },
        pro: {
          info_proj_rel: [
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE
          ]
        }
      }
    })
  }
}

export default sandboxOf(SubfieldComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
  ],
  providers: [
    { provide: APP_INITIAL_STATE, useValue: IAppStateMock.stateProject1 },
    { provide: PaginatedStatementsControllerService, useClass: MockPaginatedStatementsControllerService }
  ]
})
  .add('Subfield | type: AppellationVT ', {
    context: {
      subfield: subfieldAppeHasAppeString,
      pkEntity: 123,
      showOntoInfo$: of(false)
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-subfield [subfield]="subfield" [pkEntity]="pkEntity" [showOntoInfo$]="showOntoInfo$"></gv-subfield>
      </div>
      <div>

      </div>
    </div>
    `
  })
