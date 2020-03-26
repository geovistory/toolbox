import { Component, OnInit } from '@angular/core';
import { ActiveProjectService, InfRole } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { values } from 'ramda';
import { combineLatest, Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { GraphPathSegment } from '../graph-path/graph-path.component';

export interface Mentioning {
  path: {
    segments: GraphPathSegment[];
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
    const parentEntity$ = this.p.streamEntityPreview(this.pkEntity);

    const isMentionedInRoles$ = this.p.inf$.role$.by_fk_property__fk_entity$.key('1218_' + this.pkEntity);


    // An Obsevable of number array where the numbers are the pk_entity of the last item in the path
    const pkReferencedEntities$: Observable<number[]> = isMentionedInRoles$.pipe(
      map(isMentionedInRoles => values(isMentionedInRoles)),
      switchMap((isMentionedInRoles) => {
        // I map the input value to a Observable and switchMap will subscribe to the new one
        const arrayOfObs$: Observable<number>[] = isMentionedInRoles.map(role => {
          return this.p.streamEntityPreview(role.fk_temporal_entity)
            .pipe(
              filter((ep) => !ep.loading),
              switchMap((ep) => {
                // Q: What is subject of is mentioned in role?
                if (ep.fk_class == 218) {
                  // return new BehaviorSubject<number>(44);
                  // A: F2 Expression! 
                  // ... so we need to find the source: F5 Item, F3 Manifestation Singleton, F4 Manifestation Product Type or geovC4 Web Request
                  // because this will give us the entity preview for the entity to display in the path

                  return this.p.inf$.role$.by_fk_property__fk_temporal_entity$
                    .key(1316 + '_' + role.fk_temporal_entity)
                    .pipe(map((indexedRoles) => {
                      return values(indexedRoles)[0].fk_entity
                    }))

                } else if (ep.fk_class == 503) {
                  // A: geovC5 Expression Portion
                  return new BehaviorSubject(role.fk_temporal_entity);
                } else {
                  console.warn('unexpected subject class of "mentions" or "is about". Found <' + ep.fk_class + '> for <' + role.pk_entity + '>, should <218 || 503>');
                  return new BehaviorSubject<number>(undefined);
                }



              }))
        })
        combineLatest(arrayOfObs$).subscribe(x => {
          const y = x
        })

        return combineLatest(arrayOfObs$)
      })
    )




    // const carrierProvidedByRoles$ = isMentionedInRoles$.pipe(
    //   map(isMentionedInRoles => values(isMentionedInRoles)),
    //   switchMap((isMentionedInRoles) => {
    //     // I map the input value to a Observable and switchMap will subscribe to the new one
    //     const arrayOfObs$ = isMentionedInRoles.map(role => {
    //       return this.p.inf$.role$.by_fk_property__fk_temporal_entity$
    //         .key(1316 + '_' + role.fk_temporal_entity)
    //         .pipe(map((indexedRoles) => values(indexedRoles)))
    //     })
    //     return combineLatest(arrayOfObs$)
    //   })
    // )


    parentEntity$.subscribe(x => {
      const y = x
    })
    pkReferencedEntities$.subscribe(x => {
      const y = x
    })

    this.items$ = combineLatest(parentEntity$, pkReferencedEntities$).pipe(
      switchMap(([parentEntity, pkReferencedEntities]) => {
        const arrayOfObs$ = pkReferencedEntities.map(pkEntity => this.p.streamEntityPreview(pkEntity).pipe(
          filter((ep) => !ep.loading),
          map(ep => {
            return {
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
        fk_temporal_entity: 737367, // subject (F2 Expression) !!
        fk_property: 1218, // predicate (geovP2 mentions)
        fk_entity: pkEntity, // object (E1 CRM Entity / e.g. a Person)
      } as InfRole,
      {
        pk_entity: 790,
        fk_temporal_entity: 737367, // subject (F2 Expression) !!
        fk_property: 1316, // predicate (geovP5 carrier provided by)
        fk_entity: 737365, // object (F5 Item / e.g. Copy of a book)
      } as InfRole,
      {
        pk_entity: 791,
        fk_temporal_entity: 747097, // subject (geovC5 Expression Portion) !!
        fk_property: 1218, // predicate (geovP2 mentions)
        fk_entity: pkEntity, // object (E1 CRM Entity / e.g. a Person)
      } as InfRole
    ];
    this.inf.role.loadSucceeded(fakeStatements, '', 591);
  }


}
