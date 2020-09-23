import {Entity, model, property} from '@loopback/repository';

@model()
export class LabelPartField {
  @property() fkProperty: number
  @property() isOutgoing: boolean
  @property() nrOfStatementsInLabel?: number
}
@model()
export class LabelPart {
  @property() field?: LabelPartField
  @property() ordNum: number
}
@model()
export class EntityLabelConfig {
  @property.array(LabelPart)
  labelParts?: LabelPart[]
}

@model({
  settings: {
    strict: true,
    postgresql: {schema: 'projects', table: 'entity_label_config'},
    validateUpsert: true,
    idInjection: true
  }
})
export class ProEntityLabelConfig extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  pk_entity: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_project: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_class: number;

  @property({
    required: true,
    type: EntityLabelConfig
  })
  config: EntityLabelConfig;


  constructor(data?: Partial<ProEntityLabelConfig>) {
    super(data);
  }
}

export interface ProEntityLabelConfigRelations {
  // describe navigational properties here
}

export type ProEntityLabelConfigWithRelations = ProEntityLabelConfig & ProEntityLabelConfigRelations;
