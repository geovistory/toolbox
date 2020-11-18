import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH} from '../../../Warehouse';
import {RClassFieldLabelProviders} from './RClassFieldLabelProviders';
import {RClassFieldId, RClassFieldVal} from './RClassFieldLabelService';
import {ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService';

export class RClassFieldLabelAggregator extends AbstractAggregator<RClassFieldVal> {

  constructor(
    public providers: RClassFieldLabelProviders,
    public id: RClassFieldId
  ) {
    super()
  }

  async create() {



    // default language (en)
    const defaultLang = PK_ENGLISH;


    // property label
    let val: ProPropertyLabelVal | undefined;



    /**
    * Try to get label in english
    */
    // from geovistory
    val = await this.providers.proPropertyLabel.get({
      fkProject: PK_DEFAULT_CONFIG_PROJECT,
      fkClass: this.id.fkClass,
      fkProperty: this.id.fkProperty,
      isOutgoing: this.id.isOutgoing,
      fkLanguage: defaultLang,
    })

    if (val?.label) return this.finalize(val.label);

    // from ontome
    val = await this.providers.dfhPropertyLabel.get({
      pkProperty: this.id.fkProperty,
      language: 'en'

    })
    if (val?.label) {
      const label = this.completeReverseLabels(val.label);
      return this.finalize(label);
    }



    return this.finalize()
  }

  finalize(label?: string): RClassFieldVal {
    return {label};
  }

  /**
   * Completes labels of incoming properties, when no incoming label was found
   * @param propertyLabel
   */
  private completeReverseLabels(propertyLabel: string) {
    if (!this.id.isOutgoing)
      propertyLabel = '[reverse of: ' + propertyLabel + ']';
    return propertyLabel;
  }

}

