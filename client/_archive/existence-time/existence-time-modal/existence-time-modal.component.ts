import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'gv-existence-time-modal',
  templateUrl: './existence-time-modal.component.html',
  styleUrls: ['./existence-time-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExistenceTimeModalComponent implements OnInit {


  @Input() basePath: string[];
  @Input() mode: 'create' | 'editable';

  constructor(public activeModal: NgbActiveModal) {   }

  ngOnInit() {
  }



}
