import { sandboxOf } from 'angular-playground';

import { MapComponent } from './map.component';
import { InformationModule } from '../../information.module';
import { ViewerConfiguration } from 'angular-cesium';


export default sandboxOf(MapComponent, {
  imports: [
    InformationModule
  ],
  declarations: [
  ],
  providers: [
    ViewerConfiguration
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