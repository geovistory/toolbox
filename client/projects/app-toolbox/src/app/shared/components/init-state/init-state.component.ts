import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IAppState, StateFacade } from '@kleiolab/lib-redux/public-api';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { combineLatest, Observable, Subject } from 'rxjs';



@Component({
  selector: 'gv-init-state',
  templateUrl: './init-state.component.html',
  styleUrls: ['./init-state.component.scss']
})
export class InitStateComponent implements OnInit, AfterViewInit, OnDestroy {

  static readonly INIT_STATE = 'InitState::INIT_STATE';

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  /**
   * Input for the subStore slice used by the current sandboxState
   */
  @Input() initState: IAppState

  @Output() ok = new EventEmitter();

  initialized: boolean;

  waitForAll: Observable<any>[] = [];

  constructor(
    public p: ActiveProjectService,
    private state: StateFacade
  ) { }

  ngOnInit() {


    if (this.initState) {
      this.state.setState(this.initState)
    }

  }

  ngAfterViewInit() {

    combineLatest(this.waitForAll).subscribe(ok => {
      this.initialized = true;
      this.ok.emit()
    })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
