import { Injectable } from '@angular/core';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4/public-api';
import { sandboxOf } from 'angular-playground';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { EntityPreviewComponent } from './entity-preview.component';
import { EntityPreviewModule } from './entity-preview.module';
const warEntityPreviews = [
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_FIRST_NAME,
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME,
  WarEntityPreviewMock.PERSON_1,
  WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER
]
/**
 * This service mocks the streamEntityPreview method
 */
@Injectable()
export class ActiveProjectPipesServiceMock extends ActiveProjectPipesService {
  pkProject$ = new BehaviorSubject(ProProjectMock.PROJECT_1.pk_entity)
  datNamespaces$ = new BehaviorSubject([DatNamespaceMock.SANDBOX_NAMESPACE])

  streamEntityPreview(pkEntity: number, forceReload?: boolean): Observable<WarEntityPreview> {
    // const previews = values(WarEntityPreviewMock) as WarEntityPreview[]
    const preview = warEntityPreviews.find((x) => x?.pk_entity === pkEntity)
    return new BehaviorSubject(preview).pipe(delay(1300))
  }
}

export default sandboxOf(EntityPreviewComponent, {
  declareComponent: false,
  imports: [EntityPreviewModule],
  providers: [
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
  ]
})
  .add('EntityPreview', {
    context: { pkEntity: WarEntityPreviewMock.PERSON_1.pk_entity },
    template: `
    <div style="padding:40px">
      <p>Default</p>
      <gv-entity-preview [pkEntity]="pkEntity"></gv-entity-preview>
      <br><br><br>

      <p>Open Menu on click</p>
      <gv-entity-preview [pkEntity]="pkEntity" [openTabOnClick]="true"></gv-entity-preview>
      <br><br><br>

      <p>Hide Class</p>
      <gv-entity-preview [pkEntity]="pkEntity" [hideClass]="true"></gv-entity-preview>
      <br><br><br>

    </div>

    `
  })
