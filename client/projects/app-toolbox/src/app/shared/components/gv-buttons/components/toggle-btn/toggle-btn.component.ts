import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'gv-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleBtnComponent implements OnInit {

  @Input() value$: BehaviorSubject<boolean>;
  @Input() inversedBehavior = false;

  _value$: Observable<boolean>


  constructor() { }

  ngOnInit(): void {
    const errors: string[] = []
    if (!this.value$) errors.push('@Input() value$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    if (this.inversedBehavior) {
      this._value$ = this.value$.pipe(map(v => !v))
    } else {
      this._value$ = this.value$
    }
  }

  onClick() {
    this.value$.next(this.inversedBehavior)
  }

  offClick() {
    this.value$.next(!this.inversedBehavior)
  }

}
