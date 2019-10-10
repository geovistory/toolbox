
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { InfAppellation } from 'app/core';
import { AppellationService } from '../../shared/appellation.service';


@Component({
  selector: 'gv-appellation-view',
  templateUrl: './appellation-view.component.html',
  styleUrls: ['./appellation-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppellationViewComponent implements OnInit, OnChanges {

  @Input() appellation: InfAppellation;

  @Output() readyToAdd: EventEmitter<InfAppellation> = new EventEmitter();

  label: string;

  constructor(
    public appellationService: AppellationService
  ) { }

  ngOnInit() {
    this.readyToAdd.emit(this.appellation);
  }

  ngOnChanges() {
    this.label = this.appellation.string;
  }
}
