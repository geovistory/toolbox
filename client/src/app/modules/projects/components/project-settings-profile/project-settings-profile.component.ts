import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectApi, Project } from 'app/core';


@Component({
  selector: 'gv-project-settings-profile',
  templateUrl: './project-settings-profile.component.html',
  styleUrls: ['./project-settings-profile.component.scss']
})
export class ProjectSettingsProfileComponent implements OnInit {
  loading: boolean = false;
  errorMessages: any;
  project:Project;
  id:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectApi: ProjectApi
  ) {
    this.id = activatedRoute.snapshot.parent.params['id'];

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
