import { Component, OnInit, Input } from '@angular/core';
import { Token } from '../appellation-token/appellation-token';
import { namePartTypes , NameComponent } from '../name/name.component';
import { AppellationLabel } from '../appellation-label/appellation-label';


@Component({
  selector: 'gv-name-part',
  templateUrl: './name-part.component.html',
  styleUrls: ['./name-part.component.scss']
})
export class NamePartComponent implements OnInit {
  @Input() token: Token;
  @Input() appellationLabel: AppellationLabel;
  @Input() nameComponent: NameComponent;

  selectedNamePartType;
  namePartTypes = namePartTypes;

  get isNamePartToken():boolean{
    if(!this.token.isSeparator && this.token.string) return true;
    else return false;
  }


  // flag to toggle editing mode of name part type
  editing:boolean = false;

  constructor() { }

  ngOnInit() {
    this.selectedNamePartType = this.namePartTypes.filter(type =>
      type.id === this.token.typeId
    )[0]
  }

  public cancel(){
    setTimeout( () => this.editing = false, 0);
  }

  public edit(){
    setTimeout( () => this.editing = true, 0);
  }

  setNewNamePartType(typeId){
    let filteredTypes = this.namePartTypes.filter(type =>
      type.id === parseInt(typeId)
    )
    if(filteredTypes.length === 1){
      this.selectedNamePartType = filteredTypes[0];
      this.token.typeId = this.selectedNamePartType.id;
    }
    else {
      this.selectedNamePartType = [];
      this.token.typeId = undefined;
    }
  }

  focusOnNamePartInput(){
    this.nameComponent.editAppellation();
    this.token.namePartInputComponent.focus();
  }
}
