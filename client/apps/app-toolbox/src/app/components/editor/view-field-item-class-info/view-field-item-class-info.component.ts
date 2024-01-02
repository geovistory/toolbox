import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActiveProjectPipesService } from '@kleiolab/lib-redux';
import { InfResource, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { ClassInfoComponent } from '../../misc/class-info/class-info.component';
import { READ_ONLY } from '../../../tokens/READ_ONLY';
import { ViewFieldItemService } from '../view-field-item/view-field-item.service';


@Component({
  selector: 'gv-view-field-item-class-info',
  templateUrl: './view-field-item-class-info.component.html',
  styleUrls: ['./view-field-item-class-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatMenuModule, MatIconModule, NgIf, ClassInfoComponent, AsyncPipe]
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
  preview$: Observable<WarEntityPreview>

  constructor(
    public item: ViewFieldItemService,
    private ap: ActiveProjectPipesService,
    @Optional() @Inject(READ_ONLY) public readonly: boolean
  ) { }

  ngOnInit(): void {
    // lazy load the preview, if only pkEntity given
    this.preview$ = this.ap.streamEntityPreview(this.resource.pk_entity)

    this.tooltip = `${this.classLabel}`
  }

}
