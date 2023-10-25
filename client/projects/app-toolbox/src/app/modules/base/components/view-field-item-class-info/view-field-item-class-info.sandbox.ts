import { APP_INITIAL_STATE } from '@kleiolab/lib-redux/public-api';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_02_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2022-02-09';
import { PROFILE_16_INTERACTIONS_S_2022_02_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2022-02-09';
import { PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2022-01-18';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { PROFILE_8_MARITIME_HISTOR_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2022-01-18';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { BehaviorSubject } from 'rxjs';
import { BaseModule } from '../../base.module';
import { ViewFieldItemClassInfoComponent } from './view-field-item-class-info.component';

const initialSchemaObects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_16_INTERACTIONS_S_2022_02_09, // add social interactions profile
      PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, // add biographical profile
      PROFILE_8_MARITIME_HISTOR_2022_01_18, // add maritime profile
      PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 // add phyical profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  }),
  GvSchemaObjectMock.project1, // add project and its default language
]

const classes = [
  { pkClass: 785, classLabel: 'Text' },
  { pkClass: 219, classLabel: 'Section' },
  { pkClass: 21, classLabel: 'Person' },
  { pkClass: 61, classLabel: 'Birth' },
]
const sizes = [50, 24, 12]
const isFavorites = [true, false]
export default sandboxOf(ViewFieldItemClassInfoComponent, {
  declareComponent: false,
  imports: [
    InitStateModule,
    BaseModule,
  ],
  providers: [
    { provide: APP_INITIAL_STATE, useValue: IAppStateMock.stateProject1 }
  ]
})
  .add('All', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
      showOntoInfo$: new BehaviorSubject(false),
      classes,
      sizes,
      isFavorites
    },
    template: `
      <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
      <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      <div style="padding-left:20px">
      <ng-container *ngFor="let klass of classes">
        <ng-container *ngFor="let isFavorite of isFavorites">
          <div *ngFor="let size of sizes" style="
          display: flex;
          align-items: center;
          font-size:{{size}}px;
          flex-direction: row;
          ">
              <gv-field-item-class-info
              [showOntoInfo$]="showOntoInfo$"
              [size]="size"
              [pkClass]="klass.pkClass"
              [classLabel]="klass.classLabel"
              [isFavorite]="isFavorite">
              </gv-field-item-class-info>
              <span>pkClass {{klass.pkClass}} classLabel {{klass.classLabel}} size {{size}} isFavorite {{isFavorite}}</span>
              </div>
          </ng-container>
          <br>

        </ng-container>

      </div>
    `
  })
