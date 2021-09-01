import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SysConfigValue, SystemConfigurationService } from '@kleiolab/lib-sdk-lb4';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';

@Component({
  selector: 'gv-sys-config',
  templateUrl: './sys-config.component.html',
  styleUrls: ['./sys-config.component.scss']
})
export class SysConfigComponent implements OnInit {

  @ViewChild('jsonEditorContainer', { static: true })
  jsonEditorContainer: ElementRef;
  editor: JSONEditor;
  saving = false
  constructor(
    private sysConf: SystemConfigurationService,
  ) { }
  async ngOnInit() {
    const data = await this.sysConf.sysConfigControllerGetSystemConfig().toPromise()
    const openapijson = await this.sysConf.sysConfigControllerGetSystemConfigJsonSchema().toPromise()
    const schema = openapijson.components.schemas.SysConfigValue;
    const schemaRefs = {}

    for (const key in openapijson.components.schemas) {
      if (Object.prototype.hasOwnProperty.call(openapijson.components.schemas, key)) {
        const schemaObject = openapijson.components.schemas[key];
        schemaRefs['#/components/schemas/' + key] = schemaObject
      }
    }
    const options: JSONEditorOptions = {
      sortObjectKeys: true,
      autocomplete: {
        filter: 'start',
      },
      schema,
      schemaRefs,
      modes: ['tree', 'view', 'form', 'code', 'text', 'preview'],
    }
    this.editor = new JSONEditor(
      this.jsonEditorContainer.nativeElement,
      options,
      data,
    );
  }

  async submit() {
    let val: SysConfigValue;
    try {
      val = this.editor.get()
    } catch (error) {
      alert('the configuration is invalid, please fix it and submit.')
      return
    }
    if (val) {
      let err = false;
      try {
        this.saving = true
        await this.sysConf.sysConfigControllerSetSystemConfig(val).toPromise()

      } catch (error) {
        if (error.status !== 200) {
          err = true;
          alert(`ERROR: error while saving config: ${JSON.stringify(error)}`)
        }
      }
      if (!err) alert(`SUCCESS :-) System configuration has been updated`)
      this.saving = false
    }
  }


}
