import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH} from '../../../Warehouse';
import {pkLanguageIso6391Map} from '../class-label.commons';
import {PClassLabelProviders} from './PClassLabelProviders';
import {PClassLabelVal} from './PClassLabelService';

export class PClassLabelAggregator extends AbstractAggregator<PClassLabelVal> {



  constructor(
    public providers: PClassLabelProviders,
    public id: PClassId
  ) {
    super()
  }

  async create() {

    // const project = await this.providers.proProject.get({pkProject: this.id.fkProject})
    // if (project) {

    //   // default language (en)
    //   const defaultLang = PK_ENGLISH;

    //   // project language
    //   const proLang = project.fkLanguage

    //   // class label
    //   let classLabel: string | undefined;

    //   /**
    //    * Try to get label in project language
    //    */

    //   // from project
    //   classLabel = (await this.providers.proClassLabel.get({
    //     fkClass: this.id.pkClass,
    //     fkLanguage: proLang,
    //     fkProject: this.id.fkProject
    //   }))?.label

    //   if (classLabel) return this.finalize(classLabel);

    //   // from geovistory
    //   classLabel = (await this.providers.proClassLabel.get({
    //     fkClass: this.id.pkClass,
    //     fkLanguage: proLang,
    //     fkProject: PK_DEFAULT_CONFIG_PROJECT
    //   }))?.label

    //   if (classLabel) return this.finalize(classLabel);

    //   // from ontome
    //   const iso6391ProLang = pkLanguageIso6391Map[proLang];
    //   if (iso6391ProLang) {
    //     classLabel =( await this.providers.dfhClassLabel.get({
    //       pkClass: this.id.pkClass,
    //       language: iso6391ProLang

    //     }))?.label
    //   }

    //   if (classLabel) return this.finalize(classLabel);

    //   /**
    //   * Try to get label in english
    //   */

    //   // from project
    //   classLabel = (await this.providers.proClassLabel.get({
    //     fkClass: this.id.pkClass,
    //     fkLanguage: defaultLang,
    //     fkProject: this.id.fkProject
    //   }))?.label

    //   if (classLabel) return this.finalize(classLabel);

    //   // from geovistory
    //   classLabel = (await this.providers.proClassLabel.get({
    //     fkClass: this.id.pkClass,
    //     fkLanguage: defaultLang,
    //     fkProject: PK_DEFAULT_CONFIG_PROJECT
    //   }))?.label

    //   if (classLabel) return this.finalize(classLabel);

    //   // from ontome
    //   classLabel = (await this.providers.dfhClassLabel.get({
    //     pkClass: this.id.pkClass,
    //     language: 'en'

    //   }))?.label

    //   if (classLabel) return this.finalize(classLabel);

    // }

    return this.finalize()
  }

  finalize(label?: string) {
    return {label};
  }
}




