import { Component } from '@angular/core';
import { ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { map } from 'rxjs/operators';
import { ActiveProjectService } from '../../../../../services/active-project.service';
import { AddEntityMenuComponent } from '../../../../data/add-entity-menu/add-entity-menu.component';
import { ListService } from '../../services/list.service';
import { ListDrawerHeaderComponent } from '../list-drawer-header/list-drawer-header.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'gv-digitals-list',
  templateUrl: './digitals-list.component.html',
  styleUrls: ['./digitals-list.component.scss'],
  standalone: true,
  imports: [ListDrawerHeaderComponent, AddEntityMenuComponent, ListComponent]
})
export class DigitalsListComponent {

  constructor(
    private c: ConfigurationPipesService,
    public p: ActiveProjectService,
    public state: StateFacade,
    listService: ListService
  ) {
    listService.pkAllowedClasses$ = this.c.pipeClassesOfProject().pipe(
      map(items => items
        .filter(item => item.belongsToCategory?.digitals?.showInAddMenu)
        .map(item => item.dfhClass.pk_class)
      )
    );
  }
}
