import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { TeEntExistenceTimeComponent, TeEntExistenceTimeSubStore } from '../te-ent-existence-time.component';
import { EntityEditorService } from 'app/core';
import { TeEntService } from '../../../shared/te-ent.service';
import { IExistenceTimeState } from '../te-ent-existence-time.model';
import { NgRedux, WithSubStore } from '@angular-redux/store';
import { ExistenceTimeActions } from '../te-ent-existence-time.actions';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { slideInOut } from '../../../shared/animations';

@WithSubStore(TeEntExistenceTimeSubStore)
@Component({
  selector: 'gv-te-ent-existence-time-add',
  templateUrl: './te-ent-existence-time-add.component.html',
  styleUrls: ['./te-ent-existence-time-add.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntExistenceTimeAddComponent),
      multi: true
    }
  ]
})
export class TeEntExistenceTimeAddComponent extends TeEntExistenceTimeComponent implements OnInit {

  constructor(
    public entityEditor: EntityEditorService,
    protected teEntService: TeEntService,
    protected ngRedux: NgRedux<IExistenceTimeState>,
    protected actions: ExistenceTimeActions,
    protected stateCreator: StateCreatorService   
  ) {
    super(entityEditor, teEntService, ngRedux, actions, stateCreator)
    }

  initTeEntExistenceTimeChildren() {
  }

}
