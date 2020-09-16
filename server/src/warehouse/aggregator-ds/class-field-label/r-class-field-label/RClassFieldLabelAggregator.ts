import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH} from '../../../Warehouse';
import {RClassFieldLabelProviders} from './RClassFieldLabelProviders';
import {RClassFieldId} from './RClassFieldLabelService';

export class RClassFieldLabelAggregator extends AbstractAggregator<RClassFieldId> {


  // the resulting label
  propertyLabel = '';

  // For testing / debugging
  labelMissing = true;

  constructor(
    public providers: RClassFieldLabelProviders,
    public id: RClassFieldId
  ) {
    super()
  }

  async create() {
    await this.providers.load();



    // default language (en)
    const defaultLang = PK_ENGLISH;


    // property label
    let propertyLabel: string | undefined;



    /**
    * Try to get label in english
    */
    // from geovistory
    propertyLabel = await this.providers.proPropertyLabel.get({
      fkProject: PK_DEFAULT_CONFIG_PROJECT,
      fkClass: this.id.fkClass,
      fkProperty: this.id.fkProperty,
      isOutgoing: this.id.isOutgoing,
      fkLanguage: defaultLang,
    })

    if (propertyLabel) return this.finalize(propertyLabel);

    // from ontome
    propertyLabel = await this.providers.dfhPropertyLabel.get({
      pkProperty: this.id.fkProperty,
      language: 'en'

    })
    if (propertyLabel) {
      propertyLabel = this.completeReverseLabels(propertyLabel);
      return this.finalize(propertyLabel);
    }



    return this
  }

  finalize(label: string) {
    this.propertyLabel = label;
    this.labelMissing = false;
    return this;
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

