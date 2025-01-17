import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AccountService } from './api/account.service';
import { AccountDataService } from './api/accountData.service';
import { AnalysisService } from './api/analysis.service';
import { BackofficeService } from './api/backoffice.service';
import { CommunityVisibilityService } from './api/communityVisibility.service';
import { ContentTreeService } from './api/contentTree.service';
import { DatChunkControllerService } from './api/datChunkController.service';
import { DataModelService } from './api/dataModel.service';
import { FactoidControllerService } from './api/factoidController.service';
import { ImportTableControllerService } from './api/importTableController.service';
import { LanguagesService } from './api/languages.service';
import { OntoMeControllerService } from './api/ontoMeController.service';
import { PingControllerService } from './api/pingController.service';
import { ProjectConfigurationService } from './api/projectConfiguration.service';
import { ProjectDataService } from './api/projectData.service';
import { RamListService } from './api/ramList.service';
import { SubfieldPageControllerService } from './api/subfieldPageController.service';
import { SystemConfigurationService } from './api/systemConfiguration.service';
import { SystemTypesService } from './api/systemTypes.service';
import { TableService } from './api/table.service';
import { WarEntityPreviewControllerService } from './api/warEntityPreviewController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
