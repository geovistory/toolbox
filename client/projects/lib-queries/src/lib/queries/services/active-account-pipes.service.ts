import { Injectable } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { textPropertyByFksWithoutLang } from '@kleiolab/lib-redux';
import { ProProject } from '@kleiolab/lib-sdk-lb4';
import { values } from 'ramda';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PipeCache } from './PipeCache';
import { SchemaSelectorsService } from './schema-selectors.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveAccountPipes extends PipeCache<ActiveAccountPipes> {




  constructor(
    private s: SchemaSelectorsService,

  ) {
    super()
  }
  getProjectsLatestFirst(): Observable<ProProject[]> {
    return this.s.pro$.project$.by_pk_entity$.all$.pipe(
      map(all => values(all).sort((a, b) => {
        const dateA = new Date(a.tmsp_last_modification);
        const dateB = new Date(b.tmsp_last_modification);
        return dateA < dateB ? 1 : -1;
      }))
    )
  }
  getProjectLanguageLabel(proProject: ProProject): Observable<String> {
    return this.s.inf$.language$.by_pk_entity$.key(proProject.fk_language)
      .pipe(
        map(l => l.notes)
      )
  }

  getProjectLabel(projectId: number): Observable<String> {
    return this.s.pro$.text_property$.by_fks_without_lang$.key(textPropertyByFksWithoutLang({
      fk_project: projectId,
      fk_pro_project: projectId,
      fk_system_type: SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL,
    })).pipe(
      map(l => values(l)?.[0]?.string)
    )
  }
  getProjectDescription(projectId: number): Observable<String> {
    return this.s.pro$.text_property$.by_fks_without_lang$.key(textPropertyByFksWithoutLang({
      fk_project: projectId,
      fk_pro_project: projectId,
      fk_system_type: SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION,
    })).pipe(
      map(l => values(l)?.[0]?.string)
    )
  }

}
