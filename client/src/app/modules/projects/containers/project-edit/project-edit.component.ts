import { Component, HostBinding } from '@angular/core';
import { ActiveProjectService, ProjectDetail } from 'app/core';
import { Router, ActivatedRoute, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'gv-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent {
  
  @HostBinding('class.gv-full') full = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  pkProject: number;
  project$: Observable<ProjectDetail>;

  constructor(
    private activeProjectService: ActiveProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.project$ = activeProjectService.activeProject$;

    const id = activatedRoute.snapshot.params['pkActiveProject'];

    this.activeProjectService.initProject(id);
    this.activeProjectService.initProjectCrm(id);

  }

  closeList() {
    let urlTree = this.router.parseUrl(this.router.url);

    this.activeProjectService.pkProject$.pipe(
      first(item => !!item),
      take(1)
    ).subscribe(p => {
      urlTree = {
        ...urlTree,
        root: new UrlSegmentGroup(
          urlTree.root.segments,
          {
            primary: new UrlSegmentGroup(
              [
                new UrlSegment('projects', {}),
                new UrlSegment(p.toString(), {}),
                new UrlSegment('edit', {})
              ],
              {
                detail: urlTree.root.children.primary.children.detail
              }
            )
          }
        )
      }
      const newUrl = this.router.serializeUrl(urlTree)
      this.router.navigateByUrl(newUrl)
    })

  }
}
