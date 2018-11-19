import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

export interface IVersion {
  entityVersion: number; // entity_version
  pkEntityVersionConcat: string; // pk_entity_version_concat
  pkEntity: number; // pk_entity
}

@Component({
  selector: 'gv-version-picker',
  templateUrl: './version-picker.component.html',
  styleUrls: ['./version-picker.component.scss']
})
export class VersionPickerComponent implements OnChanges {

  @Input() versionList: IVersion[];
  @Input() selectedVersion: number;

  @Output() versionChange: EventEmitter<IVersion> = new EventEmitter();

  selectedItem: IVersion;

  selectVisible: false;

  constructor() { }

  ngOnChanges() {
    // set selectedItem
    if (this.versionList && this.selectedVersion) {
      this.selectedItem = this.versionList.find(v => v.entityVersion === this.selectedVersion);
    }
  }

  change() {
      this.versionChange.emit(this.selectedItem);
      this.selectVisible = false;
  }

}
