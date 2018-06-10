import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { PeItCreateFormComponent } from './pe-it-create-form.component';
import { mockPerson } from './sandbox.mock';
import { Information2Module } from '../../../information2.module';


export default sandboxOf(PeItCreateFormComponent, {
  imports: [
    InitStateModule,
    Information2Module
  ],
  declareComponent: false
})
  .add('PeIt Create Form | Person ', {
    context: {
      model: {},
      initState: {
        _peIt_create_form: mockPerson
      },
      basePath: ['_peIt_create_form']
    },
    template: `
    <gv-init-state [initState]="initState"></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
        <div style="width:430px;height:400px" class="d-flex">
                <gv-pe-it-create-form [basePath]="basePath"></gv-pe-it-create-form>
        </div>
    </div>
    
    
        `
  })



