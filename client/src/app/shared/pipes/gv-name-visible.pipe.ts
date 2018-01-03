import { Pipe, PipeTransform } from '@angular/core';
import { InformationRole } from '../sdk/models/InformationRole';

@Pipe({
  name: 'gvNameVisible'
})
export class GvNameVisiblePipe implements PipeTransform {

  transform(names: InformationRole[], state: string, projectId:number): any {
      if (!names || !state) {
          return names;
      }

      // TODO
      if (state === "communityDataView") {
          return names;
      }
      // filter names array, names which match and return true will be kept, false will be filtered out
      if (state === "edit") {
          return names.filter(names => {
            const epr = names.entity_version_project_rels.filter(epr => epr.fk_project===projectId)
            if(epr.length === 1 && epr[0].is_in_project === true){
              return true;
            }
            return false;
          });
      }

      return names;
  }

}
