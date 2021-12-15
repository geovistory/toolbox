import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'gv-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleBtnComponent implements OnInit {

  @Input() value$: BehaviorSubject<boolean>;

  constructor() { }

  ngOnInit(): void {
    const errors: string[] = []
    if (!this.value$) errors.push('@Input() value$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));
  }

}
