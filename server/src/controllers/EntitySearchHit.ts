import {model, property} from '@loopback/repository';
import {WarEntityPreview, InfStatement} from '../models';
import {registerType} from '../components/spec-enhancer/model.spec.enhancer';

@model() export class EntitySearchHit extends WarEntityPreview {
  @property() full_text_headline?: string;
  @property() class_label_headline?: string;
  @property() entity_label_headline?: string;
  @property() type_label_headline?: string;
  @property.array(Number) projects?: number[];
  @property.array(InfStatement) related_statements?: InfStatement[];
}

registerType(EntitySearchHit)
