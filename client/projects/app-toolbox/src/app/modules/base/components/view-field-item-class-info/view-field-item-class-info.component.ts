import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { IconType } from '@kleiolab/lib-redux';
import { Observable } from 'rxjs';


@Component({
  selector: 'gv-view-field-item-class-info',
  templateUrl: './view-field-item-class-info.component.html',
  styleUrls: ['./view-field-item-class-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFieldItemClassInfoComponent implements OnInit {

  @Input() showOntoInfo$: Observable<boolean>
  @Input() pkClass: number
  @Input() pkEntity: number
  @Input() classLabel: string
  @Input() isFavorite: boolean
  @Input() iconType$: Observable<IconType>

  tooltip: string

  constructor(
    private c: ConfigurationPipesService,

  ) { }

  ngOnInit(): void {
    this.iconType$ = this.c.pipeIconTypeFromClass(this.pkClass)
    this.tooltip = `${this.classLabel}${this.pkEntity ? ` (${this.pkEntity})` : ''}`
  }

}
