import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Project } from '../shared/sdk/models/Project';
import { ProjectApi } from '../shared/sdk/services/custom/Project';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { PersistentItemApi } from '../shared/sdk/services/custom/PersistentItem';

@Component({
  selector: 'gv-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {


  loading: boolean = false;
  errorMessages: any;
  project:Project;
  id:number;

  // Statistics
  dataUnitsCount: number;


  // Tour logic
  activeSlideId:string;
  steps = {
    "step1": false,
    "step2": false,
    "step3": false,
    "step4": false,
    "step5": false
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectApi: ProjectApi,
    private activeProjectService: ActiveProjectService,
    private persistentItemApi: PersistentItemApi
  ) {
    this.id = activatedRoute.snapshot.parent.params['id'];
    activeProjectService.onProjectChange().subscribe((project:Project) => {
      this.project = project;
    })

  }

  activateStep(stepId:string) {
    // deactivate all
    for (let key in this.steps) {
      this.steps[key] = false;
    }

    // activate step
    if (this.steps.hasOwnProperty(stepId)){
      this.steps[stepId] = true;
      this.activeSlideId = stepId;
    }
  }
  stopTour(){
    this.activateStep('');
    this.activeSlideId = undefined;
  }

  onSlide(event){
    this.activateStep(event.current);
  }

  ngOnInit() {
    this.activeProjectService.setActiveProject(this.id);

    this.persistentItemApi.searchInProject(this.id,'',1, 1)
    .subscribe(
      (response) => {
        this.dataUnitsCount = parseInt(response.totalCount);
        this.loading = false
      },
      error => {
        // TODO: Alert
        this.errorMessages = error.error.details.messages;
        this.loading = false;
      }
    );

  }

  }
