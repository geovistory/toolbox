import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gv-upload-feedback',
  templateUrl: './upload-feedback.component.html',
  styleUrls: ['./upload-feedback.component.scss']
})
export class UploadFeedbackComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() text: BehaviorSubject<string>;
  display: boolean;

  constructor() { }

  ngOnInit() {
    this.text.pipe(takeUntil(this.destroy$))
      .subscribe(newText => this.display = newText == '');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
