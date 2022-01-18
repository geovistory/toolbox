import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { InfResource } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';


@Component({
  selector: 'gv-view-field-item-class-info',
  templateUrl: './view-field-item-class-info.component.html',
  styleUrls: ['./view-field-item-class-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFieldItemClassInfoComponent implements OnInit {
  @Input() showOntoInfo$: Observable<boolean>
  @Input() readonly$: Observable<boolean>
  @Input() resource: InfResource
  @Input() isInProject: boolean
  @Input() classLabel: string
  @Input() isFavorite: boolean
  @Input() size = 24
  @Input() shade = 'secondary'

  tooltip: string
  constructor(
    private c: ConfigurationPipesService,
    public itemComponent: ViewFieldItemComponent
  ) { }

  ngOnInit(): void {

    this.tooltip = `${this.classLabel}`
  }

}
