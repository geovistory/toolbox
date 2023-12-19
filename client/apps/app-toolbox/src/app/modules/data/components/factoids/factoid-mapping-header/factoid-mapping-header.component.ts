import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FactoidMapping } from '@kleiolab/lib-sdk-lb4';
import { MatIconModule } from '@angular/material/icon';
import { CommentMenuComponent } from '../../../../../shared/components/comment-menu/comment-menu.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClassDropdownComponent } from '../../../../../shared/components/class-dropdown/class-dropdown.component';

@Component({
    selector: 'gv-factoid-mapping-header',
    templateUrl: './factoid-mapping-header.component.html',
    styleUrls: ['./factoid-mapping-header.component.scss'],
    standalone: true,
    imports: [ClassDropdownComponent, MatFormFieldModule, MatInputModule, FormsModule, CommentMenuComponent, MatIconModule]
})
export class FactoidMappingHeaderComponent implements OnInit {

  @Input() listNumber: number;
  @Input() fm: FactoidMapping;

  @Output() delete = new EventEmitter();
  @Output() fmChanged = new EventEmitter<FactoidMapping>();
  @Output() collapseBody = new EventEmitter<boolean>();

  collapsed = true;

  ngOnInit(): void {
    if (!this.fm) this.fm = {}

    // init comment to empty
    if (!this.fm?.comment) this.fm.comment = ""
    // init title to empty
    if (!this.fm?.title) this.fm.title = ""

    // send default collapse mode
    if ((this.fm as any).isNew) { // trick to make new Factoid mapping open by default. Not so clean, but it is a quick fix.
      this.collapsed = false;
      delete (this.fm as any).isNew
    } else this.collapseBody.emit(this.collapsed)
  }

  fmChange(key: string, value: any) {
    this.fm[key] = value;
    this.fmChanged.emit(this.fm)
  }

  deleteFactoid() {
    this.delete.emit();
  }

  toggleCollapseBody() {
    this.collapsed = !this.collapsed;
    this.collapseBody.emit(this.collapsed)
  }


}
