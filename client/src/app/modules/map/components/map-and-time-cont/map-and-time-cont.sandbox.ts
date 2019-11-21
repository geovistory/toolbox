import { sandboxOf } from 'angular-playground';
import { BehaviorSubject } from 'rxjs';
import { MapModule } from '../../map.module';
import { MapAndTimeContComponent } from './map-and-time-cont.component';
import { data1 } from './map-and-time-cont.mock';


export default sandboxOf(MapAndTimeContComponent, {
  declareComponent: false,
  imports: [MapModule]
})
  .add('MapAndTimeContComponent | Preset ', {
    context: {
      data$: new BehaviorSubject(data1)
    },
    template: `
        <div style="width:800px;height:400px; margin: 30px;">

          <gv-map-and-time-cont [data$]="data$">
          </gv-map-and-time-cont>

        </div>

        `
  })


