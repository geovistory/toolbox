import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { InfAppellation } from 'app/core';
import { AppellationService } from '../../shared/appellation.service';


@Component({
  selector: 'gv-appellation-label-view',
  templateUrl: './appellation-label-view.component.html',
  styleUrls: ['./appellation-label-view.component.scss']
})
export class AppellationLabelViewComponent implements OnInit {

  @Input() appellation: InfAppellation;

  @Output() readyToAdd:EventEmitter<InfAppellation> = new EventEmitter();

  constructor(
    public appellationService:AppellationService
  ) { }

  ngOnInit() {
    this.readyToAdd.emit(this.appellation);
  }

}
