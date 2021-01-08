import { sandboxOf } from 'angular-playground';
import { BehaviorSubject } from 'rxjs';
import { MapModule } from '../../map.module';
import { MapAndTimeContComponent } from './map-and-time-cont.component';
import { queryResults1 } from './map-and-time-cont.mock';


export default sandboxOf(MapAndTimeContComponent, {
  declareComponent: false,
  imports: [MapModule]
})
  .add('MapAndTimeContComponent | Preset ', {
    context: {
      data$: new BehaviorSubject(queryResults1),
      temporalFilter$: new BehaviorSubject<boolean>(true)
    },
    template: `
        <div style="width:800px; height:800px; border: 1px dashed red;" class="m-4 p-1">

          <gv-map-and-time-cont #c [data$]="data$"></gv-map-and-time-cont>

        </div>

        <button (click)="c.selectGeometriesOfEntity(206099)">Select geometries of entity 206099</button>
        <button (click)="c.selectGeometriesOfEntity()">Deselect geometries</button>


        `
  })


