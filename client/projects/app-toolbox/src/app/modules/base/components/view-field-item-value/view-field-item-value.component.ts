import { Component } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { Observable } from 'rxjs';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-value',
  templateUrl: './view-field-item-value.component.html',
  styleUrls: ['./view-field-item-value.component.scss']
})
export class ViewFieldItemValueComponent {
  ordNum?: number;
  field: Field
  showOntoInfo$: Observable<boolean>
  constructor(
    public itemComponent: ViewFieldItemComponent,
    public editMode: EditModeService
  ) { }
  ngOnInit(): void {
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$
  }

  isValidUrl(urlString: string) {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }
}

