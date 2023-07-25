import { Component, OnInit } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'gv-digitals-list',
  templateUrl: './digitals-list.component.html',
  styleUrls: ['./digitals-list.component.scss']
})
export class DigitalsListComponent implements OnInit {

  pkClassesOfAddBtn$ = this.c.pipeClassesOfProject().pipe(
    map(items => items
      .filter(item => item.belongsToCategory?.digitals?.showInAddMenu)
      .map(item => item.dfhClass.pk_class)
    )
  );
  constructor(
    private c: ConfigurationPipesService,
    public p: ActiveProjectService,
  ) { }

  ngOnInit(): void {
  }

}
