import { Component, OnInit, Input } from '@angular/core';
import { NameComponent } from '../name/name.component';
import { Token } from '../shared/classes/appellation-token/appellation-token';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';
import { AppellationService } from '../shared/services/appellation.service';


@Component({
  selector: 'gv-name-part-type-edit',
  templateUrl: './name-part-type-edit.component.html',
  styleUrls: ['./name-part-type-edit.component.scss']
})
export class NamePartTypeEditComponent implements OnInit {
  @Input() token: Token;
  @Input() appellationLabel: AppellationLabel;
  @Input() nameComponent: NameComponent;

  selectedNamePartType;

  get isNamePartToken():boolean{
    if(!this.token.isSeparator && this.token.string) return true;
    else return false;
  }

  namePartTypes;

  // flag to toggle editing mode of name part type
  editing:boolean = false;

  constructor(
    public appellationService: AppellationService
  ) { }

  ngOnInit() {
    this.namePartTypes = this.appellationService.getNamePartTypes();
    this.selectedNamePartType = this.appellationService.getNamePartTypeById(this.token.typeId);
  }

  public cancel(){
    setTimeout( () => this.editing = false, 0);
  }

  public edit(){
    setTimeout( () => this.editing = true, 0);
  }

  setNewNamePartType(typeId){
    let filteredType = this.appellationService.getNamePartTypeById(parseInt(typeId))

    if(filteredType){
      this.selectedNamePartType = filteredType;
      this.token.typeId = this.selectedNamePartType.id;
    }
    else {
      this.selectedNamePartType = [];
      this.token.typeId = undefined;
    }
  }

  focusOnNamePartInput(){
    this.nameComponent.editAppellation();
    this.token.namePartStringEditComponent.focus();
  }
}
