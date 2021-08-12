import { model, property } from '@loopback/repository';
import { CommunityVisibilityOptions } from "./sys-config-community-visibility-options";


@model({
  jsonSchema: {
    description: "If present, defines a visibility range for class instances.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class VisibilityRange {
  @property({ type: CommunityVisibilityOptions, required: true }) min: CommunityVisibilityOptions;
  @property({ type: CommunityVisibilityOptions, required: true }) max: CommunityVisibilityOptions;
}
