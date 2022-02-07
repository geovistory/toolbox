import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { InfResource } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { READ_ONLY } from '../../tokens/READ_ONLY';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';


@Component({
  selector: 'gv-view-field-item-class-info',
  templateUrl: './view-field-item-class-info.component.html',
  styleUrls: ['./view-field-item-class-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFieldItemClassInfoComponent implements OnInit {
  @Input() showOntoInfo$: Observable<boolean>
  @Input() resource: InfResource
  @Input() isInProject: boolean
  @Input() classLabel: string
  @Input() isFavorite: boolean
  @Input() size = 24
  @Input() shade = 'secondary'

  tooltip: string
  constructor(
    public itemComponent: ViewFieldItemComponent,
    @Optional() @Inject(READ_ONLY) public readonly: boolean
  ) { }

  ngOnInit(): void {

    this.tooltip = `${this.classLabel}`
  }

}
