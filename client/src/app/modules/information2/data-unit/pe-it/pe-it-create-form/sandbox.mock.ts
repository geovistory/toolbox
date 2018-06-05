import { DfhClass, DfhLabel, DfhProperty } from "app/core";
import { PeItDetail } from "../../../information.models";

export const mockPerson: PeItDetail = {
    dfhClass: {
      dfh_pk_class: 1,
      dfh_standard_label: 'Person'
    } as DfhClass,
    ingoingRoleSets: [],
    outgoingRoleSets: [],
    _roleSet_list: {
      '_role_set_1': {
        _role_list: {
          _role_detail_1: {
            _teEnt: {
              dfhClass: {
                dfh_pk_class: 3,
                dfh_identifier_in_namespace: "F52",
                dfh_standard_label: "Name Use Activity",
              } as DfhClass,
              _roleSet_list: {
                _role_set_1: {
                  _role_list: {
                    _role_detail_1: {
                      _appe: {
  
                      }
                    }
                  },
                  property: {
                    "dfh_pk_property": 2,
                    "dfh_identifier_in_namespace": "R64",
                    "dfh_has_domain": 3,
                    "dfh_has_range": 2,
                    "dfh_standard_label": "Used Name",
                    "dfh_domain_instances_min_quantifier": 0,
                    "dfh_domain_instances_max_quantifier": -1,
                    "dfh_range_instances_min_quantifier": 1,
                    "dfh_range_instances_max_quantifier": 1,
                    "pk_entity": 737,
                    labels:[
                      {
                        "dfh_label": "Detailed Name",
                        "notes": "label.sg", 
                      } as DfhLabel,
                      {                
                        "dfh_label": "Detailed Names",                    
                        "notes": "label.pl",
                      }as DfhLabel,
                      {                
                        "dfh_label": "Names with this details",                    
                        "notes": "label_inversed.sg",
                      }as DfhLabel,
                      {                
                        "dfh_label": "Name with this details",                    
                        "notes": "label_inversed.pl",
                      }as DfhLabel,
                    ]
                  } as DfhProperty
                }
              }
            }
          }
        },
        property: {
          "dfh_pk_property": 1,
          "dfh_identifier_in_namespace": "R63",
          "dfh_has_domain": 3,
          "dfh_has_range": 1,
          "dfh_standard_label": "Named",
          "dfh_domain_instances_min_quantifier": 0,
          "dfh_domain_instances_max_quantifier": -1,
          "dfh_range_instances_min_quantifier": 0,
          "dfh_range_instances_max_quantifier": -1,
          "pk_entity": 736,
          labels: [
            {
              "dfh_label": "Entity with this Name",
              "pk_entity": 751,
              "notes": "label.sg",
            },
            {
              "dfh_label": "Entities with this Name",
              "pk_entity": 752,
              "notes": "label.pl",
            },
            {
              "dfh_label": "Name",
              "pk_entity": 753,
              "notes": "label_inversed.sg",
            },
            {
              "dfh_label": "Names",
              "pk_entity": 754,
              "notes": "label_inversed.pl",
            }
          ]
        } as DfhProperty,
  
      }
    }
  }