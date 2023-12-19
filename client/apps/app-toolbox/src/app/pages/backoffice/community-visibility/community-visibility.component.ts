import { Component, OnInit } from '@angular/core';
import { CommunityVisibilityService, VisibilityReport } from '@kleiolab/lib-sdk-lb4';
import { NgIf, NgFor, JsonPipe } from '@angular/common';

@Component({
    selector: 'gv-community-visibility',
    templateUrl: './community-visibility.component.html',
    styleUrls: ['./community-visibility.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, JsonPipe]
})
export class CommunityVisibilityComponent implements OnInit {
  report: VisibilityReport[]
  updating = false
  constructor(private commVis: CommunityVisibilityService) { }

  ngOnInit(): void {
    this.load()
  }

  async load() {
    this.report = await this.commVis.communityVisibilityControllerReportConflicts().toPromise()
  }

  async updateVisibility(classId: number, channel: string, onlyConflicting: boolean, newValue: boolean) {
    this.updating = true
    await this.commVis.communityVisibilityControllerUpdate(classId, channel, onlyConflicting, newValue).toPromise()
    this.load()
    this.updating = false
  }
}
