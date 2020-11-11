import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH} from '../../../Warehouse';
import {RClassLabelProviders} from './RClassLabelProviders';
import {RClassLabelValue} from './RClassLabelService';

export class RClassLabelAggregator extends AbstractAggregator<RClassLabelValue> {


  // the resulting label
  classLabel = '';

  // For testing / debugging
  labelMissing = true;



  constructor(
    public providers: RClassLabelProviders,
    public id: RClassId
  ) {
    super()
  }

  async create() {

    // default language (en)
    const defaultLang = PK_ENGLISH;

    // class label
    let classLabel: string | undefined;

    /**
    * Try to get label in english
    */

    // from geovistory
    classLabel = (await this.providers.proClassLabel.get({
      fkClass: this.id.pkClass,
      fkLanguage: defaultLang,
      fkProject: PK_DEFAULT_CONFIG_PROJECT
    }))?.label

    if (classLabel) return this.finalize(classLabel);

    // from ontome
    classLabel = (await this.providers.dfhClassLabel.get({
      pkClass: this.id.pkClass,
      language: 'en'
    }))?.label

    return this.finalize(classLabel);

  }

  finalize(label?: string) {
    return {label};
  }
}


