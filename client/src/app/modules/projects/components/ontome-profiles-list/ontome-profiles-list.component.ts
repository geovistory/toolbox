import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface OntomeApiProfiles {
  pkProfile: number
  profileLabelLanguage: string
  profileLabel: string
  profileDefinitionLanguage: string
  profileDefinition: string
  pkProjectOfBelonging: number
  projectOfBelongingLabelLanguage: string
  projectOfBelongingLabel: string
  usedByProjects: {
    frequency: number
    projects: [
      {
        fk_project: number
        project_label_language: string
        project_label: string
      }
    ]
  }
  isOngoingForcedPublication: boolean
  dateProfilePublished: boolean
  dateProfileDeprecated: boolean
}

@Component({
  selector: 'gv-ontome-profiles-list',
  templateUrl: './ontome-profiles-list.component.html',
  styleUrls: ['./ontome-profiles-list.component.scss']
})
export class OntomeProfilesListComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  profiles: OntomeApiProfiles;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`https://ontome.dataforhistory.org/api/profiles.json?selected-by-project=333`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: OntomeApiProfiles) => {
        this.profiles = response
      })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
