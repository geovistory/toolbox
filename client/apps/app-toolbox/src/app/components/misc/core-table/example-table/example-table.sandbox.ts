import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { sandboxOf } from 'angular-playground';
import { Observable, of } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { Example, ExampleTableComponent } from './example-table.component';
import { ExampleTableModule } from './example-table.module';

export const names = ['Jon Snow', 'Daenerys Targaryen', 'Arya Stark', 'Brandon Stark', 'Eddard Stark', 'Robb Stark', 'Rickon Stark', 'Sansa Stark', 'Catelyn Tully', 'Cersei Lannister', 'Jaime Lannister', 'Tyrion Lannister', 'Tywin Lannister', 'Petyr Baelish', 'Samwell Tarly', 'Jorah Mormont', 'Theon Greyjoy', 'Khal Drogo', 'Margaery Tyrell', 'Loras Tyrell', 'Gregor Clegane', 'Sandor Clegane', 'Davos Seaworth', 'Ramsay Bolton', 'Daario Naharis', 'Joffrey Baratheon', 'Renly Baratheon', 'Robert Baratheon', 'Stannis Baratheon', 'Podrick Payne', 'Peter Benjamin Parker', 'Mary Jane Watson', 'Miles Morales', 'Thor Odinson', 'Steven Rogers', 'Anthony Edward Stark', 'Peter Jason Quill', 'Bruce Banner', 'Bruce Wayne', 'Clark Kent', 'Lois Lane', 'Diana Prince', 'Arthur Curry', 'Bartholomew Henry Allen', 'Anakin Skywalker', 'Luke Skywalker', 'Leia Skywalker', 'Han Solo', 'Lando Calrissian', 'Obi-Wan Kenobi', 'Qui-Gon Jinn', 'Padmé Amidala', 'Mace Windu', 'Wilhuff Tarkin', 'Jango Fett', 'Boba Fett', 'Enfys Nest', 'Kylo Ren', 'Poe Dameron', 'Jyn Erso', 'Chirrut Îmwe',];

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'context-component',
  template: `
    <div style="padding:50px">
        <gv-example-table
        [examples]="examples | async"
        [pending]="pending | async"
        [sticky]="sticky"
        ></gv-example-table>
    </div>
    <button mat-raised-button color="primary" (click)="fetch()">Fake fetch</button>
    <mat-checkbox #chk color="primary" (change)="sticky = chk.checked" [checked]="sticky">Sticky</mat-checkbox>
    <p>Delay: {{ delay / 1000 }}s</p>
    `
})
export class ContextComponent {
  delay = 2000;
  examples: Observable<Example[]>;
  pending: Observable<boolean>;
  sticky = true;

  constructor() {
    this.fetch();
  }

  fetch() {
    this.examples = of(
      names.map((name, i) => ({ id: i + 1, name }))
    ).pipe(
      delay(this.delay),
      startWith([])
    );
    this.pending = this.examples.pipe(
      map(data => data.length === 0)
    );
  }
}

@NgModule({
  imports: [
    CommonModule,
    ExampleTableModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [],
  declarations: [ContextComponent],
  exports: [ContextComponent]

})
export class ContextModule { }



export default sandboxOf(ExampleTableComponent, {
  declareComponent: false,
  imports: [
    ContextModule
  ]
})
  .add('ExampleTableComponent | VirtualInfinitScroll ', {
    context: {},
    template: `
            <context-component></context-component>
        `
  })
