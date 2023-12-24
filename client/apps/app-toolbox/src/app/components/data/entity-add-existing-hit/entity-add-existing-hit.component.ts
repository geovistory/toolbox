import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';


export interface EntityAddExistingHit {
  pkEntity: number;
  title: string;
  description: string;
  isInProject: boolean;
  numberOfProject: number;
  selected: boolean;
  confirmBtnText: string;
  confirmBtnDisabled: boolean
  confirmBtnTooltip: string
}



@Component({
    selector: 'gv-entity-add-existing-hit',
    templateUrl: './entity-add-existing-hit.component.html',
    styleUrls: ['./entity-add-existing-hit.component.scss'],
    standalone: true,
    imports: [NgClass, MatTooltipModule, MatChipsModule, MatButtonModule]
})
export class EntityAddExistingHitComponent implements OnInit {

  @Input() pkEntity: number;
  @Input() title: string;
  @Input() description: string;
  @Input() isInProject: boolean;
  @Input() numberOfProject: number;

  @Input() selected: boolean;
  @Input() confirmBtnText: string;
  @Input() confirmBtnDisabled: boolean;
  @Input() confirmBtnTooltip: string

  @Output() showDetailsOfEntity: EventEmitter<number> = new EventEmitter();
  @Output() hideDetailsOfEntity: EventEmitter<number> = new EventEmitter();
  @Output() confirm: EventEmitter<number> = new EventEmitter();

  showDetailsTooltip = 'Show details'
  hideDetailsTooltip = 'Hide details'

  metaTooltipText: string;
  composedDescription: string

  constructor() { }

  ngOnInit() {
    this.metaTooltipText = `This entity is in ${this.numberOfProject} ${this.isInProject ? '' : 'other'} ${this.numberOfProject === 1 ?
      'project' :
      'projects'}${this.isInProject ?
        ', including yours' : `, and not in yours`
      }.`;

    this.composedDescription = `ID ${this.pkEntity} – ${this.description}`
  }

  onToggleDetailsOfEntity(selected: boolean) {
    if (selected) this.hideDetailsOfEntity.emit(this.pkEntity)
    else this.showDetailsOfEntity.emit(this.pkEntity)
  }

  onConfirm() {
    this.confirm.emit(this.pkEntity)
  }

}
