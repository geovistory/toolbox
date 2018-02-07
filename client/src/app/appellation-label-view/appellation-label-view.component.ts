import { Component, OnInit, Input } from '@angular/core';
import { Appellation } from '../shared/sdk/models/Appellation';
import { AppellationService } from '../shared/services/appellation.service';

@Component({
  selector: 'gv-appellation-label-view',
  templateUrl: './appellation-label-view.component.html',
  styleUrls: ['./appellation-label-view.component.scss']
})
export class AppellationLabelViewComponent implements OnInit {

  @Input() appellation: Appellation;

  constructor(
    public appellationService:AppellationService
  ) { }

  ngOnInit() {
  }

}
