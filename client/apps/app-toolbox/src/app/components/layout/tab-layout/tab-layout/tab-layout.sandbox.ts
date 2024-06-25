import { sandboxOf } from 'angular-playground';
import { TabBaseModule } from '../tab-layout.module';
import { TabLayoutComponent } from './tab-layout.component';


export default sandboxOf(TabLayoutComponent, {
  imports: [
    TabBaseModule
  ],
  declareComponent: false,
})
  .add('View ', {
    template: `

    <div class="d-flex justify-content-center mt-5">
      <div style="width:800px;height:600px;border:1px dashed pink;" class="d-flex">


      <gv-tab-layout [uuid]="'foobar123'">
        <div layout-top>My Haeder My HaederMy HaederMy HaederMy HaederMy HaederMy HaederMy HaederMy HaederMy HaederMy HaederMy Haeder</div>
        <div layout-left class="gv-flex-fh">Left</div>
        <div layout-right class="gv-flex-fh">

          <mat-tab-group [disablePagination]="true" mat-stretch-tabs class="gv-flex-fh gv-tab-group-sm">
            <mat-tab>
              <ng-template mat-tab-label>
                <mat-icon [svgIcon]="'comment-quote-outline'"></mat-icon>
                Annotations
              </ng-template>
              <div class="gv-flex-fh">
                <div class="mat-typography mat-bg-grey-100 gv-section-header">
                  Annotations
                </div>
                <mat-divider></mat-divider>
                <div class="gv-scroll-y-auto">
                  <ul>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                    <li>list with many items</li>
                  </ul>
                </div>
              </div>
            </mat-tab>
            <mat-tab>
              <ng-template mat-tab-label>
                <mat-icon>view_list</mat-icon>
                Fields
              </ng-template>

              <div class="gv-flex-fh">
                <div class="mat-typography mat-bg-grey-100 gv-section-header">
                  Fields
                </div>
                <mat-divider></mat-divider>
                <div class="gv-scroll-y-auto">
                foo bar
                </div>
              </div>
            </mat-tab>

          </mat-tab-group>
        </div>
      </gv-tab-layout>

      </div>
    </div>
        `
  })

