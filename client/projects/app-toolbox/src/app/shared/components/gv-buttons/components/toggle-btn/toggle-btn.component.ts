import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'gv-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleBtnComponent implements OnInit {

  @Input() value$: BehaviorSubject<boolean>;

  @Output() change = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
    const errors: string[] = []
    if (!this.value$) errors.push('@Input() value$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));
  }

  onClick() {
    this.change.emit(true)
  }

  offClick() {
    this.change.emit(false)
  }

}
