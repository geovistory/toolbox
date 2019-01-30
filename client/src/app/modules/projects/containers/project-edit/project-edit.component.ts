import { Component, HostBinding } from '@angular/core';
import { ActiveProjectService, ProjectDetail, Panel, Tab } from 'app/core';
import { Router, ActivatedRoute, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'gv-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent {

  @HostBinding('class.gv-full') full = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  allTabs$: Observable<Tab[]>;

  constructor(
    public p: ActiveProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

    const id = activatedRoute.snapshot.params['pkActiveProject'];

    this.p.initProject(id);
    this.p.initProjectCrm(id);
    
    this.allTabs$ = this.p.panels$.map(panels => {
      let allTabs = []
      panels.forEach(panel => {
        allTabs = [...allTabs, ...panel.tabs]
      })
      return allTabs
    })

  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  trackByPath(index, item: Tab) {
    return item.path.join('');
  }
  closeList() {
    let urlTree = this.router.parseUrl(this.router.url);

    this.p.pkProject$.pipe(
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

  dropTab(event: CdkDragDrop<number>) {
    // .data contains the panelIndex
    this.p.moveTab(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }
}
