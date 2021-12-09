import {TrueEnum} from '../../models/enums/TrueEnum';
import {GvFieldPageReq} from '../../models/field/gv-field-page-req';

export const maleIsGenderOf: GvFieldPageReq[] = [{
  "pkProject": 591,
  "targets": {"21": {"entityPreview": TrueEnum.true}},
  "page": {
    "source": {"fkInfo": 739340},
    "property": {"fkProperty": 1429},
    "limit": 0,
    "offset": 0,
    "isOutgoing": false,
    "scope": {"notInProject": 591}
  }
}]
