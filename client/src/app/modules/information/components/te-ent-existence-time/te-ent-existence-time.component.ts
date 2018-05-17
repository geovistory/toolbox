import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InfRole, InfTemporalEntity, TimePrimitive, EntityEditorService } from 'app/core';
import { TeEntService } from '../../shared/te-ent.service';
import { ExistenceTime } from '../existence-time';
import { RoleSetComponent } from '../role-set/role-set.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gv-te-ent-existence-time',
  templateUrl: './te-ent-existence-time.component.html',
  styleUrls: ['./te-ent-existence-time.component.scss']
})
export class TeEntExistenceTimeComponent implements OnInit, OnDestroy {

  /**
   * Inputs
   */
  @Input() teEnt: InfTemporalEntity;
  @Input() state: 'view' | 'editable' | 'edit';
  /**
   * Properties
   */
  existenceTime: ExistenceTime;
  subs: Subscription[] = [];

  constructor(
    public entityEditor: EntityEditorService,
    private teEntService: TeEntService
  ) { }

  ngOnDestroy() {
    this.subs.forEach(sub=>sub.unsubscribe())
  }

  ngOnInit() {
    this.setExistenceTime(this.teEnt);
  }

  setExistenceTime(teEnt: InfTemporalEntity) {
    this.subs.push(  this.teEntService.buildExistenceTime(teEnt).subscribe((existenceTime: ExistenceTime) => {
      this.existenceTime = existenceTime;
    }));
  }

  /**
   * Called when a user submits a new existence time
   * @param existenceTime the new existence time
   */
  onSubmitExistenceTime(existenceTime: ExistenceTime) {

    this.state = 'edit';

    this.subs.push(this.teEntService.upsertExistenceTime(existenceTime, this.teEnt).subscribe(teEnt => {

      this.setExistenceTime(teEnt);

      this.state = 'editable';

    }))
  }

}
