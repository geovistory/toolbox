import { PortalModule } from '@angular/cdk/portal';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimeChartContFormControlComponent } from '../time-chart-cont-form-control/time-chart-cont-form-control.component';
import { TccFormArrayFactory, lineConfig } from '../time-chart-cont-form/time-chart-cont-form.component';

@Component({
  selector: 'gv-time-chart-cont-form-array',
  templateUrl: './time-chart-cont-form-array.component.html',
  styleUrls: ['./time-chart-cont-form-array.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, MatListModule, NgClass, MatLineModule, MatButtonModule, MatTooltipModule, MatIconModule, TimeChartContFormControlComponent, PortalModule]
})
export class TimeChartContFormArrayComponent {
  @Input() formArrayFactory: TccFormArrayFactory;

  /**
   * adds a new lineConfig
   */
  addLine() {
    this.formArrayFactory.append(lineConfig())
  }
  /**
   * removes lineConfig with given index
   */
  removeLine(index: number) {
    this.formArrayFactory.remove(index)
  }

}
