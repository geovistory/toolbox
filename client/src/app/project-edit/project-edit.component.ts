import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'gv-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  informationState:string;
  sourcesState:string;
  queryParams;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  this.activatedRoute.queryParams.subscribe(queryParams => {

      this.informationState = queryParams['i']; // gets url part ?i='s100'
      this.sourcesState = queryParams['s']; // gets url part ?i='s100'

      //if information state is s100, set sources state to s0
      if (this.informationState==='s100') this.informationGoToState100();

      //if sources state is s100, set information state  to s0
      if (this.sourcesState==='s100') this.sourcesGoToState100();


   });
  }


  sourcesGoToState0(){
    this.informationState = 's100';
    this.updateUrlQueryParams({i:'s100',s:'s0'});
  }
  sourcesGoToState50(){
    this.informationState = 's50';
    this.updateUrlQueryParams({i:'s50',s:'s50'});
  }
  sourcesGoToState100(){
    this.informationState = 's0';
    this.updateUrlQueryParams({i:'s0',s:'s100'});
  }
  informationGoToState0(){
    this.sourcesState = 's100';
    this.updateUrlQueryParams({i:'s0',s:'s100'});
  }
  informationGoToState50(){
    this.sourcesState = 's50';
    this.updateUrlQueryParams({i:'s50',s:'s50'});
  }
  informationGoToState100(){
    this.sourcesState = 's0';
    this.updateUrlQueryParams({i:'s100',s:'s0'});
  }
  updateUrlQueryParams(newParams){
  // Object.assign is used as apparently
  // you cannot add properties to snapshot query params
  const currentParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);

  this.router.navigate([], { queryParams: Object.assign(currentParams, newParams) });
  }
}
