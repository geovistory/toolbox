import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Project } from '../shared/sdk/models/Project';
import { ProjectApi } from '../shared/sdk/services/custom/Project';

@Component({
  selector: 'gv-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {


  loading: boolean = false;
  errorMessages: any;
  project:Project;
  id:any;

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
    private projectApi: ProjectApi
  ) {
    this.id = activatedRoute.snapshot.parent.params['id'];

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
    this.getProject();
  }

  getProject() {
    this.loading = true;
    this.projectApi.find({
      where: { "id": this.id }
    }).subscribe(
      (projects: Project[]) => {
        this.project = projects[0];
        this.loading = false
      });
    }

  }
