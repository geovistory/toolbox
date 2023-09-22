import {model, property} from '@loopback/repository';
import {PubAccountProjectRel} from '../pub-account-project-rel.model';
import {PubRole} from '../pub-role.model';

@model({
  settings: {
    strict: true
  }
})
export class AccountInfo {

  @property({type: 'number', })
  id?: number;

  @property({type: 'string'})
  username?: string;

  @property({type: 'string'})
  email?: string;

  @property({type: 'string'})
  emailverified?: string;

  @property.array(PubRole)
  roles?: PubRole[];

  @property.array(PubAccountProjectRel)
  projectrels?: PubAccountProjectRel[];
}
