import { Component, OnInit } from '@angular/core';
import { InfRole, ActiveProjectService } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { map, switchMap } from 'rxjs/operators';
import { values } from 'ramda';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';



export interface Mentioning {
  property: {
    label: string;
    tooltip: string;
  };
  path: {
    segments: any[];//GraphPathSegment[];
    text?: string;
  };
  location?: {
    label: string;
    tooltip?: string;
    icon?: string;
  };
  actions: any;
}


@Component({
  selector: 'gv-ram-list',
  templateUrl: './ram-list.component.html',
  styleUrls: ['./ram-list.component.scss']
})
export class RamListComponent implements OnInit {

  pkEntity: number = 779360;
  items$: Observable<Mentioning[]>;
  cols: any[];

  constructor(
    private inf: InfActions,
    private p: ActiveProjectService,
  ) { }

  ngOnInit() {
    this.cols = this.setCols();

    const isMentionedInRoles$ = this.p.inf$.role$.by_fk_property__fk_entity$.key('1218_' + this.pkEntity)


    const carrierProvidedByRoles$ = isMentionedInRoles$.pipe(
      map(isMentionedInRoles => values(isMentionedInRoles)),
      switchMap((isMentionedInRoles) => {
        // I map the input value to a Observable and switchMap will subscribe to the new one

        const arrayOfObs$ = isMentionedInRoles.map(role => {
          return this.p.inf$.role$.by_fk_property__fk_temporal_entity$
            .key(1316 + '_' + role.fk_temporal_entity)
            .pipe(map((indexedRoles) => values(indexedRoles)[0]))
        })

        return combineLatest(arrayOfObs$)

      })
      // ,

    )

    const parentEntity$ = this.p.streamEntityPreview(this.pkEntity);

    this.items$ = combineLatest(parentEntity$, carrierProvidedByRoles$).pipe(
      switchMap(([parentEntity, carrierProvidedByRoles]) => {
        const arrayOfObs$ = carrierProvidedByRoles.map(role => this.p.streamEntityPreview(role.fk_entity).pipe(
          map(ep => {
            return {
              property: {
                label: 'is mentioned in',
                tooltip: `${parentEntity.entity_label} is mentioned somewhere in...`
              },
              path: {
                segments: [
                  {
                    entity: {
                      label: ep.entity_label,
                      icon: 'menu_book',
                      tooltip: `${parentEntity.entity_label} is mentioned somewhere in ${ep.class_label}, ${ep.type_label}: «${ep.entity_label}»`
                    }
                  }
                ]
              },
              location: {
                label: 'folio 42r.',
                tooltip: 'Reference',
                icon: ''
              },
              actions: {
                open: true
              }
            };
          })
        ));
        return combineLatest(arrayOfObs$);
      }),
      /*map(strings => {
        return strings.map(string => {
          return {
            property: {
              label: 'is mentioned in',
              tooltip: 'Giacomo da füssen is mentioned somewhere in...'
            },
            path: {
              segments: [
                {
                  entity: {
                    label: string,
                    icon: 'menu_book',
                    tooltip: 'Unique Source Object, Manuscript: «EM 01»'
                  }
                }
              ]
            },
            location: {
              label: 'folio 42r.',
              tooltip: 'Reference',
              icon: ''
            },
            actions: {
              open: true
            }
          };
        });
      })*/
    )



    // .pipe(
    //     map(indexedRoles => values(indexedRoles)),
    //     switchMap(rolesArr => {
    //         const rolesArr$ = rolesArr.map(role => {
    //             const temp: Mentioning = {
    //                 actions: undefined,
    //                 path: {
    //                     segments: ['seg1', 'seg2'],
    //                 },
    //                 property: {
    //                     label: "label", tooltip: "tooltip"
    //                 }
    //             }
    //             return new BehaviorSubject(temp);
    //         })
    //         return combineLatestOrEmpty(rolesArr$);
    //     })
    // );

    this.getMentions(779360);
  }

  setCols() {
    return [
      {
        field: 'path',
        header: 'Item',
        hasFilter: true,
        filterMatchMode: 'contains',
        filterCol: 'path.text',
        width: '50%'
      },
      {
        field: 'location',
        header: 'Reference',
        tooltip: 'Location within item',
        hasFilter: true,
        filterMatchMode: 'contains',
        filterCol: 'location.label',
        width: '25%'
      },
      {
        field: 'action',
        header: 'Action',
        hasFilter: false,
        width: '40px'
      }
    ];
  }
  /**
   *
   * @param pkEntity Persistent item/temporal entity that is mentionned i.e. CRM Entity
   */
  getMentions(pkEntity: number) {
    const fakeStatements: InfRole[] = [
      {
        pk_entity: 789,
        fk_temporal_entity: 987, // subject (F2 Expression) !!
        fk_property: 1218, // predicate (geovP2 mentions)
        fk_entity: pkEntity, // object (E1 CRM Entity / e.g. a Person)
      } as InfRole,
      {
        pk_entity: 790,
        fk_temporal_entity: 987, // subject (F2 Expression) !!
        fk_property: 1316, // predicate (geovP5 carrier provided by)
        fk_entity: 737365, // object (F5 Item / e.g. Copy of a book)
      } as InfRole,
      {
        pk_entity: 791,
        fk_temporal_entity: 698, // subject (F2 Expression) !!
        fk_property: 1218, // predicate (geovP2 mentions)
        fk_entity: pkEntity, // object (E1 CRM Entity / e.g. a Person)
      } as InfRole,
      {
        pk_entity: 792,
        fk_temporal_entity: 698, // subject (F2 Expression) !!
        fk_property: 1316, // predicate (geovP5 carrier provided by)
        fk_entity: 743371, // object (F5 Item / e.g. Copy of a book)
      } as InfRole
    ];
    this.inf.role.loadSucceeded(fakeStatements, '', 591);
  }


}
