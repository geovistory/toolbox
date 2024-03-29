import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InformationBasicPipesService } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectEditComponent } from '../../../projects/containers/project-edit/project-edit.component';
import { EditModeService } from '../../services/edit-mode.service';
import { READ_ONLY } from '../../tokens/READ_ONLY';

/**
 * This component prepares the configuration data and parameters
 * needed for the gv-entity-card
 */
@Component({
  selector: 'gv-entity-card-wrapper',
  templateUrl: './entity-card-wrapper.component.html',
  styleUrls: ['./entity-card-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EditModeService,
    { provide: READ_ONLY, useValue: true }
  ]
})
export class EntityCardWrapperComponent implements OnInit {
  pkProject: number;
  isChildOfProjectEdit: boolean;

  // params for gv-entity-card
  source: GvFieldSourceEntity
  pkClass$: Observable<number>
  showOntoInfo$: BehaviorSubject<boolean>;
  scope: GvFieldPageScope;

  constructor(
    private activatedRoute: ActivatedRoute,
    public p: ActiveProjectService,
    @Optional() private parentProjectEditComponent: ProjectEditComponent,
    private dataService: ReduxMainService,
    private b: InformationBasicPipesService,
    @Inject(READ_ONLY) public readonly: boolean,


  ) {
    this.pkProject = parseInt(this.activatedRoute.snapshot.params['pkActiveProject'], 10);
    this.isChildOfProjectEdit = !!this.parentProjectEditComponent;
    const pkEntity: number = parseInt(this.activatedRoute.snapshot.params['pkEntity'], 10);
    const community: boolean = this.activatedRoute.snapshot.data['community'];
    this.readonly = this.activatedRoute.snapshot.data['readonly'];


    this.initScope(community);

    this.initSource(pkEntity);

    this.initShowOntoInfo();

    this.initPkClass(pkEntity);

  }

  private initPkClass(pkEntity: number) {
    this.dataService.loadInfResource(pkEntity, this.pkProject);
    this.pkClass$ = this.b.pipeClassOfEntity(pkEntity);
  }

  private initShowOntoInfo() {
    this.showOntoInfo$ = new BehaviorSubject(false);
  }

  private initSource(pkEntity: number) {
    this.source = { fkInfo: pkEntity };
  }



  private initScope(community: boolean) {
    if (community) {
      this.scope = { inRepo: true };
    } else {
      this.scope = { inProject: this.pkProject };
    }
  }

  ngOnInit(): void {
    // initialize config date if this has not been done by parent component
    if (!this.isChildOfProjectEdit) this.initConfigData();
  }

  /**
   * initializes the configuration data in the store
   * needed by the child components
   */
  private initConfigData() {
    this.p.initProject(this.pkProject);
    this.p.initProjectConfigData(this.pkProject);
  }
}
