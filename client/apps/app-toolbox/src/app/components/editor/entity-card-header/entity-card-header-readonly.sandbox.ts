import { FormsModule } from '@angular/forms';
import { ActiveProjectPipesService } from '@kleiolab/lib-redux';
import { sandboxOf } from 'angular-playground';
import { BaseModule } from '../../../modules/base/base.module';
import { READ_ONLY } from '../../../tokens/READ_ONLY';
import { InitStateModule } from '../../misc/init-state/init-state.module';
import { EntityCardHeaderComponent } from './entity-card-header.component';
import { ActiveProjectPipesServiceMock, eCHcontext, eCHtemplate } from './entity-card-header.sandbox';


/*****************************************************************************
 * Sandboxes
 *****************************************************************************/

export default sandboxOf(EntityCardHeaderComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    FormsModule,
    InitStateModule
  ],
  providers: [
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
    { provide: READ_ONLY, useValue: true },
  ]
})
  .add('Readonly', {
    context: eCHcontext,
    template: eCHtemplate
  })
