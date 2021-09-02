import { model, property } from '@loopback/repository';


@model()
export class CommunityVisibilityOptions {
  @property({ required: true }) toolbox: boolean;
  @property({ required: true }) dataApi: boolean;
  @property({ required: true }) website: boolean;
}
@model()
export class CommunityVisibilityOptionsWithRelations extends CommunityVisibilityOptions {
}




