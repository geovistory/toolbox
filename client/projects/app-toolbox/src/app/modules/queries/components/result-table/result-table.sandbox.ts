import { sandboxOf } from 'angular-playground';
import { GvAnalysisService } from 'projects/app-toolbox/src/app/modules/analysis/services/analysis.service';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { BehaviorSubject } from 'rxjs';
import { QueriesModule } from '../../queries.module';
import { ResultTableComponent } from './result-table.component';
import { QueryDefinition } from "@kleiolab/lib-sdk-lb4";

// export const names = ['Jon Snow', 'Daenerys Targaryen', 'Arya Stark', 'Brandon Stark', 'Eddard Stark', 'Robb Stark', 'Rickon Stark', 'Sansa Stark', 'Catelyn Tully', 'Cersei Lannister', 'Jaime Lannister', 'Tyrion Lannister', 'Tywin Lannister', 'Petyr Baelish', 'Samwell Tarly', 'Jorah Mormont', 'Theon Greyjoy', 'Khal Drogo', 'Margaery Tyrell', 'Loras Tyrell', 'Gregor Clegane', 'Sandor Clegane', 'Davos Seaworth', 'Ramsay Bolton', 'Daario Naharis', 'Joffrey Baratheon', 'Renly Baratheon', 'Robert Baratheon', 'Stannis Baratheon', 'Podrick Payne', 'Peter Benjamin Parker', 'Mary Jane Watson', 'Miles Morales', 'Thor Odinson', 'Steven Rogers', 'Anthony Edward Stark', 'Peter Jason Quill', 'Bruce Banner', 'Bruce Wayne', 'Clark Kent', 'Lois Lane', 'Diana Prince', 'Arthur Curry', 'Bartholomew Henry Allen', 'Anakin Skywalker', 'Luke Skywalker', 'Leia Skywalker', 'Han Solo', 'Lando Calrissian', 'Obi-Wan Kenobi', 'Qui-Gon Jinn', 'Padmé Amidala', 'Mace Windu', 'Wilhuff Tarkin', 'Jango Fett', 'Boba Fett', 'Enfys Nest', 'Kylo Ren', 'Poe Dameron', 'Jyn Erso', 'Chirrut Îmwe',];

// @Component({
//     // tslint:disable-next-line: component-selector
//     selector: 'context-component',
//     template: `
//       <div style="padding:50px">
//           <gv-result-table
//           [data$]="examples"
//           [pending$]="pending"
//           ></gv-result-table>
//       </div>
//       <button mat-raised-button color="primary" (click)="fetch()">Fake fetch</button>
//       <mat-checkbox #chk color="primary" (change)="sticky = chk.checked" [checked]="sticky">Sticky</mat-checkbox>
//       <p>Delay: {{ delay / 1000 }}s</p>
//     `
// })
// class ContextComponent {
//     delay = 2000;
//     examples: Observable<Example[]>;
//     pending: Observable<boolean>;
//     sticky = true;

//     constructor() {
//         this.fetch();
//     }

//     fetch() {
//         this.examples = of(
//             names.map((name, i) => ({ id: i + 1, name }))
//         ).pipe(
//             delay(this.delay),
//             startWith([])
//         );
//         this.pending = this.examples.pipe(
//             map(data => data.length === 0)
//         );
//     }
// }

// @NgModule({
//     imports: [QueriesModule, CommonModule, MatCheckboxModule, MatButtonModule],
//     providers: [],
//     declarations: [ContextComponent],
//     exports: [ContextComponent]

// })
// export class ContextModule { }


const def: QueryDefinition = {
  filter: {
    'data': {
      'classes': [
        21
      ],
      'types': []
    },
    'children': [
      {
        'data': {
          'operator': 'AND',
          'subgroup': 'property'
        },
        'children': [
          {
            'data': {
              'operator': 'IS',
              'outgoingProperties': [],
              'ingoingProperties': [
                1192
              ]
            },
            children: []
          }
        ]
      }
    ]
  },
  columns: [{
    defaultType: 'entity_preview',
    ofRootTable: true,
    id: 'col_0',
    label: 'Entity Preview'
  }]
}

export default sandboxOf(ResultTableComponent, {
  declareComponent: false,
  imports: [
    QueriesModule,
    InitStateModule
  ]
})
  .add('ResultTableComponent | VirtualInfinitScroll ', {
    providers: [
      GvAnalysisService
    ],
    context: {
      queryDefinition$: new BehaviorSubject(def),
      pkProject: 27
    },
    styles: [




    ],
    template: `
        <gv-init-state [projectFromApi]="pkProject" style="
        width: 600px;
        height: 600px;
        display: block;
        margin: 30px;
        border:1px dashed red;">
            <gv-result-table class="h-100" [definition$]="queryDefinition$"></gv-result-table>
        </gv-init-state>
        `
  })