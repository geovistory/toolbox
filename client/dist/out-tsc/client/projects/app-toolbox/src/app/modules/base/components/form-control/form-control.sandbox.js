import { FormsModule } from '@angular/forms';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { BaseModule } from '../../base.module';
import { FormControlComponent } from './form-control.component';
const pkProject = 591;
export default sandboxOf(FormControlComponent, {
    declareComponent: false,
    imports: [
        BaseModule,
        FormsModule,
        InitStateModule
    ]
})
    .add('FormControlComponent | All controls', {
    context: { pkProject },
    template: `
    <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>

    <div class="mat-typography" style="display: flex; flex-direction: row; justify-content: center;">
        <div style="margin: 5rem; width: 300px;">
            <h2>Geovistory Controls fill</h2>

            <p>Ctrl-Appelation with label</p>
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Label</mat-label>
              <gv-ctrl-appellation placeholder="Placeholder" [required]="true">
              </gv-ctrl-appellation>
            </mat-form-field>

            <p>Ctrl-Appelation without label</p>
            <mat-form-field class="w-100" appearance="fill">
              <gv-ctrl-appellation placeholder="Placeholder" [required]="true">
              </gv-ctrl-appellation>
            </mat-form-field>

            <p>Ctrl-Language with label</p>
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Label</mat-label>
              <gv-ctrl-language placeholder="Placeholder" [required]="true">
              </gv-ctrl-language>
            </mat-form-field>

            <p>Ctrl-Language without label</p>
            <mat-form-field class="w-100" appearance="fill">
              <gv-ctrl-language placeholder="Placeholder" [required]="true">
              </gv-ctrl-language>
            </mat-form-field>

            <p>Ctrl-Time-Span with label</p>
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Time span</mat-label>
              <gv-ctrl-time-span placeholder="Placeholder" [required]="true">
              </gv-ctrl-time-span>
              <mat-icon matSuffix svgIcon="calendar"></mat-icon>
            </mat-form-field>

            <p>Ctrl-Time-Span without label</p>
            <mat-form-field class="w-100" appearance="fill">
              <gv-ctrl-time-span placeholder="Placeholder" [required]="true">
              </gv-ctrl-time-span>
              <mat-icon matSuffix svgIcon="calendar"></mat-icon>
            </mat-form-field>

            <p>Ctrl-Entity with label</p>
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Entity</mat-label>
              <gv-ctrl-entity placeholder="Placeholder" [pkClass]="21" [required]="true">
              </gv-ctrl-entity>
              <mat-icon matSuffix svgIcon="pencil"></mat-icon>
            </mat-form-field>

            <p>Ctrl-Entity without label</p>
            <mat-form-field class="w-100" appearance="fill">
              <gv-ctrl-entity placeholder="Placeholder" [pkClass]="21" [required]="true">
              </gv-ctrl-entity>
              <mat-icon matSuffix svgIcon="pencil"></mat-icon>
            </mat-form-field>

            <p>Ctrl-Type with label</p>
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Type</mat-label>
              <gv-ctrl-type placeholder="Placeholder"  [autoopen]="false"
                [pkTypedClass]="363" [pkTypeClass]="56" [required]="true">
              </gv-ctrl-type>
            </mat-form-field>


            <p>Ctrl-Type without label</p>
            <mat-form-field class="w-100" appearance="fill">
              <gv-ctrl-type placeholder="Placeholder" [autoopen]="false"
                [pkTypedClass]="363" [pkTypeClass]="56" [required]="true">
              </gv-ctrl-type>
            </mat-form-field>

            <p>Fg-Place</p>
            <gv-fg-place appearance="fill"></gv-fg-place>


            <p>Fg-Text-Property</p>
            <gv-fg-text-property appearance="fill"></gv-fg-text-property>

            <p>Fg-Lang-String</p>
            <gv-fg-lang-string appearance="fill"></gv-fg-lang-string>




            <mat-divider></mat-divider>
            <p>Ctrl-Lang-String</p>

            <mat-form-field class="w-100" appearance="fill">
              <!-- <mat-label>{{Placeholder}}</mat-label> -->
              <gv-ctrl-lang-string placeholder="Placeholder" [required]="true">
              </gv-ctrl-lang-string>
            </mat-form-field>

            <p>Ctrl-Text-Property</p>
            <mat-form-field class="w-100" appearance="fill">
              <!-- <mat-label>{{Placeholder}}</mat-label> -->
              <gv-ctrl-text-property placeholder="Placeholder" [required]="true">
              </gv-ctrl-text-property>
            </mat-form-field>

            <p>Ctrl-Place</p>
            <mat-form-field class="w-100" appearance="fill">
              <!-- <mat-label>{{Placeholder}}</mat-label> -->
              <gv-ctrl-place placeholder="Placeholder" [required]="true">
              </gv-ctrl-place>
            </mat-form-field>


        </div>
        <div style="margin: 5rem; width: 300px">
          <h2>Material Controls fill</h2>

          <mat-form-field class="w-100" appearance="fill">
            <mat-label>Label</mat-label>
            <input matInput placeholder="Placeholder" />
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-select placeholder="Placeholder" >
              <mat-option value="option">Option</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div style="margin: 5rem; width: 300px;">
            <h2>Geovistory Controls outline</h2>


            <mat-form-field class="w-100" appearance="outline">
            <!-- <mat-label>{{Placeholder}}</mat-label> -->
            <gv-ctrl-appellation placeholder="Placeholder" [required]="true">
            </gv-ctrl-appellation>
          </mat-form-field>

            <mat-form-field class="w-100" appearance="outline">
            <!-- <mat-label>{{Placeholder}}</mat-label> -->
            <gv-ctrl-place placeholder="Placeholder" [required]="true">
            </gv-ctrl-place>
          </mat-form-field>

            <mat-form-field class="w-100" appearance="outline">
            <!-- <mat-label>{{Placeholder}}</mat-label> -->
            <gv-ctrl-language placeholder="Placeholder" [required]="true">
            </gv-ctrl-language>
          </mat-form-field>

            <mat-form-field class="w-100" appearance="outline">
            <!-- <mat-label>{{Placeholder}}</mat-label> -->
            <gv-ctrl-text-property placeholder="Placeholder" [required]="true">
            </gv-ctrl-text-property>
          </mat-form-field>

            <mat-form-field class="w-100" appearance="outline">
            <!-- <mat-label>{{Placeholder}}</mat-label> -->
            <gv-ctrl-lang-string placeholder="Placeholder" [required]="true">
            </gv-ctrl-lang-string>
          </mat-form-field>

            <mat-form-field class="w-100" appearance="outline">
            <!-- <mat-label>{{Placeholder}}</mat-label> -->
            <gv-ctrl-time-span placeholder="Placeholder" [required]="true">
            </gv-ctrl-time-span>
          </mat-form-field>

            <mat-form-field class="w-100" appearance="outline">
            <!-- <mat-label>{{Placeholder}}</mat-label> -->
            <mat-select placeholder="Placeholder" [required]="true">
              <mat-option *ngFor="let listDefinition of [{targetClassLabel:'Option 1'}];" [value]="listDefinition">
                {{listDefinition.targetClassLabel}}
              </mat-option>
            </mat-select>
          </mat-form-field>

            <mat-form-field class="w-100" appearance="outline">
            <!-- <mat-label>{{Placeholder}}</mat-label> -->
            <gv-ctrl-entity placeholder="Placeholder" [pkClass]="21" [required]="true">
            </gv-ctrl-entity>
          </mat-form-field>

            <mat-form-field class="w-100" appearance="outline">
            <!-- <mat-label>{{Placeholder}}</mat-label> -->
            <gv-ctrl-type placeholder="Placeholder"  [autoopen]="false"
              [pkTypedClass]="363" [pkTypeClass]="364" [required]="true">
            </gv-ctrl-type>
          </mat-form-field>

        </div>

        <div style="margin: 5rem; width: 300px">
        <h2>Material Controls outline</h2>

        <mat-form-field class="w-100" appearance="outline">
          <!-- <mat-label>{{Placeholder}}</mat-label> -->
          <input matInput placeholder="Placeholder" />
        </mat-form-field>
        <mat-form-field class="w-100" appearance="outline">
          <mat-select placeholder="Placeholder" >
            <mat-option value="option">Option</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      </div>

        `
});
//# sourceMappingURL=form-control.sandbox.js.map