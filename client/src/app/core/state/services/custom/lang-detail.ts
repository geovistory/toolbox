import { ProjectCrm } from 'app/core/active-project/active-project.models';
import { InfLanguage } from 'app/core/sdk';
import { StateService } from '../core/state-service';
import { StateSettings } from '../core/state-settings';
import { Injectable } from '@angular/core';
import { LangDetail } from 'app/core/state/models';

/**
 * Service for the 'LangDetail' model
 */
@Injectable()
export class LangDetailService implements StateService<InfLanguage, LangDetail> {

    createState(options: LangDetail, language: InfLanguage, crm: ProjectCrm, settings: StateSettings): LangDetail {
        return new LangDetail({
            ...options,
            language
        });
    }
}
