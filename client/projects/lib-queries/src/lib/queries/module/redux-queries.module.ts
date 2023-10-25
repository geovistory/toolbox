import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ReduxModule } from '@kleiolab/lib-redux/public-api';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [

  ]
})
export class ReduxQueriesModule {
  constructor(
    @Optional() @SkipSelf() parentModule: ReduxQueriesModule,
    @Optional() reduxModule: ReduxModule,
  ) {
    const errors: string[] = []
    if (parentModule) errors.push('ReduxQueriesModule is already loaded. Import in your base AppModule only.');
    if (!reduxModule) errors.push('You need to import the ReduxModule in your AppModule!');
    if (errors.length) throw new Error(errors.join('\n'));
  }
}
