import { GvPaginationObject } from '@kleiolab/lib-sdk-lb4';

export const response2: GvPaginationObject = {
  "subfieldPages": [
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765188,
            "pk_entity": 866583,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "ord_num_of_domain": 1,
            "is_standard_in_project": false
          },
          "isOutgoing": false,
          "ordNum": 1,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 365,
                "pk_entity": 765184,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765184",
                "fk_type": 739297,
                "fk_class": 365,
                "pk_entity": 765184,
                "project_id": 591,
                "type_label": "Nome completo",
                "class_label": "Naming",
                "entity_type": "teEn",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:54.102709+00:00"
              }
            }
          },
          "targetClass": 365,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765188,
            "fk_property": 1111,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765184,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        },
        {
          "projRel": {
            "fk_entity": 765199,
            "pk_entity": 866593,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": false,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 365,
                "pk_entity": 765195,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_765195",
                "fk_type": 741575,
                "fk_class": 365,
                "pk_entity": 765195,
                "project_id": 0,
                "type_label": "Cognome",
                "class_label": "Naming",
                "entity_type": "teEn",
                "entity_label": "Straves",
                "tmsp_last_modification": "2023-10-13T12:37:14.438137+00:00"
              }
            }
          },
          "targetClass": 365,
          "targetLabel": "Straves",
          "statement": {
            "pk_entity": 765199,
            "fk_property": 1111,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765195,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        },
        {
          "projRel": {
            "fk_entity": 765193,
            "pk_entity": 866588,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": false,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 365,
                "pk_entity": 765189,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_765189",
                "fk_type": 746080,
                "fk_class": 365,
                "pk_entity": 765189,
                "project_id": 0,
                "type_label": "Titolo di rispetto o di cerimonia",
                "class_label": "Naming",
                "entity_type": "teEn",
                "entity_label": "ser",
                "tmsp_last_modification": "2023-10-13T12:37:25.151812+00:00"
              }
            }
          },
          "targetClass": 365,
          "targetLabel": "ser",
          "statement": {
            "pk_entity": 765193,
            "fk_property": 1111,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765189,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 3,
      "req": {
        "pkProject": 591,
        "targets": {
          "365": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "630": {
                    "entityPreview": "true"
                  },
                  "874": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1430
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "1": {
                    "entityPreview": "true"
                  },
                  "5": {
                    "entityPreview": "true"
                  },
                  "21": {
                    "entityPreview": "true"
                  },
                  "53": {
                    "entityPreview": "true"
                  },
                  "60": {
                    "entityPreview": "true"
                  },
                  "61": {
                    "entityPreview": "true"
                  },
                  "62": {
                    "entityPreview": "true"
                  },
                  "63": {
                    "entityPreview": "true"
                  },
                  "67": {
                    "entityPreview": "true"
                  },
                  "68": {
                    "entityPreview": "true"
                  },
                  "71": {
                    "entityPreview": "true"
                  },
                  "78": {
                    "entityPreview": "true"
                  },
                  "79": {
                    "entityPreview": "true"
                  },
                  "212": {
                    "entityPreview": "true"
                  },
                  "213": {
                    "entityPreview": "true"
                  },
                  "218": {
                    "entityPreview": "true"
                  },
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "234": {
                    "entityPreview": "true"
                  },
                  "244": {
                    "entityPreview": "true"
                  },
                  "332": {
                    "entityPreview": "true"
                  },
                  "334": {
                    "entityPreview": "true"
                  },
                  "340": {
                    "entityPreview": "true"
                  },
                  "363": {
                    "entityPreview": "true"
                  },
                  "364": {
                    "entityPreview": "true"
                  },
                  "365": {
                    "entityPreview": "true"
                  },
                  "441": {
                    "entityPreview": "true"
                  },
                  "442": {
                    "entityPreview": "true"
                  },
                  "443": {
                    "entityPreview": "true"
                  },
                  "444": {
                    "entityPreview": "true"
                  },
                  "445": {
                    "entityPreview": "true"
                  },
                  "449": {
                    "entityPreview": "true"
                  },
                  "450": {
                    "entityPreview": "true"
                  },
                  "451": {
                    "entityPreview": "true"
                  },
                  "452": {
                    "entityPreview": "true"
                  },
                  "454": {
                    "entityPreview": "true"
                  },
                  "455": {
                    "entityPreview": "true"
                  },
                  "456": {
                    "appellation": "true"
                  },
                  "457": {
                    "entityPreview": "true"
                  },
                  "459": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  },
                  "503": {
                    "entityPreview": "true"
                  },
                  "516": {
                    "entityPreview": "true"
                  },
                  "518": {
                    "entityPreview": "true"
                  },
                  "519": {
                    "entityPreview": "true"
                  },
                  "520": {
                    "entityPreview": "true"
                  },
                  "521": {
                    "cell": "true"
                  },
                  "535": {
                    "entityPreview": "true"
                  },
                  "607": {
                    "entityPreview": "true"
                  },
                  "608": {
                    "entityPreview": "true"
                  },
                  "629": {
                    "entityPreview": "true"
                  },
                  "630": {
                    "entityPreview": "true"
                  },
                  "631": {
                    "entityPreview": "true"
                  },
                  "632": {
                    "entityPreview": "true"
                  },
                  "633": {
                    "entityPreview": "true"
                  },
                  "634": {
                    "entityPreview": "true"
                  },
                  "635": {
                    "entityPreview": "true"
                  },
                  "636": {
                    "entityPreview": "true"
                  },
                  "637": {
                    "entityPreview": "true"
                  },
                  "638": {
                    "entityPreview": "true"
                  },
                  "664": {
                    "entityPreview": "true"
                  },
                  "690": {
                    "entityPreview": "true"
                  },
                  "691": {
                    "entityPreview": "true"
                  },
                  "694": {
                    "entityPreview": "true"
                  },
                  "695": {
                    "entityPreview": "true"
                  },
                  "698": {
                    "entityPreview": "true"
                  },
                  "702": {
                    "entityPreview": "true"
                  },
                  "708": {
                    "entityPreview": "true"
                  },
                  "718": {
                    "entityPreview": "true"
                  },
                  "785": {
                    "entityPreview": "true"
                  },
                  "808": {
                    "entityPreview": "true"
                  },
                  "827": {
                    "entityPreview": "true"
                  },
                  "838": {
                    "entityPreview": "true"
                  },
                  "839": {
                    "entityPreview": "true"
                  },
                  "867": {
                    "entityPreview": "true"
                  },
                  "869": {
                    "entityPreview": "true"
                  },
                  "871": {
                    "entityPreview": "true"
                  },
                  "872": {
                    "entityPreview": "true"
                  },
                  "873": {
                    "entityPreview": "true"
                  },
                  "874": {
                    "entityPreview": "true"
                  },
                  "883": {
                    "entityPreview": "true"
                  },
                  "898": {
                    "entityPreview": "true"
                  },
                  "899": {
                    "entityPreview": "true"
                  },
                  "900": {
                    "entityPreview": "true"
                  },
                  "903": {
                    "entityPreview": "true"
                  },
                  "904": {
                    "entityPreview": "true"
                  },
                  "969": {
                    "entityPreview": "true"
                  },
                  "1076": {
                    "entityPreview": "true"
                  },
                  "1150": {
                    "entityPreview": "true"
                  },
                  "1210": {
                    "entityPreview": "true"
                  },
                  "1295": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "40": {
                    "appellation": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1113
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "54": {
                    "language": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1112
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          },
          "868": {
            "nestedResource": [
              {
                "targets": {
                  "869": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1430
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "868": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "868": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "40": {
                    "appellation": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1113
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "54": {
                    "language": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1112
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1111
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1499
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "213": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "213": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "213": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1411
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "444": {
                    "entityPreview": "true"
                  },
                  "638": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1412
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "638": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1627
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          },
          "808": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "883": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1854
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "808": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "808": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "363": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1852
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "441": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1851
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1411
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1411
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765203,
            "pk_entity": 866597,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": false,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 212,
                "pk_entity": 765201,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_765201",
                "fk_class": 212,
                "pk_entity": 765201,
                "project_id": 0,
                "class_label": "Localisation",
                "entity_type": "teEn",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor), S. Cancian ",
                "tmsp_last_modification": "2023-10-13T12:37:16.77042+00:00"
              }
            }
          },
          "targetClass": 212,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor), S. Cancian ",
          "statement": {
            "pk_entity": 765203,
            "fk_property": 1177,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765201,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "pkProject": 591,
        "targets": {
          "212": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "212": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "212": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "441": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1881
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "363": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1178
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  },
                  "68": {
                    "entityPreview": "true"
                  },
                  "441": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1177
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "449": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1066
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "212": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 108
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "212": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 107
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "212": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 108
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "212": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 107
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1177
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "631": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "631": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "631": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1892
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "664": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1517
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "633": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1516
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "503": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1433
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1432
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1431
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1431
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765207,
            "pk_entity": 866601,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": false,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 631,
                "pk_entity": 765205,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_765205",
                "fk_class": 631,
                "pk_entity": 765205,
                "time_span": {
                  "p82": {
                    "calendar": "gregorian",
                    "duration": "1 day",
                    "julianDay": 2304379
                  }
                },
                "project_id": 0,
                "class_label": "Pre-matrimonial enquiry",
                "entity_type": "teEn",
                "last_second": "199098431999",
                "entity_label": "Vito Sainngh (da Bamberga, sartor)",
                "first_second": "199098345600",
                "tmsp_last_modification": "2023-10-13T12:37:12.418701+00:00"
              }
            }
          },
          "targetClass": 631,
          "targetLabel": "Vito Sainngh (da Bamberga, sartor)",
          "statement": {
            "pk_entity": 765207,
            "fk_property": 1432,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765205,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "pkProject": 591,
        "targets": {
          "631": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "631": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "631": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1892
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "664": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1517
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "633": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1516
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "503": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1433
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1432
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1431
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1432
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "633": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "633": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "633": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1436
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "631": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1516
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "61": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1435
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1436
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765225,
            "pk_entity": 866618,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": false,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 334,
                "pk_entity": 765221,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_765221",
                "fk_type": 739576,
                "fk_class": 334,
                "pk_entity": 765221,
                "project_id": 0,
                "type_label": "Origine comune",
                "class_label": "Social Relationship",
                "entity_type": "teEn",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor), Vito Sainngh (da Bamberga, sartor), Adamo di Melch",
                "tmsp_last_modification": "2023-10-13T12:37:12.716621+00:00"
              }
            }
          },
          "targetClass": 334,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor), Vito Sainngh (da Bamberga, sartor), Adamo di Melch",
          "statement": {
            "pk_entity": 765225,
            "fk_property": 1409,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765221,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "pkProject": 591,
        "targets": {
          "334": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "632": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1434
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "334": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "334": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1445
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1446
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1409
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1409
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765250,
            "pk_entity": 866640,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": false,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 637,
                "pk_entity": 765248,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_765248",
                "fk_class": 637,
                "pk_entity": 765248,
                "project_id": 0,
                "class_label": "Occupation (Temporal entity)",
                "entity_type": "teEn",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor), sartor",
                "tmsp_last_modification": "2023-10-13T12:37:14.438137+00:00"
              }
            }
          },
          "targetClass": 637,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor), sartor",
          "statement": {
            "pk_entity": 765250,
            "fk_property": 1441,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765248,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "pkProject": 591,
        "targets": {
          "637": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "637": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "637": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1441
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "636": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1442
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "363": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1443
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  },
                  "68": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1444
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1441
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765263,
            "pk_entity": 866652,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": false,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 61,
                "pk_entity": 765262,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_765262",
                "fk_class": 61,
                "pk_entity": 765262,
                "time_span": {
                  "p82": {
                    "calendar": "julian",
                    "duration": "1 year",
                    "julianDay": 2294136
                  }
                },
                "project_id": 0,
                "class_label": "Birth",
                "entity_type": "teEn",
                "last_second": "198244886399",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "first_second": "198213350400",
                "tmsp_last_modification": "2023-10-13T12:37:14.438137+00:00"
              }
            }
          },
          "targetClass": 61,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765263,
            "fk_property": 86,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765262,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "pkProject": 591,
        "targets": {
          "61": {
            "nestedResource": [
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "61": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "61": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 86
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "363": {
                    "entityPreview": "true"
                  },
                  "441": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 7
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "633": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1435
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 86
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "63": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "63": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "63": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "363": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1599
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 88
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "363": {
                    "entityPreview": "true"
                  },
                  "441": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 7
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 88
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "78": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "78": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "78": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "442": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1040
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "68": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 132
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  },
                  "68": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 131
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 131
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "79": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "79": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "79": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "442": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1041
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "68": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 134
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  },
                  "68": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 133
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 133
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "442": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "608": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1413
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "442": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "442": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "444": {
                    "entityPreview": "true"
                  },
                  "698": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 2270
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "68": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1189
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1188
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "79": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1041
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "78": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1040
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1188
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "637": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "637": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "637": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1441
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "636": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1442
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "363": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1443
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  },
                  "68": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1444
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1444
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "631": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "631": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "631": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1892
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "664": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1517
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "633": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1516
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "503": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1433
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1432
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1431
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1892
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "867": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1837
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "702": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "634": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1437
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "702": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "702": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1784
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "363": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1599
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1784
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "691": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1617
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "334": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "632": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1434
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "334": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "334": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1445
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1446
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1409
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1446
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765223,
            "pk_entity": 866616,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": false,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 334,
                "pk_entity": 765221,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_765221",
                "fk_type": 739576,
                "fk_class": 334,
                "pk_entity": 765221,
                "project_id": 0,
                "type_label": "Origine comune",
                "class_label": "Social Relationship",
                "entity_type": "teEn",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor), Vito Sainngh (da Bamberga, sartor), Adamo di Melch",
                "tmsp_last_modification": "2023-10-13T12:37:12.716621+00:00"
              }
            }
          },
          "targetClass": 334,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor), Vito Sainngh (da Bamberga, sartor), Adamo di Melch",
          "statement": {
            "pk_entity": 765223,
            "fk_property": 1445,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765221,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "pkProject": 591,
        "targets": {
          "334": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "632": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1434
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "334": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "334": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1445
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1446
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1409
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1445
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "340": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "340": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "340": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1414
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1414
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "535": {
            "nestedResource": [
              {
                "targets": {
                  "365": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1111
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "899": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1762
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "535": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "535": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "444": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1346
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "21": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1344
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  },
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  },
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1889
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 72
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 152
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 150
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 151
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 153
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "335": {
                    "timePrimitive": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 71
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1344
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "935": {
            "nestedResource": [
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "935": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "1": {
                    "entityPreview": "true"
                  },
                  "5": {
                    "entityPreview": "true"
                  },
                  "21": {
                    "entityPreview": "true"
                  },
                  "53": {
                    "entityPreview": "true"
                  },
                  "60": {
                    "entityPreview": "true"
                  },
                  "62": {
                    "entityPreview": "true"
                  },
                  "63": {
                    "entityPreview": "true"
                  },
                  "67": {
                    "entityPreview": "true"
                  },
                  "68": {
                    "entityPreview": "true"
                  },
                  "71": {
                    "entityPreview": "true"
                  },
                  "78": {
                    "entityPreview": "true"
                  },
                  "79": {
                    "entityPreview": "true"
                  },
                  "212": {
                    "entityPreview": "true"
                  },
                  "218": {
                    "entityPreview": "true"
                  },
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "234": {
                    "entityPreview": "true"
                  },
                  "244": {
                    "entityPreview": "true"
                  },
                  "332": {
                    "entityPreview": "true"
                  },
                  "334": {
                    "entityPreview": "true"
                  },
                  "340": {
                    "entityPreview": "true"
                  },
                  "363": {
                    "entityPreview": "true"
                  },
                  "364": {
                    "entityPreview": "true"
                  },
                  "365": {
                    "entityPreview": "true"
                  },
                  "441": {
                    "entityPreview": "true"
                  },
                  "442": {
                    "entityPreview": "true"
                  },
                  "443": {
                    "entityPreview": "true"
                  },
                  "444": {
                    "entityPreview": "true"
                  },
                  "445": {
                    "entityPreview": "true"
                  },
                  "449": {
                    "entityPreview": "true"
                  },
                  "450": {
                    "entityPreview": "true"
                  },
                  "451": {
                    "entityPreview": "true"
                  },
                  "452": {
                    "entityPreview": "true"
                  },
                  "454": {
                    "entityPreview": "true"
                  },
                  "455": {
                    "entityPreview": "true"
                  },
                  "459": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  },
                  "503": {
                    "entityPreview": "true"
                  },
                  "516": {
                    "entityPreview": "true"
                  },
                  "518": {
                    "entityPreview": "true"
                  },
                  "519": {
                    "entityPreview": "true"
                  },
                  "520": {
                    "entityPreview": "true"
                  },
                  "535": {
                    "entityPreview": "true"
                  },
                  "607": {
                    "entityPreview": "true"
                  },
                  "608": {
                    "entityPreview": "true"
                  },
                  "629": {
                    "entityPreview": "true"
                  },
                  "630": {
                    "entityPreview": "true"
                  },
                  "631": {
                    "entityPreview": "true"
                  },
                  "632": {
                    "entityPreview": "true"
                  },
                  "633": {
                    "entityPreview": "true"
                  },
                  "634": {
                    "entityPreview": "true"
                  },
                  "635": {
                    "entityPreview": "true"
                  },
                  "638": {
                    "entityPreview": "true"
                  },
                  "664": {
                    "entityPreview": "true"
                  },
                  "690": {
                    "entityPreview": "true"
                  },
                  "691": {
                    "entityPreview": "true"
                  },
                  "694": {
                    "entityPreview": "true"
                  },
                  "695": {
                    "entityPreview": "true"
                  },
                  "698": {
                    "entityPreview": "true"
                  },
                  "702": {
                    "entityPreview": "true"
                  },
                  "708": {
                    "entityPreview": "true"
                  },
                  "718": {
                    "entityPreview": "true"
                  },
                  "808": {
                    "entityPreview": "true"
                  },
                  "827": {
                    "entityPreview": "true"
                  },
                  "838": {
                    "entityPreview": "true"
                  },
                  "839": {
                    "entityPreview": "true"
                  },
                  "867": {
                    "entityPreview": "true"
                  },
                  "868": {
                    "entityPreview": "true"
                  },
                  "869": {
                    "entityPreview": "true"
                  },
                  "871": {
                    "entityPreview": "true"
                  },
                  "872": {
                    "entityPreview": "true"
                  },
                  "873": {
                    "entityPreview": "true"
                  },
                  "874": {
                    "entityPreview": "true"
                  },
                  "883": {
                    "entityPreview": "true"
                  },
                  "903": {
                    "entityPreview": "true"
                  },
                  "904": {
                    "entityPreview": "true"
                  },
                  "969": {
                    "entityPreview": "true"
                  },
                  "1076": {
                    "entityPreview": "true"
                  },
                  "1150": {
                    "entityPreview": "true"
                  },
                  "1210": {
                    "entityPreview": "true"
                  },
                  "1295": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "234": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  },
                  "503": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1877
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "657": {
                    "langString": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1878
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          },
          "968": {
            "nestedResource": [
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "968": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "1": {
                    "entityPreview": "true"
                  },
                  "5": {
                    "entityPreview": "true"
                  },
                  "21": {
                    "entityPreview": "true"
                  },
                  "53": {
                    "entityPreview": "true"
                  },
                  "60": {
                    "entityPreview": "true"
                  },
                  "62": {
                    "entityPreview": "true"
                  },
                  "63": {
                    "entityPreview": "true"
                  },
                  "67": {
                    "entityPreview": "true"
                  },
                  "68": {
                    "entityPreview": "true"
                  },
                  "71": {
                    "entityPreview": "true"
                  },
                  "78": {
                    "entityPreview": "true"
                  },
                  "79": {
                    "entityPreview": "true"
                  },
                  "212": {
                    "entityPreview": "true"
                  },
                  "218": {
                    "entityPreview": "true"
                  },
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "234": {
                    "entityPreview": "true"
                  },
                  "244": {
                    "entityPreview": "true"
                  },
                  "332": {
                    "entityPreview": "true"
                  },
                  "334": {
                    "entityPreview": "true"
                  },
                  "340": {
                    "entityPreview": "true"
                  },
                  "363": {
                    "entityPreview": "true"
                  },
                  "364": {
                    "entityPreview": "true"
                  },
                  "365": {
                    "entityPreview": "true"
                  },
                  "441": {
                    "entityPreview": "true"
                  },
                  "442": {
                    "entityPreview": "true"
                  },
                  "443": {
                    "entityPreview": "true"
                  },
                  "444": {
                    "entityPreview": "true"
                  },
                  "445": {
                    "entityPreview": "true"
                  },
                  "449": {
                    "entityPreview": "true"
                  },
                  "450": {
                    "entityPreview": "true"
                  },
                  "451": {
                    "entityPreview": "true"
                  },
                  "452": {
                    "entityPreview": "true"
                  },
                  "454": {
                    "entityPreview": "true"
                  },
                  "455": {
                    "entityPreview": "true"
                  },
                  "459": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  },
                  "503": {
                    "entityPreview": "true"
                  },
                  "516": {
                    "entityPreview": "true"
                  },
                  "518": {
                    "entityPreview": "true"
                  },
                  "519": {
                    "entityPreview": "true"
                  },
                  "520": {
                    "entityPreview": "true"
                  },
                  "535": {
                    "entityPreview": "true"
                  },
                  "607": {
                    "entityPreview": "true"
                  },
                  "608": {
                    "entityPreview": "true"
                  },
                  "629": {
                    "entityPreview": "true"
                  },
                  "630": {
                    "entityPreview": "true"
                  },
                  "631": {
                    "entityPreview": "true"
                  },
                  "632": {
                    "entityPreview": "true"
                  },
                  "633": {
                    "entityPreview": "true"
                  },
                  "634": {
                    "entityPreview": "true"
                  },
                  "635": {
                    "entityPreview": "true"
                  },
                  "638": {
                    "entityPreview": "true"
                  },
                  "664": {
                    "entityPreview": "true"
                  },
                  "690": {
                    "entityPreview": "true"
                  },
                  "691": {
                    "entityPreview": "true"
                  },
                  "694": {
                    "entityPreview": "true"
                  },
                  "695": {
                    "entityPreview": "true"
                  },
                  "698": {
                    "entityPreview": "true"
                  },
                  "702": {
                    "entityPreview": "true"
                  },
                  "708": {
                    "entityPreview": "true"
                  },
                  "718": {
                    "entityPreview": "true"
                  },
                  "808": {
                    "entityPreview": "true"
                  },
                  "827": {
                    "entityPreview": "true"
                  },
                  "838": {
                    "entityPreview": "true"
                  },
                  "839": {
                    "entityPreview": "true"
                  },
                  "867": {
                    "entityPreview": "true"
                  },
                  "868": {
                    "entityPreview": "true"
                  },
                  "869": {
                    "entityPreview": "true"
                  },
                  "871": {
                    "entityPreview": "true"
                  },
                  "872": {
                    "entityPreview": "true"
                  },
                  "873": {
                    "entityPreview": "true"
                  },
                  "874": {
                    "entityPreview": "true"
                  },
                  "883": {
                    "entityPreview": "true"
                  },
                  "903": {
                    "entityPreview": "true"
                  },
                  "904": {
                    "entityPreview": "true"
                  },
                  "969": {
                    "entityPreview": "true"
                  },
                  "1076": {
                    "entityPreview": "true"
                  },
                  "1150": {
                    "entityPreview": "true"
                  },
                  "1210": {
                    "entityPreview": "true"
                  },
                  "1295": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1876
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "898": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1877
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "521": {
                    "cell": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1878
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1876
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 878758,
            "pk_entity": 931669,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161
          },
          "isOutgoing": false,
          "targetLabel": "",
          "target": {
            "entity": {
              "resource": {
                "fk_class": 933,
                "pk_entity": 868306,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": false,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_868306",
                "fk_class": 933,
                "pk_entity": 868306,
                "project_id": 591,
                "class_label": "Annotation in Text",
                "entity_type": "peIt",
                "tmsp_last_modification": "2023-10-13T12:37:49.930993+00:00"
              }
            }
          },
          "targetClass": 933,
          "statement": {
            "pk_entity": 878758,
            "fk_property": 1875,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 868306,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "pkProject": 591,
        "targets": {
          "933": {
            "nestedResource": [
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "933": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "1": {
                    "entityPreview": "true"
                  },
                  "5": {
                    "entityPreview": "true"
                  },
                  "21": {
                    "entityPreview": "true"
                  },
                  "53": {
                    "entityPreview": "true"
                  },
                  "60": {
                    "entityPreview": "true"
                  },
                  "62": {
                    "entityPreview": "true"
                  },
                  "63": {
                    "entityPreview": "true"
                  },
                  "67": {
                    "entityPreview": "true"
                  },
                  "68": {
                    "entityPreview": "true"
                  },
                  "71": {
                    "entityPreview": "true"
                  },
                  "78": {
                    "entityPreview": "true"
                  },
                  "79": {
                    "entityPreview": "true"
                  },
                  "212": {
                    "entityPreview": "true"
                  },
                  "218": {
                    "entityPreview": "true"
                  },
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "234": {
                    "entityPreview": "true"
                  },
                  "244": {
                    "entityPreview": "true"
                  },
                  "332": {
                    "entityPreview": "true"
                  },
                  "334": {
                    "entityPreview": "true"
                  },
                  "340": {
                    "entityPreview": "true"
                  },
                  "363": {
                    "entityPreview": "true"
                  },
                  "364": {
                    "entityPreview": "true"
                  },
                  "365": {
                    "entityPreview": "true"
                  },
                  "441": {
                    "entityPreview": "true"
                  },
                  "442": {
                    "entityPreview": "true"
                  },
                  "443": {
                    "entityPreview": "true"
                  },
                  "444": {
                    "entityPreview": "true"
                  },
                  "445": {
                    "entityPreview": "true"
                  },
                  "449": {
                    "entityPreview": "true"
                  },
                  "450": {
                    "entityPreview": "true"
                  },
                  "451": {
                    "entityPreview": "true"
                  },
                  "452": {
                    "entityPreview": "true"
                  },
                  "454": {
                    "entityPreview": "true"
                  },
                  "455": {
                    "entityPreview": "true"
                  },
                  "459": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  },
                  "503": {
                    "entityPreview": "true"
                  },
                  "516": {
                    "entityPreview": "true"
                  },
                  "518": {
                    "entityPreview": "true"
                  },
                  "519": {
                    "entityPreview": "true"
                  },
                  "520": {
                    "entityPreview": "true"
                  },
                  "535": {
                    "entityPreview": "true"
                  },
                  "607": {
                    "entityPreview": "true"
                  },
                  "608": {
                    "entityPreview": "true"
                  },
                  "629": {
                    "entityPreview": "true"
                  },
                  "630": {
                    "entityPreview": "true"
                  },
                  "631": {
                    "entityPreview": "true"
                  },
                  "632": {
                    "entityPreview": "true"
                  },
                  "633": {
                    "entityPreview": "true"
                  },
                  "634": {
                    "entityPreview": "true"
                  },
                  "635": {
                    "entityPreview": "true"
                  },
                  "638": {
                    "entityPreview": "true"
                  },
                  "664": {
                    "entityPreview": "true"
                  },
                  "690": {
                    "entityPreview": "true"
                  },
                  "691": {
                    "entityPreview": "true"
                  },
                  "694": {
                    "entityPreview": "true"
                  },
                  "695": {
                    "entityPreview": "true"
                  },
                  "698": {
                    "entityPreview": "true"
                  },
                  "702": {
                    "entityPreview": "true"
                  },
                  "708": {
                    "entityPreview": "true"
                  },
                  "718": {
                    "entityPreview": "true"
                  },
                  "808": {
                    "entityPreview": "true"
                  },
                  "827": {
                    "entityPreview": "true"
                  },
                  "838": {
                    "entityPreview": "true"
                  },
                  "839": {
                    "entityPreview": "true"
                  },
                  "867": {
                    "entityPreview": "true"
                  },
                  "868": {
                    "entityPreview": "true"
                  },
                  "869": {
                    "entityPreview": "true"
                  },
                  "871": {
                    "entityPreview": "true"
                  },
                  "872": {
                    "entityPreview": "true"
                  },
                  "873": {
                    "entityPreview": "true"
                  },
                  "874": {
                    "entityPreview": "true"
                  },
                  "883": {
                    "entityPreview": "true"
                  },
                  "903": {
                    "entityPreview": "true"
                  },
                  "904": {
                    "entityPreview": "true"
                  },
                  "969": {
                    "entityPreview": "true"
                  },
                  "1076": {
                    "entityPreview": "true"
                  },
                  "1150": {
                    "entityPreview": "true"
                  },
                  "1210": {
                    "entityPreview": "true"
                  },
                  "1295": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "456": {
                    "appellation": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1874
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "785": {
                    "entityPreview": "true"
                  },
                  "899": {
                    "entityPreview": "true"
                  },
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1872
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          },
          "934": {
            "nestedResource": [
              {
                "targets": {
                  "900": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1763
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "635": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1440
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "967": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1943
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "41": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1842
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "934": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1499
                  },
                  "isOutgoing": false,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "1": {
                    "entityPreview": "true"
                  },
                  "5": {
                    "entityPreview": "true"
                  },
                  "21": {
                    "entityPreview": "true"
                  },
                  "53": {
                    "entityPreview": "true"
                  },
                  "60": {
                    "entityPreview": "true"
                  },
                  "62": {
                    "entityPreview": "true"
                  },
                  "63": {
                    "entityPreview": "true"
                  },
                  "67": {
                    "entityPreview": "true"
                  },
                  "68": {
                    "entityPreview": "true"
                  },
                  "71": {
                    "entityPreview": "true"
                  },
                  "78": {
                    "entityPreview": "true"
                  },
                  "79": {
                    "entityPreview": "true"
                  },
                  "212": {
                    "entityPreview": "true"
                  },
                  "218": {
                    "entityPreview": "true"
                  },
                  "219": {
                    "entityPreview": "true"
                  },
                  "220": {
                    "entityPreview": "true"
                  },
                  "221": {
                    "entityPreview": "true"
                  },
                  "234": {
                    "entityPreview": "true"
                  },
                  "244": {
                    "entityPreview": "true"
                  },
                  "332": {
                    "entityPreview": "true"
                  },
                  "334": {
                    "entityPreview": "true"
                  },
                  "340": {
                    "entityPreview": "true"
                  },
                  "363": {
                    "entityPreview": "true"
                  },
                  "364": {
                    "entityPreview": "true"
                  },
                  "365": {
                    "entityPreview": "true"
                  },
                  "441": {
                    "entityPreview": "true"
                  },
                  "442": {
                    "entityPreview": "true"
                  },
                  "443": {
                    "entityPreview": "true"
                  },
                  "444": {
                    "entityPreview": "true"
                  },
                  "445": {
                    "entityPreview": "true"
                  },
                  "449": {
                    "entityPreview": "true"
                  },
                  "450": {
                    "entityPreview": "true"
                  },
                  "451": {
                    "entityPreview": "true"
                  },
                  "452": {
                    "entityPreview": "true"
                  },
                  "454": {
                    "entityPreview": "true"
                  },
                  "455": {
                    "entityPreview": "true"
                  },
                  "459": {
                    "entityPreview": "true"
                  },
                  "502": {
                    "entityPreview": "true"
                  },
                  "503": {
                    "entityPreview": "true"
                  },
                  "516": {
                    "entityPreview": "true"
                  },
                  "518": {
                    "entityPreview": "true"
                  },
                  "519": {
                    "entityPreview": "true"
                  },
                  "520": {
                    "entityPreview": "true"
                  },
                  "535": {
                    "entityPreview": "true"
                  },
                  "607": {
                    "entityPreview": "true"
                  },
                  "608": {
                    "entityPreview": "true"
                  },
                  "629": {
                    "entityPreview": "true"
                  },
                  "630": {
                    "entityPreview": "true"
                  },
                  "631": {
                    "entityPreview": "true"
                  },
                  "632": {
                    "entityPreview": "true"
                  },
                  "633": {
                    "entityPreview": "true"
                  },
                  "634": {
                    "entityPreview": "true"
                  },
                  "635": {
                    "entityPreview": "true"
                  },
                  "638": {
                    "entityPreview": "true"
                  },
                  "664": {
                    "entityPreview": "true"
                  },
                  "690": {
                    "entityPreview": "true"
                  },
                  "691": {
                    "entityPreview": "true"
                  },
                  "694": {
                    "entityPreview": "true"
                  },
                  "695": {
                    "entityPreview": "true"
                  },
                  "698": {
                    "entityPreview": "true"
                  },
                  "702": {
                    "entityPreview": "true"
                  },
                  "708": {
                    "entityPreview": "true"
                  },
                  "718": {
                    "entityPreview": "true"
                  },
                  "808": {
                    "entityPreview": "true"
                  },
                  "827": {
                    "entityPreview": "true"
                  },
                  "838": {
                    "entityPreview": "true"
                  },
                  "839": {
                    "entityPreview": "true"
                  },
                  "867": {
                    "entityPreview": "true"
                  },
                  "868": {
                    "entityPreview": "true"
                  },
                  "869": {
                    "entityPreview": "true"
                  },
                  "871": {
                    "entityPreview": "true"
                  },
                  "872": {
                    "entityPreview": "true"
                  },
                  "873": {
                    "entityPreview": "true"
                  },
                  "874": {
                    "entityPreview": "true"
                  },
                  "883": {
                    "entityPreview": "true"
                  },
                  "903": {
                    "entityPreview": "true"
                  },
                  "904": {
                    "entityPreview": "true"
                  },
                  "969": {
                    "entityPreview": "true"
                  },
                  "1076": {
                    "entityPreview": "true"
                  },
                  "1150": {
                    "entityPreview": "true"
                  },
                  "1210": {
                    "entityPreview": "true"
                  },
                  "1295": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1875
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": true
                }
              },
              {
                "targets": {
                  "521": {
                    "cell": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1874
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              },
              {
                "targets": {
                  "898": {
                    "entityPreview": "true"
                  }
                },
                "page": {
                  "property": {
                    "fkProperty": 1872
                  },
                  "isOutgoing": true,
                  "limit": 1,
                  "offset": 0,
                  "isCircular": false
                }
              }
            ]
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1875
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.001Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1889
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": false,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.034Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "899": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1762
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": true,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.034Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "900": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1763
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": true,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.034Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "635": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1440
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": true,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.034Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "967": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1943
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": true,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.034Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "41": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1842
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": true,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.034Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "pkProject": 591,
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1499
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": true,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.034Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765200,
            "pk_entity": 866594,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 629,
                "pk_entity": 739340,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_739340",
                "fk_class": 629,
                "pk_entity": 739340,
                "project_id": 0,
                "class_label": "Gender",
                "entity_type": "peIt",
                "entity_label": "Maschile",
                "tmsp_last_modification": "2023-10-13T12:37:16.437234+00:00"
              }
            }
          },
          "targetClass": 629,
          "targetLabel": "Maschile",
          "statement": {
            "pk_entity": 765200,
            "fk_property": 1429,
            "fk_object_data": 0,
            "fk_object_info": 739340,
            "fk_subject_data": 0,
            "fk_subject_info": 765182,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "pkProject": 591,
        "targets": {
          "629": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1429
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": true,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.034Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765212,
            "pk_entity": 866606,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 363,
                "pk_entity": 205466,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_205466",
                "fk_class": 363,
                "pk_entity": 205466,
                "project_id": 591,
                "class_label": "Geographical Place",
                "entity_type": "peIt",
                "entity_label": "Bamberg DE",
                "tmsp_last_modification": "2023-10-13T12:37:54.825547+00:00"
              }
            }
          },
          "targetClass": 363,
          "targetLabel": "Bamberg DE",
          "statement": {
            "pk_entity": 765212,
            "fk_property": 1439,
            "fk_object_data": 0,
            "fk_object_info": 205466,
            "fk_subject_data": 0,
            "fk_subject_info": 765182,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "pkProject": 591,
        "targets": {
          "363": {
            "entityPreview": "true"
          }
        },
        "page": {
          "source": {
            "fkInfo": 765182
          },
          "property": {
            "fkProperty": 1439
          },
          "limit": 5,
          "offset": 0,
          "isOutgoing": true,
          "scope": {
            "inProject": 591
          }
        }
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1111
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1876
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "935": {
            "entityPreview": "true"
          },
          "968": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1875
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "933": {
            "entityPreview": "true"
          },
          "934": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1889
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1111
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1876
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "935": {
            "entityPreview": "true"
          },
          "968": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1875
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "933": {
            "entityPreview": "true"
          },
          "934": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1889
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1111
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1876
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "935": {
            "entityPreview": "true"
          },
          "968": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1875
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "933": {
            "entityPreview": "true"
          },
          "934": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1889
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1111
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "212": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 108
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "212": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 107
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "212": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1876
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "935": {
            "entityPreview": "true"
          },
          "968": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1875
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "933": {
            "entityPreview": "true"
          },
          "934": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1889
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1111
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "631": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1876
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "935": {
            "entityPreview": "true"
          },
          "968": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1875
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "933": {
            "entityPreview": "true"
          },
          "934": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1889
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1111
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "334": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1876
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "935": {
            "entityPreview": "true"
          },
          "968": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 878754,
            "pk_entity": 931682,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161
          },
          "isOutgoing": false,
          "targetLabel": "",
          "target": {
            "entity": {
              "resource": {
                "fk_class": 933,
                "pk_entity": 868302,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": false,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_868302",
                "fk_class": 933,
                "pk_entity": 868302,
                "project_id": 591,
                "class_label": "Annotation in Text",
                "entity_type": "peIt",
                "tmsp_last_modification": "2023-10-13T12:37:56.372143+00:00"
              }
            }
          },
          "targetClass": 933,
          "statement": {
            "pk_entity": 878754,
            "fk_property": 1875,
            "fk_object_data": 0,
            "fk_object_info": 765221,
            "fk_subject_data": 0,
            "fk_subject_info": 868302,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1875
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "933": {
            "entityPreview": "true"
          },
          "934": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1889
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1111
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "637": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "61": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1111
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "334": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1876
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "935": {
            "entityPreview": "true"
          },
          "968": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 878754,
            "pk_entity": 931682,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161
          },
          "isOutgoing": false,
          "targetLabel": "",
          "target": {
            "entity": {
              "resource": {
                "fk_class": 933,
                "pk_entity": 868302,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": false,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_868302",
                "fk_class": 933,
                "pk_entity": 868302,
                "project_id": 591,
                "class_label": "Annotation in Text",
                "entity_type": "peIt",
                "tmsp_last_modification": "2023-10-13T12:37:56.372143+00:00"
              }
            }
          },
          "targetClass": 933,
          "statement": {
            "pk_entity": 878754,
            "fk_property": 1875,
            "fk_object_data": 0,
            "fk_object_info": 765221,
            "fk_subject_data": 0,
            "fk_subject_info": 868302,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1875
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "933": {
            "entityPreview": "true"
          },
          "934": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1889
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.045Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": false,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 868306
          }
        },
        "targets": {
          "933": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1762
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "899": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765185,
            "pk_entity": 866580,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 630,
                "pk_entity": 739297,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_739297",
                "fk_class": 630,
                "pk_entity": 739297,
                "project_id": 0,
                "class_label": "Naming type",
                "entity_type": "peIt",
                "entity_label": "Nome completo",
                "tmsp_last_modification": "2023-10-13T12:37:25.151812+00:00"
              }
            }
          },
          "targetClass": 630,
          "targetLabel": "Nome completo",
          "statement": {
            "pk_entity": 765185,
            "fk_property": 1430,
            "fk_object_data": 0,
            "fk_object_info": 739297,
            "fk_subject_data": 0,
            "fk_subject_info": 765184,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1430
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "630": {
            "entityPreview": "true"
          },
          "874": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1763
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "900": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1440
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "635": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1943
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "967": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1842
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "41": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765188,
            "pk_entity": 866583,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "ord_num_of_domain": 1,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765188,
            "fk_property": 1111,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765184,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1111
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": true,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "1": {
            "entityPreview": "true"
          },
          "5": {
            "entityPreview": "true"
          },
          "21": {
            "entityPreview": "true"
          },
          "53": {
            "entityPreview": "true"
          },
          "60": {
            "entityPreview": "true"
          },
          "61": {
            "entityPreview": "true"
          },
          "62": {
            "entityPreview": "true"
          },
          "63": {
            "entityPreview": "true"
          },
          "67": {
            "entityPreview": "true"
          },
          "68": {
            "entityPreview": "true"
          },
          "71": {
            "entityPreview": "true"
          },
          "78": {
            "entityPreview": "true"
          },
          "79": {
            "entityPreview": "true"
          },
          "212": {
            "entityPreview": "true"
          },
          "213": {
            "entityPreview": "true"
          },
          "218": {
            "entityPreview": "true"
          },
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "234": {
            "entityPreview": "true"
          },
          "244": {
            "entityPreview": "true"
          },
          "332": {
            "entityPreview": "true"
          },
          "334": {
            "entityPreview": "true"
          },
          "340": {
            "entityPreview": "true"
          },
          "363": {
            "entityPreview": "true"
          },
          "364": {
            "entityPreview": "true"
          },
          "365": {
            "entityPreview": "true"
          },
          "441": {
            "entityPreview": "true"
          },
          "442": {
            "entityPreview": "true"
          },
          "443": {
            "entityPreview": "true"
          },
          "444": {
            "entityPreview": "true"
          },
          "445": {
            "entityPreview": "true"
          },
          "449": {
            "entityPreview": "true"
          },
          "450": {
            "entityPreview": "true"
          },
          "451": {
            "entityPreview": "true"
          },
          "452": {
            "entityPreview": "true"
          },
          "454": {
            "entityPreview": "true"
          },
          "455": {
            "entityPreview": "true"
          },
          "456": {
            "appellation": "true"
          },
          "457": {
            "entityPreview": "true"
          },
          "459": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          },
          "503": {
            "entityPreview": "true"
          },
          "516": {
            "entityPreview": "true"
          },
          "518": {
            "entityPreview": "true"
          },
          "519": {
            "entityPreview": "true"
          },
          "520": {
            "entityPreview": "true"
          },
          "521": {
            "cell": "true"
          },
          "535": {
            "entityPreview": "true"
          },
          "607": {
            "entityPreview": "true"
          },
          "608": {
            "entityPreview": "true"
          },
          "629": {
            "entityPreview": "true"
          },
          "630": {
            "entityPreview": "true"
          },
          "631": {
            "entityPreview": "true"
          },
          "632": {
            "entityPreview": "true"
          },
          "633": {
            "entityPreview": "true"
          },
          "634": {
            "entityPreview": "true"
          },
          "635": {
            "entityPreview": "true"
          },
          "636": {
            "entityPreview": "true"
          },
          "637": {
            "entityPreview": "true"
          },
          "638": {
            "entityPreview": "true"
          },
          "664": {
            "entityPreview": "true"
          },
          "690": {
            "entityPreview": "true"
          },
          "691": {
            "entityPreview": "true"
          },
          "694": {
            "entityPreview": "true"
          },
          "695": {
            "entityPreview": "true"
          },
          "698": {
            "entityPreview": "true"
          },
          "702": {
            "entityPreview": "true"
          },
          "708": {
            "entityPreview": "true"
          },
          "718": {
            "entityPreview": "true"
          },
          "785": {
            "entityPreview": "true"
          },
          "808": {
            "entityPreview": "true"
          },
          "827": {
            "entityPreview": "true"
          },
          "838": {
            "entityPreview": "true"
          },
          "839": {
            "entityPreview": "true"
          },
          "867": {
            "entityPreview": "true"
          },
          "869": {
            "entityPreview": "true"
          },
          "871": {
            "entityPreview": "true"
          },
          "872": {
            "entityPreview": "true"
          },
          "873": {
            "entityPreview": "true"
          },
          "874": {
            "entityPreview": "true"
          },
          "883": {
            "entityPreview": "true"
          },
          "898": {
            "entityPreview": "true"
          },
          "899": {
            "entityPreview": "true"
          },
          "900": {
            "entityPreview": "true"
          },
          "903": {
            "entityPreview": "true"
          },
          "904": {
            "entityPreview": "true"
          },
          "969": {
            "entityPreview": "true"
          },
          "1076": {
            "entityPreview": "true"
          },
          "1150": {
            "entityPreview": "true"
          },
          "1210": {
            "entityPreview": "true"
          },
          "1295": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765187,
            "pk_entity": 866582,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "appellation": {
              "string": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
              "fk_class": 40,
              "pk_entity": 765183,
              "quill_doc": {
                "ops": [
                  {
                    "insert": "A",
                    "attributes": {
                      "charid": "2"
                    }
                  },
                  {
                    "insert": "d",
                    "attributes": {
                      "charid": "3"
                    }
                  },
                  {
                    "insert": "a",
                    "attributes": {
                      "charid": "4"
                    }
                  },
                  {
                    "insert": "m",
                    "attributes": {
                      "charid": "5"
                    }
                  },
                  {
                    "insert": "o",
                    "attributes": {
                      "charid": "6"
                    }
                  },
                  {
                    "insert": " ",
                    "attributes": {
                      "charid": "7"
                    }
                  },
                  {
                    "insert": "d",
                    "attributes": {
                      "charid": "8"
                    }
                  },
                  {
                    "insert": "i",
                    "attributes": {
                      "charid": "9"
                    }
                  },
                  {
                    "insert": " ",
                    "attributes": {
                      "charid": "10"
                    }
                  },
                  {
                    "insert": "M",
                    "attributes": {
                      "charid": "11"
                    }
                  },
                  {
                    "insert": "e",
                    "attributes": {
                      "charid": "12"
                    }
                  },
                  {
                    "insert": "l",
                    "attributes": {
                      "charid": "13"
                    }
                  },
                  {
                    "insert": "c",
                    "attributes": {
                      "charid": "14"
                    }
                  },
                  {
                    "insert": "h",
                    "attributes": {
                      "charid": "15"
                    }
                  },
                  {
                    "insert": "i",
                    "attributes": {
                      "charid": "16"
                    }
                  },
                  {
                    "insert": "o",
                    "attributes": {
                      "charid": "17"
                    }
                  },
                  {
                    "insert": "r",
                    "attributes": {
                      "charid": "18"
                    }
                  },
                  {
                    "insert": "r",
                    "attributes": {
                      "charid": "19"
                    }
                  },
                  {
                    "insert": "e",
                    "attributes": {
                      "charid": "20"
                    }
                  },
                  {
                    "insert": " ",
                    "attributes": {
                      "charid": "21"
                    }
                  },
                  {
                    "insert": "S",
                    "attributes": {
                      "charid": "22"
                    }
                  },
                  {
                    "insert": "t",
                    "attributes": {
                      "charid": "23"
                    }
                  },
                  {
                    "insert": "r",
                    "attributes": {
                      "charid": "24"
                    }
                  },
                  {
                    "insert": "a",
                    "attributes": {
                      "charid": "25"
                    }
                  },
                  {
                    "insert": "v",
                    "attributes": {
                      "charid": "26"
                    }
                  },
                  {
                    "insert": "e",
                    "attributes": {
                      "charid": "27"
                    }
                  },
                  {
                    "insert": "s",
                    "attributes": {
                      "charid": "28"
                    }
                  },
                  {
                    "insert": " ",
                    "attributes": {
                      "charid": "29"
                    }
                  },
                  {
                    "insert": "(",
                    "attributes": {
                      "charid": "30"
                    }
                  },
                  {
                    "insert": "d",
                    "attributes": {
                      "charid": "31"
                    }
                  },
                  {
                    "insert": "a",
                    "attributes": {
                      "charid": "32"
                    }
                  },
                  {
                    "insert": " ",
                    "attributes": {
                      "charid": "33"
                    }
                  },
                  {
                    "insert": "B",
                    "attributes": {
                      "charid": "34"
                    }
                  },
                  {
                    "insert": "a",
                    "attributes": {
                      "charid": "35"
                    }
                  },
                  {
                    "insert": "m",
                    "attributes": {
                      "charid": "36"
                    }
                  },
                  {
                    "insert": "b",
                    "attributes": {
                      "charid": "37"
                    }
                  },
                  {
                    "insert": "e",
                    "attributes": {
                      "charid": "38"
                    }
                  },
                  {
                    "insert": "r",
                    "attributes": {
                      "charid": "39"
                    }
                  },
                  {
                    "insert": "g",
                    "attributes": {
                      "charid": "40"
                    }
                  },
                  {
                    "insert": ",",
                    "attributes": {
                      "charid": "41"
                    }
                  },
                  {
                    "insert": " ",
                    "attributes": {
                      "charid": "42"
                    }
                  },
                  {
                    "insert": "s",
                    "attributes": {
                      "charid": "43"
                    }
                  },
                  {
                    "insert": "a",
                    "attributes": {
                      "charid": "44"
                    }
                  },
                  {
                    "insert": "r",
                    "attributes": {
                      "charid": "45"
                    }
                  },
                  {
                    "insert": "t",
                    "attributes": {
                      "charid": "46"
                    }
                  },
                  {
                    "insert": "o",
                    "attributes": {
                      "charid": "47"
                    }
                  },
                  {
                    "insert": "r",
                    "attributes": {
                      "charid": "48"
                    }
                  },
                  {
                    "insert": ")",
                    "attributes": {
                      "charid": "49"
                    }
                  },
                  {
                    "insert": "\n",
                    "attributes": {
                      "blockid": "1"
                    }
                  }
                ],
                "latestId": 49
              }
            }
          },
          "targetClass": 40,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765187,
            "fk_property": 1113,
            "fk_object_data": 0,
            "fk_object_info": 765183,
            "fk_subject_data": 0,
            "fk_subject_info": 765184,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1113
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "40": {
            "appellation": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765186,
            "pk_entity": 866581,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "language": {
              "notes": "Italian",
              "scope": "individual",
              "iso6391": "it ",
              "fk_class": 54,
              "iso6392b": "ita",
              "iso6392t": "ita",
              "lang_type": "living",
              "pk_entity": 19703,
              "pk_language": "ita"
            }
          },
          "targetClass": 54,
          "targetLabel": "Italian",
          "statement": {
            "pk_entity": 765186,
            "fk_property": 1112,
            "fk_object_data": 0,
            "fk_object_info": 19703,
            "fk_subject_data": 0,
            "fk_subject_info": 765184,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1112
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "54": {
            "language": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 72
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 152
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 150
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 151
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 153
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 71
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765184
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1762
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "899": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765197,
            "pk_entity": 866591,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 630,
                "pk_entity": 741575,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_741575",
                "fk_class": 630,
                "pk_entity": 741575,
                "project_id": 591,
                "class_label": "Naming type",
                "entity_type": "peIt",
                "entity_label": "Cognome",
                "tmsp_last_modification": "2023-10-13T12:37:54.697219+00:00"
              }
            }
          },
          "targetClass": 630,
          "targetLabel": "Cognome",
          "statement": {
            "pk_entity": 765197,
            "fk_property": 1430,
            "fk_object_data": 0,
            "fk_object_info": 741575,
            "fk_subject_data": 0,
            "fk_subject_info": 765195,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1430
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "630": {
            "entityPreview": "true"
          },
          "874": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1763
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "900": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1440
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "635": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1943
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "967": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1842
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "41": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765199,
            "pk_entity": 866593,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765199,
            "fk_property": 1111,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765195,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1111
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": true,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "1": {
            "entityPreview": "true"
          },
          "5": {
            "entityPreview": "true"
          },
          "21": {
            "entityPreview": "true"
          },
          "53": {
            "entityPreview": "true"
          },
          "60": {
            "entityPreview": "true"
          },
          "61": {
            "entityPreview": "true"
          },
          "62": {
            "entityPreview": "true"
          },
          "63": {
            "entityPreview": "true"
          },
          "67": {
            "entityPreview": "true"
          },
          "68": {
            "entityPreview": "true"
          },
          "71": {
            "entityPreview": "true"
          },
          "78": {
            "entityPreview": "true"
          },
          "79": {
            "entityPreview": "true"
          },
          "212": {
            "entityPreview": "true"
          },
          "213": {
            "entityPreview": "true"
          },
          "218": {
            "entityPreview": "true"
          },
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "234": {
            "entityPreview": "true"
          },
          "244": {
            "entityPreview": "true"
          },
          "332": {
            "entityPreview": "true"
          },
          "334": {
            "entityPreview": "true"
          },
          "340": {
            "entityPreview": "true"
          },
          "363": {
            "entityPreview": "true"
          },
          "364": {
            "entityPreview": "true"
          },
          "365": {
            "entityPreview": "true"
          },
          "441": {
            "entityPreview": "true"
          },
          "442": {
            "entityPreview": "true"
          },
          "443": {
            "entityPreview": "true"
          },
          "444": {
            "entityPreview": "true"
          },
          "445": {
            "entityPreview": "true"
          },
          "449": {
            "entityPreview": "true"
          },
          "450": {
            "entityPreview": "true"
          },
          "451": {
            "entityPreview": "true"
          },
          "452": {
            "entityPreview": "true"
          },
          "454": {
            "entityPreview": "true"
          },
          "455": {
            "entityPreview": "true"
          },
          "456": {
            "appellation": "true"
          },
          "457": {
            "entityPreview": "true"
          },
          "459": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          },
          "503": {
            "entityPreview": "true"
          },
          "516": {
            "entityPreview": "true"
          },
          "518": {
            "entityPreview": "true"
          },
          "519": {
            "entityPreview": "true"
          },
          "520": {
            "entityPreview": "true"
          },
          "521": {
            "cell": "true"
          },
          "535": {
            "entityPreview": "true"
          },
          "607": {
            "entityPreview": "true"
          },
          "608": {
            "entityPreview": "true"
          },
          "629": {
            "entityPreview": "true"
          },
          "630": {
            "entityPreview": "true"
          },
          "631": {
            "entityPreview": "true"
          },
          "632": {
            "entityPreview": "true"
          },
          "633": {
            "entityPreview": "true"
          },
          "634": {
            "entityPreview": "true"
          },
          "635": {
            "entityPreview": "true"
          },
          "636": {
            "entityPreview": "true"
          },
          "637": {
            "entityPreview": "true"
          },
          "638": {
            "entityPreview": "true"
          },
          "664": {
            "entityPreview": "true"
          },
          "690": {
            "entityPreview": "true"
          },
          "691": {
            "entityPreview": "true"
          },
          "694": {
            "entityPreview": "true"
          },
          "695": {
            "entityPreview": "true"
          },
          "698": {
            "entityPreview": "true"
          },
          "702": {
            "entityPreview": "true"
          },
          "708": {
            "entityPreview": "true"
          },
          "718": {
            "entityPreview": "true"
          },
          "785": {
            "entityPreview": "true"
          },
          "808": {
            "entityPreview": "true"
          },
          "827": {
            "entityPreview": "true"
          },
          "838": {
            "entityPreview": "true"
          },
          "839": {
            "entityPreview": "true"
          },
          "867": {
            "entityPreview": "true"
          },
          "869": {
            "entityPreview": "true"
          },
          "871": {
            "entityPreview": "true"
          },
          "872": {
            "entityPreview": "true"
          },
          "873": {
            "entityPreview": "true"
          },
          "874": {
            "entityPreview": "true"
          },
          "883": {
            "entityPreview": "true"
          },
          "898": {
            "entityPreview": "true"
          },
          "899": {
            "entityPreview": "true"
          },
          "900": {
            "entityPreview": "true"
          },
          "903": {
            "entityPreview": "true"
          },
          "904": {
            "entityPreview": "true"
          },
          "969": {
            "entityPreview": "true"
          },
          "1076": {
            "entityPreview": "true"
          },
          "1150": {
            "entityPreview": "true"
          },
          "1210": {
            "entityPreview": "true"
          },
          "1295": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765198,
            "pk_entity": 866592,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "appellation": {
              "string": "Straves",
              "fk_class": 40,
              "pk_entity": 765194,
              "quill_doc": {
                "ops": [
                  {
                    "insert": "S",
                    "attributes": {
                      "charid": "2"
                    }
                  },
                  {
                    "insert": "t",
                    "attributes": {
                      "charid": "3"
                    }
                  },
                  {
                    "insert": "r",
                    "attributes": {
                      "charid": "4"
                    }
                  },
                  {
                    "insert": "a",
                    "attributes": {
                      "charid": "5"
                    }
                  },
                  {
                    "insert": "v",
                    "attributes": {
                      "charid": "6"
                    }
                  },
                  {
                    "insert": "e",
                    "attributes": {
                      "charid": "7"
                    }
                  },
                  {
                    "insert": "s",
                    "attributes": {
                      "charid": "8"
                    }
                  },
                  {
                    "insert": "\n",
                    "attributes": {
                      "blockid": "1"
                    }
                  }
                ],
                "latestId": 8
              }
            }
          },
          "targetClass": 40,
          "targetLabel": "Straves",
          "statement": {
            "pk_entity": 765198,
            "fk_property": 1113,
            "fk_object_data": 0,
            "fk_object_info": 765194,
            "fk_subject_data": 0,
            "fk_subject_info": 765195,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1113
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "40": {
            "appellation": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765196,
            "pk_entity": 866590,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "language": {
              "notes": "Italian",
              "scope": "individual",
              "iso6391": "it ",
              "fk_class": 54,
              "iso6392b": "ita",
              "iso6392t": "ita",
              "lang_type": "living",
              "pk_entity": 19703,
              "pk_language": "ita"
            }
          },
          "targetClass": 54,
          "targetLabel": "Italian",
          "statement": {
            "pk_entity": 765196,
            "fk_property": 1112,
            "fk_object_data": 0,
            "fk_object_info": 19703,
            "fk_subject_data": 0,
            "fk_subject_info": 765195,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1112
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "54": {
            "language": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 72
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 152
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 150
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 151
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 153
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 71
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765195
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1762
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "899": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765191,
            "pk_entity": 866586,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 630,
                "pk_entity": 746080,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_746080",
                "fk_class": 630,
                "pk_entity": 746080,
                "project_id": 0,
                "class_label": "Naming type",
                "entity_type": "peIt",
                "entity_label": "Titolo di rispetto o di cerimonia",
                "tmsp_last_modification": "2023-10-13T12:37:16.590263+00:00"
              }
            }
          },
          "targetClass": 630,
          "targetLabel": "Titolo di rispetto o di cerimonia",
          "statement": {
            "pk_entity": 765191,
            "fk_property": 1430,
            "fk_object_data": 0,
            "fk_object_info": 746080,
            "fk_subject_data": 0,
            "fk_subject_info": 765189,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1430
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "630": {
            "entityPreview": "true"
          },
          "874": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1763
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "900": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1440
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "635": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1943
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "967": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1842
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "41": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "365": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765193,
            "pk_entity": 866588,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765193,
            "fk_property": 1111,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765189,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1111
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": true,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "1": {
            "entityPreview": "true"
          },
          "5": {
            "entityPreview": "true"
          },
          "21": {
            "entityPreview": "true"
          },
          "53": {
            "entityPreview": "true"
          },
          "60": {
            "entityPreview": "true"
          },
          "61": {
            "entityPreview": "true"
          },
          "62": {
            "entityPreview": "true"
          },
          "63": {
            "entityPreview": "true"
          },
          "67": {
            "entityPreview": "true"
          },
          "68": {
            "entityPreview": "true"
          },
          "71": {
            "entityPreview": "true"
          },
          "78": {
            "entityPreview": "true"
          },
          "79": {
            "entityPreview": "true"
          },
          "212": {
            "entityPreview": "true"
          },
          "213": {
            "entityPreview": "true"
          },
          "218": {
            "entityPreview": "true"
          },
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "234": {
            "entityPreview": "true"
          },
          "244": {
            "entityPreview": "true"
          },
          "332": {
            "entityPreview": "true"
          },
          "334": {
            "entityPreview": "true"
          },
          "340": {
            "entityPreview": "true"
          },
          "363": {
            "entityPreview": "true"
          },
          "364": {
            "entityPreview": "true"
          },
          "365": {
            "entityPreview": "true"
          },
          "441": {
            "entityPreview": "true"
          },
          "442": {
            "entityPreview": "true"
          },
          "443": {
            "entityPreview": "true"
          },
          "444": {
            "entityPreview": "true"
          },
          "445": {
            "entityPreview": "true"
          },
          "449": {
            "entityPreview": "true"
          },
          "450": {
            "entityPreview": "true"
          },
          "451": {
            "entityPreview": "true"
          },
          "452": {
            "entityPreview": "true"
          },
          "454": {
            "entityPreview": "true"
          },
          "455": {
            "entityPreview": "true"
          },
          "456": {
            "appellation": "true"
          },
          "457": {
            "entityPreview": "true"
          },
          "459": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          },
          "503": {
            "entityPreview": "true"
          },
          "516": {
            "entityPreview": "true"
          },
          "518": {
            "entityPreview": "true"
          },
          "519": {
            "entityPreview": "true"
          },
          "520": {
            "entityPreview": "true"
          },
          "521": {
            "cell": "true"
          },
          "535": {
            "entityPreview": "true"
          },
          "607": {
            "entityPreview": "true"
          },
          "608": {
            "entityPreview": "true"
          },
          "629": {
            "entityPreview": "true"
          },
          "630": {
            "entityPreview": "true"
          },
          "631": {
            "entityPreview": "true"
          },
          "632": {
            "entityPreview": "true"
          },
          "633": {
            "entityPreview": "true"
          },
          "634": {
            "entityPreview": "true"
          },
          "635": {
            "entityPreview": "true"
          },
          "636": {
            "entityPreview": "true"
          },
          "637": {
            "entityPreview": "true"
          },
          "638": {
            "entityPreview": "true"
          },
          "664": {
            "entityPreview": "true"
          },
          "690": {
            "entityPreview": "true"
          },
          "691": {
            "entityPreview": "true"
          },
          "694": {
            "entityPreview": "true"
          },
          "695": {
            "entityPreview": "true"
          },
          "698": {
            "entityPreview": "true"
          },
          "702": {
            "entityPreview": "true"
          },
          "708": {
            "entityPreview": "true"
          },
          "718": {
            "entityPreview": "true"
          },
          "785": {
            "entityPreview": "true"
          },
          "808": {
            "entityPreview": "true"
          },
          "827": {
            "entityPreview": "true"
          },
          "838": {
            "entityPreview": "true"
          },
          "839": {
            "entityPreview": "true"
          },
          "867": {
            "entityPreview": "true"
          },
          "869": {
            "entityPreview": "true"
          },
          "871": {
            "entityPreview": "true"
          },
          "872": {
            "entityPreview": "true"
          },
          "873": {
            "entityPreview": "true"
          },
          "874": {
            "entityPreview": "true"
          },
          "883": {
            "entityPreview": "true"
          },
          "898": {
            "entityPreview": "true"
          },
          "899": {
            "entityPreview": "true"
          },
          "900": {
            "entityPreview": "true"
          },
          "903": {
            "entityPreview": "true"
          },
          "904": {
            "entityPreview": "true"
          },
          "969": {
            "entityPreview": "true"
          },
          "1076": {
            "entityPreview": "true"
          },
          "1150": {
            "entityPreview": "true"
          },
          "1210": {
            "entityPreview": "true"
          },
          "1295": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765192,
            "pk_entity": 866587,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "appellation": {
              "string": "ser",
              "fk_class": 40,
              "pk_entity": 754054,
              "quill_doc": {
                "ops": [
                  {
                    "insert": "s",
                    "attributes": {
                      "charid": "8"
                    }
                  },
                  {
                    "insert": "e",
                    "attributes": {
                      "charid": "6"
                    }
                  },
                  {
                    "insert": "r",
                    "attributes": {
                      "charid": "7"
                    }
                  },
                  {
                    "insert": "\n",
                    "attributes": {
                      "blockid": "1"
                    }
                  }
                ],
                "latestId": 8
              }
            }
          },
          "targetClass": 40,
          "targetLabel": "ser",
          "statement": {
            "pk_entity": 765192,
            "fk_property": 1113,
            "fk_object_data": 0,
            "fk_object_info": 754054,
            "fk_subject_data": 0,
            "fk_subject_info": 765189,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1113
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "40": {
            "appellation": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765190,
            "pk_entity": 866585,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "language": {
              "notes": "Italian",
              "scope": "individual",
              "iso6391": "it ",
              "fk_class": 54,
              "iso6392b": "ita",
              "iso6392t": "ita",
              "lang_type": "living",
              "pk_entity": 19703,
              "pk_language": "ita"
            }
          },
          "targetClass": 54,
          "targetLabel": "Italian",
          "statement": {
            "pk_entity": 765190,
            "fk_property": 1112,
            "fk_object_data": 0,
            "fk_object_info": 19703,
            "fk_subject_data": 0,
            "fk_subject_info": 765189,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1112
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "54": {
            "language": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 72
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 152
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 150
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 151
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 153
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 71
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765189
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1762
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "899": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1763
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "900": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1440
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "635": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1943
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "967": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1842
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "41": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "212": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1881
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "441": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765202,
            "pk_entity": 866596,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 363,
                "pk_entity": 742923,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_742923",
                "fk_class": 363,
                "pk_entity": 742923,
                "project_id": 0,
                "class_label": "Geographical Place",
                "entity_type": "peIt",
                "entity_label": "S. Cancian ",
                "tmsp_last_modification": "2023-10-13T12:37:16.437234+00:00"
              }
            }
          },
          "targetClass": 363,
          "targetLabel": "S. Cancian ",
          "statement": {
            "pk_entity": 765202,
            "fk_property": 1178,
            "fk_object_data": 0,
            "fk_object_info": 742923,
            "fk_subject_data": 0,
            "fk_subject_info": 765201,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1178
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "363": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765203,
            "pk_entity": 866597,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765203,
            "fk_property": 1177,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765201,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1177
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": true,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          },
          "68": {
            "entityPreview": "true"
          },
          "441": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765204,
            "pk_entity": 866598,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 449,
                "pk_entity": 739599,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_739599",
                "fk_class": 449,
                "pk_entity": 739599,
                "project_id": 591,
                "class_label": "Epistemic Location Type",
                "entity_type": "peIt",
                "entity_label": "Residenza",
                "tmsp_last_modification": "2023-10-13T12:37:57.783517+00:00"
              }
            }
          },
          "targetClass": 449,
          "targetLabel": "Residenza",
          "statement": {
            "pk_entity": 765204,
            "fk_property": 1066,
            "fk_object_data": 0,
            "fk_object_info": 739599,
            "fk_subject_data": 0,
            "fk_subject_info": 765201,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1066
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "449": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 108
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "212": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 107
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "212": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 72
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 152
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 150
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 151
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 153
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 71
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765201
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1762
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "899": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1763
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "900": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1440
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "635": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1943
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "967": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1842
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "41": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "631": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1892
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1517
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "664": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1516
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "633": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765206,
            "pk_entity": 866600,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 503,
                "pk_entity": 764105,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_764105",
                "fk_type": 739284,
                "fk_class": 503,
                "pk_entity": 764105,
                "project_id": 0,
                "type_label": "Processetto",
                "class_label": "Section",
                "entity_type": "peIt",
                "entity_label": "Procesetto di Vito Sainngh (da Bamberga, sartor) e Orsola di Giorgio Stransin",
                "tmsp_last_modification": "2023-10-13T12:37:12.716621+00:00"
              }
            }
          },
          "targetClass": 503,
          "targetLabel": "Procesetto di Vito Sainngh (da Bamberga, sartor) e Orsola di Giorgio Stransin",
          "statement": {
            "pk_entity": 765206,
            "fk_property": 1433,
            "fk_object_data": 0,
            "fk_object_info": 764105,
            "fk_subject_data": 0,
            "fk_subject_info": 765205,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1433
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "503": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765207,
            "pk_entity": 866601,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765207,
            "fk_property": 1432,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765205,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1432
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765208,
            "pk_entity": 866602,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 764129,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_764129",
                "fk_class": 21,
                "pk_entity": 764129,
                "project_id": 0,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Vito Sainngh (da Bamberga, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:14.286885+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Vito Sainngh (da Bamberga, sartor)",
          "statement": {
            "pk_entity": 765208,
            "fk_property": 1431,
            "fk_object_data": 0,
            "fk_object_info": 764129,
            "fk_subject_data": 0,
            "fk_subject_info": 765205,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1431
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765209,
            "pk_entity": 866603,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "timePrimitive": {
              "timePrimitive": {
                "calendar": "gregorian",
                "duration": "1 day",
                "julianDay": 2304379
              },
              "infTimePrimitive": {
                "calendar": "gregorian",
                "duration": "1 day",
                "fk_class": 335,
                "pk_entity": 764667,
                "julian_day": 2304379
              }
            }
          },
          "targetClass": 335,
          "targetLabel": "todo",
          "statement": {
            "pk_entity": 765209,
            "fk_property": 72,
            "fk_object_data": 0,
            "fk_object_info": 764667,
            "fk_subject_data": 0,
            "fk_subject_info": 765205,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 72
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 152
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 150
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 151
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 153
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 71
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765205
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1762
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "899": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765224,
            "pk_entity": 866617,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 632,
                "pk_entity": 739576,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_739576",
                "fk_class": 632,
                "pk_entity": 739576,
                "project_id": 0,
                "class_label": "Social Relationship Type",
                "entity_type": "peIt",
                "entity_label": "Origine comune",
                "tmsp_last_modification": "2023-10-13T12:37:25.038272+00:00"
              }
            }
          },
          "targetClass": 632,
          "targetLabel": "Origine comune",
          "statement": {
            "pk_entity": 765224,
            "fk_property": 1434,
            "fk_object_data": 0,
            "fk_object_info": 739576,
            "fk_subject_data": 0,
            "fk_subject_info": 765221,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1434
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "632": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1763
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "900": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1440
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "635": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1943
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "967": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1842
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "41": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "334": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765223,
            "pk_entity": 866616,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765223,
            "fk_property": 1445,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765221,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1445
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765222,
            "pk_entity": 866615,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 764129,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_764129",
                "fk_class": 21,
                "pk_entity": 764129,
                "project_id": 0,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Vito Sainngh (da Bamberga, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:14.286885+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Vito Sainngh (da Bamberga, sartor)",
          "statement": {
            "pk_entity": 765222,
            "fk_property": 1446,
            "fk_object_data": 0,
            "fk_object_info": 764129,
            "fk_subject_data": 0,
            "fk_subject_info": 765221,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1446
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765225,
            "pk_entity": 866618,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765225,
            "fk_property": 1409,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765221,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1409
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 72
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 152
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 150
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 151
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 153
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 71
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1440
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "635": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1943
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "967": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1842
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "41": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "637": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765250,
            "pk_entity": 866640,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765250,
            "fk_property": 1441,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765248,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1441
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": true,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765249,
            "pk_entity": 866639,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 636,
                "pk_entity": 755657,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_755657",
                "fk_class": 636,
                "pk_entity": 755657,
                "project_id": 0,
                "class_label": "Occupation",
                "entity_type": "teEn",
                "entity_label": "sartor",
                "tmsp_last_modification": "2023-10-13T12:37:12.418701+00:00"
              }
            }
          },
          "targetClass": 636,
          "targetLabel": "sartor",
          "statement": {
            "pk_entity": 765249,
            "fk_property": 1442,
            "fk_object_data": 0,
            "fk_object_info": 755657,
            "fk_subject_data": 0,
            "fk_subject_info": 765248,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1442
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "636": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1443
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "363": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1444
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          },
          "68": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 72
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 152
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 150
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 151
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 153
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 71
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765248
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1440
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "635": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1943
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "967": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1842
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "41": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "61": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765263,
            "pk_entity": 866652,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765263,
            "fk_property": 86,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765262,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 86
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 7
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "363": {
            "entityPreview": "true"
          },
          "441": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1435
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "633": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765264,
            "pk_entity": 866653,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "timePrimitive": {
              "timePrimitive": {
                "calendar": "julian",
                "duration": "1 year",
                "julianDay": 2294136
              },
              "infTimePrimitive": {
                "calendar": "julian",
                "duration": "1 year",
                "fk_class": 335,
                "pk_entity": 739318,
                "julian_day": 2294136
              }
            }
          },
          "targetClass": 335,
          "targetLabel": "todo",
          "statement": {
            "pk_entity": 765264,
            "fk_property": 72,
            "fk_object_data": 0,
            "fk_object_info": 739318,
            "fk_subject_data": 0,
            "fk_subject_info": 765262,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 72
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 152
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 150
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 151
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 153
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 71
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765262
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1762
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "899": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765224,
            "pk_entity": 866617,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 632,
                "pk_entity": 739576,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_739576",
                "fk_class": 632,
                "pk_entity": 739576,
                "project_id": 0,
                "class_label": "Social Relationship Type",
                "entity_type": "peIt",
                "entity_label": "Origine comune",
                "tmsp_last_modification": "2023-10-13T12:37:25.038272+00:00"
              }
            }
          },
          "targetClass": 632,
          "targetLabel": "Origine comune",
          "statement": {
            "pk_entity": 765224,
            "fk_property": 1434,
            "fk_object_data": 0,
            "fk_object_info": 739576,
            "fk_subject_data": 0,
            "fk_subject_info": 765221,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1434
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "632": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1763
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "900": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1440
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "635": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1943
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "967": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1842
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "41": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "334": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765223,
            "pk_entity": 866616,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765223,
            "fk_property": 1445,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765221,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1445
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765222,
            "pk_entity": 866615,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 764129,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "0_764129",
                "fk_class": 21,
                "pk_entity": 764129,
                "project_id": 0,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Vito Sainngh (da Bamberga, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:14.286885+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Vito Sainngh (da Bamberga, sartor)",
          "statement": {
            "pk_entity": 765222,
            "fk_property": 1446,
            "fk_object_data": 0,
            "fk_object_info": 764129,
            "fk_subject_data": 0,
            "fk_subject_info": 765221,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1446
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 765225,
            "pk_entity": 866618,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161,
            "is_standard_in_project": false
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 765225,
            "fk_property": 1409,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 765221,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1409
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "21": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 72
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 152
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 150
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 151
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 153
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 71
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 765221
          }
        },
        "targets": {
          "335": {
            "timePrimitive": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1763
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 868306
          }
        },
        "targets": {
          "900": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1440
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 868306
          }
        },
        "targets": {
          "635": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1943
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 868306
          }
        },
        "targets": {
          "967": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1842
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 868306
          }
        },
        "targets": {
          "41": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [],
      "count": 0,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1499
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 868306
          }
        },
        "targets": {
          "933": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 878758,
            "pk_entity": 931669,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 21,
                "pk_entity": 765182,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": true,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_765182",
                "fk_class": 21,
                "pk_entity": 765182,
                "project_id": 591,
                "class_label": "Person",
                "entity_type": "peIt",
                "entity_label": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
                "tmsp_last_modification": "2023-10-13T12:37:57.314887+00:00"
              }
            }
          },
          "targetClass": 21,
          "targetLabel": "Adamo di Melchiorre Straves (da Bamberg, sartor)",
          "statement": {
            "pk_entity": 878758,
            "fk_property": 1875,
            "fk_object_data": 0,
            "fk_object_info": 765182,
            "fk_subject_data": 0,
            "fk_subject_info": 868306,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1875
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": true,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 868306
          }
        },
        "targets": {
          "1": {
            "entityPreview": "true"
          },
          "5": {
            "entityPreview": "true"
          },
          "21": {
            "entityPreview": "true"
          },
          "53": {
            "entityPreview": "true"
          },
          "60": {
            "entityPreview": "true"
          },
          "62": {
            "entityPreview": "true"
          },
          "63": {
            "entityPreview": "true"
          },
          "67": {
            "entityPreview": "true"
          },
          "68": {
            "entityPreview": "true"
          },
          "71": {
            "entityPreview": "true"
          },
          "78": {
            "entityPreview": "true"
          },
          "79": {
            "entityPreview": "true"
          },
          "212": {
            "entityPreview": "true"
          },
          "218": {
            "entityPreview": "true"
          },
          "219": {
            "entityPreview": "true"
          },
          "220": {
            "entityPreview": "true"
          },
          "221": {
            "entityPreview": "true"
          },
          "234": {
            "entityPreview": "true"
          },
          "244": {
            "entityPreview": "true"
          },
          "332": {
            "entityPreview": "true"
          },
          "334": {
            "entityPreview": "true"
          },
          "340": {
            "entityPreview": "true"
          },
          "363": {
            "entityPreview": "true"
          },
          "364": {
            "entityPreview": "true"
          },
          "365": {
            "entityPreview": "true"
          },
          "441": {
            "entityPreview": "true"
          },
          "442": {
            "entityPreview": "true"
          },
          "443": {
            "entityPreview": "true"
          },
          "444": {
            "entityPreview": "true"
          },
          "445": {
            "entityPreview": "true"
          },
          "449": {
            "entityPreview": "true"
          },
          "450": {
            "entityPreview": "true"
          },
          "451": {
            "entityPreview": "true"
          },
          "452": {
            "entityPreview": "true"
          },
          "454": {
            "entityPreview": "true"
          },
          "455": {
            "entityPreview": "true"
          },
          "459": {
            "entityPreview": "true"
          },
          "502": {
            "entityPreview": "true"
          },
          "503": {
            "entityPreview": "true"
          },
          "516": {
            "entityPreview": "true"
          },
          "518": {
            "entityPreview": "true"
          },
          "519": {
            "entityPreview": "true"
          },
          "520": {
            "entityPreview": "true"
          },
          "535": {
            "entityPreview": "true"
          },
          "607": {
            "entityPreview": "true"
          },
          "608": {
            "entityPreview": "true"
          },
          "629": {
            "entityPreview": "true"
          },
          "630": {
            "entityPreview": "true"
          },
          "631": {
            "entityPreview": "true"
          },
          "632": {
            "entityPreview": "true"
          },
          "633": {
            "entityPreview": "true"
          },
          "634": {
            "entityPreview": "true"
          },
          "635": {
            "entityPreview": "true"
          },
          "638": {
            "entityPreview": "true"
          },
          "664": {
            "entityPreview": "true"
          },
          "690": {
            "entityPreview": "true"
          },
          "691": {
            "entityPreview": "true"
          },
          "694": {
            "entityPreview": "true"
          },
          "695": {
            "entityPreview": "true"
          },
          "698": {
            "entityPreview": "true"
          },
          "702": {
            "entityPreview": "true"
          },
          "708": {
            "entityPreview": "true"
          },
          "718": {
            "entityPreview": "true"
          },
          "808": {
            "entityPreview": "true"
          },
          "827": {
            "entityPreview": "true"
          },
          "838": {
            "entityPreview": "true"
          },
          "839": {
            "entityPreview": "true"
          },
          "867": {
            "entityPreview": "true"
          },
          "868": {
            "entityPreview": "true"
          },
          "869": {
            "entityPreview": "true"
          },
          "871": {
            "entityPreview": "true"
          },
          "872": {
            "entityPreview": "true"
          },
          "873": {
            "entityPreview": "true"
          },
          "874": {
            "entityPreview": "true"
          },
          "883": {
            "entityPreview": "true"
          },
          "903": {
            "entityPreview": "true"
          },
          "904": {
            "entityPreview": "true"
          },
          "969": {
            "entityPreview": "true"
          },
          "1076": {
            "entityPreview": "true"
          },
          "1150": {
            "entityPreview": "true"
          },
          "1210": {
            "entityPreview": "true"
          },
          "1295": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 875274,
            "pk_entity": 931668,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161
          },
          "isOutgoing": true,
          "target": {
            "appellation": {
              "string": "Ser Adamus Straves q. Melchioris",
              "fk_class": 456,
              "pk_entity": 864822,
              "quill_doc": {
                "ops": [
                  {
                    "insert": "S",
                    "attributes": {
                      "charid": "9191"
                    }
                  },
                  {
                    "insert": "e",
                    "attributes": {
                      "charid": "9192"
                    }
                  },
                  {
                    "insert": "r",
                    "attributes": {
                      "charid": "9193"
                    }
                  },
                  {
                    "insert": " ",
                    "attributes": {
                      "charid": "9194"
                    }
                  },
                  {
                    "insert": "A",
                    "attributes": {
                      "charid": "9195"
                    }
                  },
                  {
                    "insert": "d",
                    "attributes": {
                      "charid": "9196"
                    }
                  },
                  {
                    "insert": "a",
                    "attributes": {
                      "charid": "9197"
                    }
                  },
                  {
                    "insert": "m",
                    "attributes": {
                      "charid": "9198"
                    }
                  },
                  {
                    "insert": "u",
                    "attributes": {
                      "charid": "9199"
                    }
                  },
                  {
                    "insert": "s",
                    "attributes": {
                      "charid": "9200"
                    }
                  },
                  {
                    "insert": " ",
                    "attributes": {
                      "charid": "9201"
                    }
                  },
                  {
                    "insert": "S",
                    "attributes": {
                      "charid": "9202"
                    }
                  },
                  {
                    "insert": "t",
                    "attributes": {
                      "charid": "9203"
                    }
                  },
                  {
                    "insert": "r",
                    "attributes": {
                      "charid": "9204"
                    }
                  },
                  {
                    "insert": "a",
                    "attributes": {
                      "charid": "9205"
                    }
                  },
                  {
                    "insert": "v",
                    "attributes": {
                      "charid": "9206"
                    }
                  },
                  {
                    "insert": "e",
                    "attributes": {
                      "charid": "9207"
                    }
                  },
                  {
                    "insert": "s",
                    "attributes": {
                      "charid": "9208"
                    }
                  },
                  {
                    "insert": " ",
                    "attributes": {
                      "charid": "9209"
                    }
                  },
                  {
                    "insert": "q",
                    "attributes": {
                      "charid": "9210"
                    }
                  },
                  {
                    "insert": ".",
                    "attributes": {
                      "charid": "9211"
                    }
                  },
                  {
                    "insert": " ",
                    "attributes": {
                      "charid": "9212"
                    }
                  },
                  {
                    "insert": "M",
                    "attributes": {
                      "charid": "9213"
                    }
                  },
                  {
                    "insert": "e",
                    "attributes": {
                      "charid": "9214"
                    }
                  },
                  {
                    "insert": "l",
                    "attributes": {
                      "charid": "9215"
                    }
                  },
                  {
                    "insert": "c",
                    "attributes": {
                      "charid": "9216"
                    }
                  },
                  {
                    "insert": "h",
                    "attributes": {
                      "charid": "9217"
                    }
                  },
                  {
                    "insert": "i",
                    "attributes": {
                      "charid": "9218"
                    }
                  },
                  {
                    "insert": "o",
                    "attributes": {
                      "charid": "9219"
                    }
                  },
                  {
                    "insert": "r",
                    "attributes": {
                      "charid": "9220"
                    }
                  },
                  {
                    "insert": "i",
                    "attributes": {
                      "charid": "9221"
                    }
                  },
                  {
                    "insert": "s",
                    "attributes": {
                      "charid": "9222"
                    }
                  }
                ],
                "latestId": 9222
              }
            }
          },
          "targetClass": 456,
          "targetLabel": "Ser Adamus Straves q. Melchioris",
          "statement": {
            "pk_entity": 875274,
            "fk_property": 1874,
            "fk_object_data": 0,
            "fk_object_info": 864822,
            "fk_subject_data": 0,
            "fk_subject_info": 868306,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1874
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 868306
          }
        },
        "targets": {
          "456": {
            "appellation": "true"
          }
        },
        "pkProject": 591
      }
    },
    {
      "validFor": "2023-11-20T16:05:19.079Z",
      "paginatedStatements": [
        {
          "projRel": {
            "fk_entity": 871790,
            "pk_entity": 931670,
            "fk_creator": 161,
            "fk_project": 591,
            "is_in_project": true,
            "fk_last_modifier": 161
          },
          "isOutgoing": true,
          "target": {
            "entity": {
              "resource": {
                "fk_class": 785,
                "pk_entity": 862777,
                "community_visibility": {
                  "dataApi": false,
                  "toolbox": false,
                  "website": false
                }
              },
              "entityPreview": {
                "key": "591_862777",
                "fk_class": 785,
                "pk_entity": 862777,
                "project_id": 591,
                "class_label": "Text",
                "entity_type": "peIt",
                "entity_label": "",
                "tmsp_last_modification": "2023-10-13T12:37:49.810737+00:00"
              }
            }
          },
          "targetClass": 785,
          "targetLabel": "",
          "statement": {
            "pk_entity": 871790,
            "fk_property": 1872,
            "fk_object_data": 0,
            "fk_object_info": 862777,
            "fk_subject_data": 0,
            "fk_subject_info": 868306,
            "is_in_project_count": 1,
            "fk_object_tables_row": 0,
            "fk_object_tables_cell": 0,
            "fk_subject_tables_row": 0,
            "fk_subject_tables_cell": 0,
            "fk_property_of_property": 0,
            "is_standard_in_project_count": 0
          }
        }
      ],
      "count": 1,
      "req": {
        "page": {
          "property": {
            "fkProperty": 1872
          },
          "isOutgoing": true,
          "limit": 1,
          "offset": 0,
          // "isCircular": false,
          "scope": {
            "inProject": 591
          },
          "source": {
            "fkInfo": 868306
          }
        },
        "targets": {
          "785": {
            "entityPreview": "true"
          },
          "899": {
            "entityPreview": "true"
          },
          "900": {
            "entityPreview": "true"
          }
        },
        "pkProject": 591
      }
    }
  ]
}
