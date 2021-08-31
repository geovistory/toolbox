import { Component, OnInit } from '@angular/core';
import { CommunityVisibilityService, VisibilityReport } from '@kleiolab/lib-sdk-lb4';

@Component({
  selector: 'gv-community-visibility',
  templateUrl: './community-visibility.component.html',
  styleUrls: ['./community-visibility.component.scss']
})
export class CommunityVisibilityComponent implements OnInit {
  report: VisibilityReport[]
  updating = false
  constructor(public commVis: CommunityVisibilityService) { }

  ngOnInit(): void {
    this.load()
  }

  async load() {
    this.report = await this.commVis.communityVisibiliyControllerReportConflicts().toPromise()
  }

  async updateVisibility(classId: number, channel: string, onlyConflicting: boolean, newValue: boolean) {
    this.updating = true
    await this.commVis.communityVisibiliyControllerUpdate(classId, channel, onlyConflicting, newValue).toPromise()
    this.load()
    this.updating = false
  }
}
