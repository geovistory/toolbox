import { Component, OnInit, Input } from '@angular/core';
import { InfRole, InfTemporalEntity, TimePrimitive } from 'app/core';
import { TeEntService } from '../../shared/te-ent.service';
import { ExistenceTime } from '../existence-time';
import { RoleSetComponent } from '../role-set/role-set.component';

@Component({
  selector: 'gv-te-ent-existence-time',
  templateUrl: './te-ent-existence-time.component.html',
  styleUrls: ['./te-ent-existence-time.component.scss']
})
export class TeEntExistenceTimeComponent implements OnInit {

  /**
   * Inputs
   */
  @Input() teEnt: InfTemporalEntity;
  @Input() state: 'view' | 'editable' | 'edit';
  /**
   * Properties
   */
  existenceTime: ExistenceTime;

  constructor(
    private teEntService: TeEntService
  ) { }

  ngOnInit() {
    this.teEntService.buildExistenceTime(this.teEnt).subscribe((existenceTime: ExistenceTime) => {
      this.existenceTime = existenceTime;
    });
  }



  /**
 * Called when a user submits a new existence time
 * @param existenceTime the new existence time
 */
  onSubmitExistenceTime(existenceTime: ExistenceTime) {
    let ext = new ExistenceTime()

    ext.p81a = new TimePrimitive()
    ext.p81a.duration = '1 year'
    ext.p81a.calendar= "gregorian"
    ext.p81a.julianDay = 2415021;

    ext.p81b = new TimePrimitive();
    ext.p81b.duration = '1 year'
    ext.p81a.calendar= "gregorian"
    ext.p81a.julianDay = 2451545;
    this.teEntService.updateExistenceTime(ext, this.teEnt)
  }

}
