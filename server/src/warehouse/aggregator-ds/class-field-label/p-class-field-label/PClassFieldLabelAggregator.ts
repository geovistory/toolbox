import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {PK_DEFAULT_CONFIG_PROJECT, PK_ENGLISH} from '../../../Warehouse';
import {PClassFieldLabelProviders} from './PClassFieldLabelProviders';
import {PClassFieldId} from './PClassFieldLabelService';

export class PClassFieldLabelAggregator extends AbstractAggregator<PClassFieldId> {


  // the resulting label
  propertyLabel = '';

  // For testing / debugging
  labelMissing = true;

  constructor(
    public providers: PClassFieldLabelProviders,
    public id: PClassFieldId
  ) {
    super()
  }

  async create() {
    await this.providers.load();

    const project = await this.providers.project.get({pkProject: this.id.fkProject})
    if (project) {

      // default language (en)
      const defaultLang = PK_ENGLISH;

      // project language
      const proLang = project.fkLanguage

      // property label
      let propertyLabel: string | undefined;

      /**
       * Try to get label in project language
       */

      // from project
      propertyLabel = await this.providers.proPropertyLabel.get({
        fkProject: this.id.fkProject,
        fkClass: this.id.fkClass,
        fkProperty: this.id.fkProperty,
        isOutgoing: this.id.isOutgoing,
        fkLanguage: proLang,
      })

      if (propertyLabel) return this.finalize(propertyLabel);

      // from geovistory
      propertyLabel = await this.providers.proPropertyLabel.get({
        fkProject: PK_DEFAULT_CONFIG_PROJECT,
        fkClass: this.id.fkClass,
        fkProperty: this.id.fkProperty,
        isOutgoing: this.id.isOutgoing,
        fkLanguage: proLang,
      })

      if (propertyLabel) return this.finalize(propertyLabel);

      // from ontome
      const iso6391ProLang = pkLanguageIso6391Map[proLang];
      if (iso6391ProLang) {
        propertyLabel = await this.providers.dfhPropertyLabel.get({
          pkProperty: this.id.fkProperty,
          language: iso6391ProLang
        })
      }

      if (propertyLabel) {
        propertyLabel = this.completeReverseLabels(propertyLabel);
        return this.finalize(propertyLabel);
      }

      /**
      * Try to get label in english
      */

      // from project
      propertyLabel = await this.providers.proPropertyLabel.get({
        fkProject: this.id.fkProject,
        fkClass: this.id.fkClass,
        fkProperty: this.id.fkProperty,
        isOutgoing: this.id.isOutgoing,
        fkLanguage: defaultLang,
      })

      if (propertyLabel) return this.finalize(propertyLabel);

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



export const pkLanguageIso6391Map: {[key: number]: string | undefined} = {
  17082: 'aa',
  17099: 'ab',
  17184: 'af',
  17260: 'ak',
  17314: 'am',
  17413: 'ar',
  17418: 'an',
  17448: 'as',
  17508: 'av',
  17511: 'ae',
  17558: 'ay',
  17572: 'az',
  17588: 'ba',
  17590: 'bm',
  17689: 'be',
  17691: 'bn',
  17793: 'bi',
  17925: 'bo',
  17940: 'bs',
  18000: 'br',
  18080: 'bg',
  18235: 'ca',
  18290: 'cs',
  18300: 'ch',
  18304: 'ce',
  18318: 'cu',
  18319: 'cv',
  18419: 'kw',
  18420: 'co',
  18443: 'cr',
  18529: 'cy',
  18547: 'da',
  18605: 'de',
  18660: 'dv',
  18826: 'dz',
  18865: 'el',
  18889: 'en',
  18903: 'eo',
  18925: 'et',
  18939: 'eu',
  18943: 'ee',
  18962: 'fo',
  18965: 'fa',
  18979: 'fj',
  18981: 'fi',
  19008: 'fr',
  19019: 'fy',
  19031: 'ff',
  19192: 'gd',
  19195: 'ga',
  19196: 'gl',
  19205: 'gv',
  19282: 'gn',
  19314: 'gu',
  19393: 'ht',
  19394: 'ha',
  19404: 'sh',
  19412: 'he',
  19418: 'hz',
  19434: 'hi',
  19465: 'ho',
  19516: 'hr',
  19542: 'hu',
  19564: 'hy',
  19576: 'ig',
  19590: 'io',
  19616: 'ii',
  19632: 'iu',
  19639: 'ie',
  19657: 'ia',
  19659: 'id',
  19675: 'ik',
  19696: 'is',
  19703: 'it',
  19752: 'jv',
  19839: 'ja',
  19883: 'kl',
  19885: 'kn',
  19889: 'ks',
  19890: 'ka',
  19891: 'kr',
  19896: 'kk',
  20056: 'km',
  20080: 'ki',
  20083: 'rw',
  20087: 'ky',
  20234: 'kv',
  20235: 'kg',
  20239: 'ko',
  20372: 'kj',
  20389: 'ku',
  20535: 'lo',
  20540: 'la',
  20542: 'lv',
  20656: 'li',
  20657: 'ln',
  20663: 'lt',
  20817: 'lb',
  20819: 'lu',
  20824: 'lg',
  20869: 'mh',
  20873: 'ml',
  20877: 'mr',
  21112: 'mk',
  21139: 'mg',
  21152: 'mt',
  21217: 'mn',
  21288: 'mi',
  21306: 'ms',
  21453: 'my',
  21518: 'na',
  21519: 'nv',
  21534: 'nr',
  21573: 'nd',
  21583: 'ng',
  21609: 'ne',
  21740: 'nl',
  21795: 'nn',
  21807: 'nb',
  21822: 'no',
  21957: 'ny',
  22005: 'oc',
  22028: 'oj',
  22107: 'or',
  22108: 'om',
  22125: 'os',
  22170: 'pa',
  22315: 'pi',
  22383: 'pl',
  22389: 'pt',
  22479: 'ps',
  22507: 'qu',
  22670: 'rm',
  22673: 'ro',
  22701: 'rn',
  22705: 'ru',
  22727: 'sg',
  22732: 'sa',
  22893: 'si',
  22953: 'sk',
  22963: 'sl',
  22972: 'se',
  22981: 'sm',
  22993: 'sn',
  22996: 'sd',
  23029: 'so',
  23035: 'st',
  23042: 'es',
  23065: 'sq',
  23078: 'sc',
  23089: 'sr',
  23121: 'ss',
  23156: 'su',
  23174: 'sw',
  23177: 'sv',
  23243: 'ty',
  23247: 'ta',
  23254: 'tt',
  23341: 'te',
  23369: 'tg',
  23370: 'tl',
  23384: 'th',
  23418: 'ti',
  23537: 'to',
  23619: 'tn',
  23620: 'ts',
  23667: 'tk',
  23673: 'tr',
  23701: 'tw',
  23782: 'ug',
  23792: 'uk',
  23838: 'ur',
  23878: 'uz',
  23904: 've',
  23912: 'vi',
  23958: 'vo',
  24081: 'wa',
  24127: 'wo',
  24278: 'xh',
  24572: 'yi',
  24651: 'yo',
  24776: 'za',
  24781: 'zh',
  24901: 'zu',
}