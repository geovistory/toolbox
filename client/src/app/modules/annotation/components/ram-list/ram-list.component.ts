import { Component, OnInit } from "@angular/core";
import { InfRole, ActiveProjectService } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { map, switchMap } from 'rxjs/operators';
import { values } from 'ramda';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { BehaviorSubject, Observable } from 'rxjs';



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
    selector: "gv-ram-list",
    templateUrl: "./ram-list.component.html",
    styleUrls: ["./ram-list.component.scss"]
})
export class RamListComponent implements OnInit {

    items$: Observable<Mentioning[]>;
    cols: any[];

    constructor(
        private inf: InfActions,
        private p: ActiveProjectService,
    ) { }

    ngOnInit() {
        this.setCols();

        this.items$ = this.p.inf$.role$.by_fk_property__fk_entity$.key('1218_752784')
            .pipe(
                map(indexedRoles => values(indexedRoles)),
                switchMap(rolesArr => {
                    const rolesArr$ = rolesArr.map(role => {
                        const temp: Mentioning = {
                            actions: undefined,
                            path: {
                                segments: ['seg1', 'seg2'],
                            },
                            property: {
                                label: "label", tooltip: "tooltip"
                            }
                        }
                        return new BehaviorSubject(temp);
                    })
                    return combineLatestOrEmpty(rolesArr$);
                })
            );

        this.getMentions(752784);
    }

    setCols() {
        return [
            {
                field: "path",
                header: "Item",
                hasFilter: true,
                filterMatchMode: "contains",
                filterCol: "path.text",
                width: "50%"
            },
            {
                field: "location",
                header: "Reference",
                tooltip: "Location within item",
                hasFilter: true,
                filterMatchMode: "contains",
                filterCol: "location.label",
                width: "25%"
            },
            {
                field: "action",
                header: "Action",
                hasFilter: false,
                width: "40px"
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
                fk_entity: pkEntity, //object
                fk_property: 1218, //is mentionned
                fk_temporal_entity: 987//subject
            } as InfRole,
            {
                pk_entity: 790,
                fk_entity: 752808, //object
                fk_property: 1316,
                fk_temporal_entity: 987//subject
            } as InfRole
        ];
        this.inf.role.loadSucceeded(fakeStatements, '');
    }


}
