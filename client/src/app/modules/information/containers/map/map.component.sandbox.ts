import { sandboxOf } from 'angular-playground';

import { MapComponent } from './map.component';
import { Information2Module } from '../../information.module';


export default sandboxOf(MapComponent, {
  imports: [
    Information2Module
  ],
  declarations: [
  ],
  providers: [
  ],
  declareComponent: false
})
  .add('Map', {
    context: {

    },
    template: `
      <div class="d-flex flex-row">
        <div class="d-flex flex-column gv-grow-1">
          <div class="gv-grow-1">
              <gv-map></gv-map>
          </div>
        </div>
      </div>
    `
  })
