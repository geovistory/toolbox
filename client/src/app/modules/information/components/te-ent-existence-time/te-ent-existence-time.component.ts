import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InfRole, InfTemporalEntity, TimePrimitive, EntityEditorService } from 'app/core';
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
   * Output
   */
  @Output() existenceTimeUpdated: EventEmitter<InfTemporalEntity> = new EventEmitter();

  /**
   * Properties
   */
  existenceTime: ExistenceTime;

  constructor(
    public entityEditor: EntityEditorService,
    private teEntService: TeEntService
  ) { }

  ngOnInit() {
    this.setExistenceTime(this.teEnt);
  }

  setExistenceTime(teEnt: InfTemporalEntity) {
    this.teEntService.buildExistenceTime(teEnt).subscribe((existenceTime: ExistenceTime) => {
      this.existenceTime = existenceTime;
    });
  }

  /**
   * Called when a user submits a new existence time
   * @param existenceTime the new existence time
   */
  onSubmitExistenceTime(existenceTime: ExistenceTime) {

    this.state = 'edit';

    this.teEntService.upsertExistenceTime(existenceTime, this.teEnt).subscribe(teEnt => {

      this.setExistenceTime(teEnt);

      this.existenceTimeUpdated.emit(teEnt);

      this.state = 'editable';

    })
  }

}
