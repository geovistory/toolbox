import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { InfResource } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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


  svgIcon$: Observable<string>
  colorClass$: Observable<string>
  tooltip: string
  constructor(
    private c: ConfigurationPipesService,
    public itemComponent: ViewFieldItemComponent
  ) { }

  ngOnInit(): void {
    const type$ = this.c.pipeIconTypeFromClass(this.resource.fk_class).pipe(shareReplay())
    this.svgIcon$ = type$.pipe(
      map(type => {
        const prefix = this.isFavorite ? 'filled' : 'outlined'
        switch (type) {
          case 'text':
            return `gv:${prefix}-gv-text`;
          case 'table':
            return `gv:${prefix}-gv-table`;
          case 'source':
            return `gv:outlined-gv-source`; // create filled icon and use next line
          // return `gv:${prefix}-gv-source`;
          case 'expression-portion':
            return `gv:${prefix}-gv-section`;
          case 'persistent-entity':
            return `gv:${prefix}-gv-persistent-item`;
          case 'temporal-entity':
            return `gv:${prefix}-gv-temporal-entity`;
          case 'value':
            return `gv:${prefix}-gv-value`;
          case 'analysis':
            return `gv:${prefix}-gv-analysis`;
          default:
            break;
        }
      })
    )
    this.colorClass$ = type$.pipe(
      map(type => {
        switch (type) {
          case 'text':
          case 'table':
            return 'gv-digitals-' + this.shade + '-color';
          case 'source':
          case 'expression-portion':
            return 'gv-sources-' + this.shade + '-color';
          case 'persistent-entity':
          case 'temporal-entity':
            return 'gv-entities-' + this.shade + '-color'
          case 'analysis':
            return 'gv-analysis-' + this.shade + '-color'
          case 'value':
            return 'gv-values-' + this.shade + '-color'
          default:
            break;
        }
      })
    )
    this.tooltip = `${this.classLabel}`
  }

}
