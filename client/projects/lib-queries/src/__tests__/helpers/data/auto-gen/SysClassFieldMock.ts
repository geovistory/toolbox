/**
 * DEPRECATION WARNING
 * the table system.class_field will not be needed when the
 * text_properties are 'migrated' to statement+lang_string since
 * the class_field will be replaced by proper properties.
 */

import { SysClassField } from '@kleiolab/lib-sdk-lb4';

/**
 * pk_entity prefix: ---
 * we take the pk_entities from the production/staging db
 */
export class SysClassFieldMock {

  static readonly SHORT_TITLE: Partial<SysClassField> = ({ 'pk_entity': 217, 'label': 'Short Title', 'description': 'Short Title for a class instance (without time information.)', 'used_table': 'information.text_property' })

  static readonly EXACT_REFERENCE: Partial<SysClassField> = ({ 'pk_entity': 218, 'label': 'Exact Reference', 'description': 'Exact reference for a F2 Expression (e.g Page "2").)', 'used_table': 'information.text_property' })

  static readonly ENTITY_DEFINITION: Partial<SysClassField> = ({ 'pk_entity': 219, 'label': 'Entity Definition', 'description': 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.', 'used_table': 'information.text_property' })

  static readonly COMMENT: Partial<SysClassField> = ({ 'pk_entity': 3364, 'label': 'Comment', 'description': 'Comments allow you to add any kind of remark to an entity.', 'used_table': 'information.text_property' })


}
// SELECT
// json_build_object(
// 'pk_entity',pk_entity,
// 'label',label,
// 'description',description,
// 'used_table',used_table
// )
// From system.class_field
// WHERE used_table = 'information.text_property'
