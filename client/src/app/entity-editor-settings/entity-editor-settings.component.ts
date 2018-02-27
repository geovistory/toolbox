import { Component, OnInit } from '@angular/core';
import { EntityEditorService } from '../shared/services/entity-editor.service';

@Component({
  selector: 'gv-entity-editor-settings',
  templateUrl: './entity-editor-settings.component.html',
  styleUrls: ['./entity-editor-settings.component.scss']
})
export class EntityEditorSettingsComponent implements OnInit {

  constructor(
    public entityEditor:EntityEditorService
  ) { }

  ngOnInit() {
  }

}
