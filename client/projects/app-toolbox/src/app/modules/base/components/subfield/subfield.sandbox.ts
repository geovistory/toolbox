import { APP_INITIAL_STATE } from '@kleiolab/lib-redux';
import { PaginatedStatementsControllerService } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { SubfieldMock } from 'projects/__test__/data/SubfieldMock';
import { MockPaginatedStatementsControllerService } from 'projects/__test__/mock-services/MockPaginatedStatementsControllerService';
import { of } from 'rxjs';
import { BaseModule } from '../../base.module';
import { SubfieldComponent } from './subfield.component';

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
      subfield: SubfieldMock.subfieldAppeHasAppeString,
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
