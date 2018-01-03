import { Component, OnInit, Input } from '@angular/core';
import { Appellation } from '../shared/sdk/models/Appellation';
import { AppellationService } from '../shared/services/appellation.service';

@Component({
  selector: 'gv-name-parts-view',
  templateUrl: './name-parts-view.component.html',
  styleUrls: ['./name-parts-view.component.scss']
})
export class NamePartsViewComponent implements OnInit {

  @Input() appellation: Appellation;

  constructor(
    public appellationService:AppellationService
  ) { }

  ngOnInit() {
  }

}
