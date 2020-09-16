import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH} from '../../../Warehouse';
import {RClassLabelProviders} from './RClassLabelProviders';

export class RClassLabelAggregator extends AbstractAggregator<RClassId> {


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
    await this.providers.load();

    // default language (en)
    const defaultLang = PK_ENGLISH;

    // class label
    let classLabel: string | undefined;

    /**
    * Try to get label in english
    */

    // from geovistory
    classLabel = await this.providers.proClassLabel.get({
      fkClass: this.id.pkClass,
      fkLanguage: defaultLang,
      fkProject: PK_DEFAULT_CONFIG_PROJECT
    })

    if (classLabel) return this.finalize(classLabel);

    // from ontome
    classLabel = await this.providers.dfhClassLabel.get({
      pkClass: this.id.pkClass,
      language: 'en'

    })

    if (classLabel) return this.finalize(classLabel);

    return this
  }

  finalize(label: string) {
    this.classLabel = label;
    this.labelMissing = false;
    return this;
  }
}


