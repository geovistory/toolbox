import { Component, OnInit, Input } from '@angular/core';
import { Token } from '../appellation-token/appellation-token';
import { namePartTypes , NameComponent } from '../name/name.component';
import { Appellation } from '../appellation/appellation';

@Component({
  selector: 'gv-name-part',
  templateUrl: './name-part.component.html',
  styleUrls: ['./name-part.component.scss']
})
export class NamePartComponent implements OnInit {
  @Input() token: Token;
  @Input() appellation: Appellation;
  @Input() nameComponent: NameComponent;

  get isNamePartToken():boolean{
    if(!this.token.isSeparator && this.token.string) return true;
    else return false;
  }

  namePartTypes = namePartTypes;

  // flag to toggle editing mode of name part type
  editing:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public cancel(){
    setTimeout( () => this.editing = false, 0);
  }

  public edit(){
    setTimeout( () => this.editing = true, 0);
  }

  public save(){

      //TODO Save

      setTimeout( () => this.editing = false, 0);
  }

  focusOnNamePartInput(){
    this.nameComponent.editAppellation();
    this.token.namePartInputComponent.focus();
  }
}
