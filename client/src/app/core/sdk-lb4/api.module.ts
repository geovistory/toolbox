import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AccountService } from './api/account.service';
import { AnalysisService } from './api/analysis.service';
import { DatChunkService } from './api/datChunk.service';
import { DatChunkControllerService } from './api/datChunkController.service';
import { DatColumnService } from './api/datColumn.service';
import { DatDigitalService } from './api/datDigital.service';
import { DatNamespaceService } from './api/datNamespace.service';
import { DfhClassService } from './api/dfhClass.service';
import { DfhLabelService } from './api/dfhLabel.service';
import { DfhProfileService } from './api/dfhProfile.service';
import { DfhPropertyService } from './api/dfhProperty.service';
import { FactoidControllerService } from './api/factoidController.service';
import { ImportTableControllerService } from './api/importTableController.service';
import { InfLanguageService } from './api/infLanguage.service';
import { InfPersistentItemService } from './api/infPersistentItem.service';
import { InfPlaceService } from './api/infPlace.service';
import { InfStatementService } from './api/infStatement.service';
import { InfTemporalEntityService } from './api/infTemporalEntity.service';
import { InfTextPropertyService } from './api/infTextProperty.service';
import { PaginationObjectService } from './api/paginationObject.service';
import { PingControllerService } from './api/pingController.service';
import { ProClassFieldConfigService } from './api/proClassFieldConfig.service';
import { ProDfhClassProjRelService } from './api/proDfhClassProjRel.service';
import { ProDfhProfileProjRelService } from './api/proDfhProfileProjRel.service';
import { ProInfoProjRelService } from './api/proInfoProjRel.service';
import { ProProjectService } from './api/proProject.service';
import { ProTextPropertyService } from './api/proTextProperty.service';
import { ProjectConfigurationService } from './api/projectConfiguration.service';
import { PubAccountService } from './api/pubAccount.service';
import { RamListService } from './api/ramList.service';
import { SchemaObjectService } from './api/schemaObject.service';
import { SysAppContextService } from './api/sysAppContext.service';
import { SysClassFieldService } from './api/sysClassField.service';
import { SysClassHasTypePropertyService } from './api/sysClassHasTypeProperty.service';
import { SysSystemRelevantClassService } from './api/sysSystemRelevantClass.service';
import { SysSystemTypeService } from './api/sysSystemType.service';
import { SystemConfigurationService } from './api/systemConfiguration.service';
import { TableService } from './api/table.service';
import { WarEntityPreviewControllerService } from './api/warEntityPreviewController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
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
