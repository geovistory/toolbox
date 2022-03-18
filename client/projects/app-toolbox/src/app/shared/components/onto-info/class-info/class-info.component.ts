import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'gv-class-info',
  templateUrl: './class-info.component.html',
  styleUrls: ['./class-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassInfoComponent implements OnInit {
  @Input() showOntoInfo$: Observable<boolean>
  @Input() pkClass: number
  @Input() classLabel: string
  @Input() isFavorite: boolean
  @Input() size = 24
  @Input() shade = 'secondary'
  @Input() iconGray = false // if true, keep icons gray

  svgIcon$: Observable<string>
  colorClass$: Observable<string>
  tooltip: string
  constructor(
    private c: ConfigurationPipesService,

  ) { }

  ngOnInit(): void {
    const classEnriched$ = this.c.pipeClassEnriched(this.pkClass).pipe(shareReplay())
    this.svgIcon$ = classEnriched$.pipe(
      map(classEnriched => {
        const type = classEnriched.icon
        const prefix = this.isFavorite ? 'filled' : 'outlined'
        switch (type) {
          case 'text':
            return `gv:${prefix}-gv-text`;
          case 'table':
            return `gv:${prefix}-gv-table`;
          case 'source':
            return `gv:outlined-gv-source`; // create filled icon and use next line
          // return `gv:${prefix}-gv-source`;
          case 'section':
            return `gv:${prefix}-gv-section`;
          case 'persistent-item':
            return `gv:${prefix}-gv-persistent-item`;
          case 'temporal-entity':
            return `gv:${prefix}-gv-temporal-entity`;
          case 'value':
            return `gv:${prefix}-gv-value`;
          case 'expression':
            return `gv:${prefix}-gv-expression`;
          default:
            return `gv:${prefix}-gv-persistent-item`;
        }
      })
    )
    if (this.iconGray) {
      this.colorClass$ = of('mat-text-secondary')
    }
    else {

      this.colorClass$ = classEnriched$.pipe(
        map(classEnriched => {

          if (classEnriched.belongsToCategory.digitals) return 'gv-digitals-' + this.shade + '-color';
          else if (classEnriched.belongsToCategory.sources) return 'gv-sources-' + this.shade + '-color';
          else if (classEnriched.belongsToCategory.entities) return 'gv-entities-' + this.shade + '-color';
          else if (classEnriched.belongsToCategory.stories) return 'gv-stories-' + this.shade + '-color';
          else if (classEnriched.classConfig.valueObjectType) return 'gv-value-' + this.shade + '-color';

          return 'gv-entities-' + this.shade + '-color';

        })
      )
    }
    this.tooltip = `${this.classLabel}`
  }

}
