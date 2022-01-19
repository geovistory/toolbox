import {AppellationFormCtrlType} from '../../../../models/enums/AppellationFormCtrlType';
import {IconType} from '../../../../models/enums/IconType';
import {TabComponent} from '../../../../models/enums/TabComponent';
import {TrueEnum} from '../../../../models/enums/TrueEnum';
import {SysConfigValue} from '../../../../models/sys-config/sys-config-value.model';

export class SysConfigValueMock {
  static readonly SYS_CONFIC_VALID: SysConfigValue = {
    "ontome": {
      "optionalOntomeProfiles": [
        {
          "profilesAvailableByOmProjects": [
            6
          ]
        },
        {
          "profilesAvailableByOmProjects": [
            48
          ],
          "restrictedToGvProjects": [
            591,
            375669
          ]
        }
      ],
      "requiredOntomeProfiles": [
        5
      ]
    },
    "classesDefault": {
      "viewType": {
        "nestedResource": []
      },
      "formControlType": {
        "entity": TrueEnum.true
      },
      communityVisibilityRange: {toolbox: [true], dataApi: [true], website: [true]},
      communityVisibilityDefault: {toolbox: false, dataApi: false, website: false},
      projectVisibilityDefault: {dataApi: false, website: false},
      belongsToCategory: {entities: {showInAddMenu: true}}
    },
    "classesByBasicType": {
      "8": {
        icon: IconType['persistent-item'],
        "viewType": {
          "entityPreview": TrueEnum.true
        },
        "formControlType": {
          "entity": TrueEnum.true
        },
        communityVisibilityRange: {toolbox: [true], dataApi: [true], website: [true]},
        communityVisibilityDefault: {toolbox: true, dataApi: true, website: true},
      },
      9: {
        icon: IconType['temporal-entity'],
        communityVisibilityRange: {toolbox: [true], dataApi: [true, false], website: [true, false]},
        communityVisibilityDefault: {toolbox: true, dataApi: false, website: false},
      },
      "30": {
        icon: IconType['persistent-item'],
        "viewType": {
          "entityPreview": TrueEnum.true
        },
        "formControlType": {
          "entity": TrueEnum.true
        },
        communityVisibilityRange: {toolbox: [true], dataApi: [true], website: [true]},
        communityVisibilityDefault: {toolbox: true, dataApi: true, website: true}
      }
    },
    "classes": {
      "1": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "2": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "40": {
        icon: IconType.value,
        "viewType": {
          "appellation": TrueEnum.true
        },
        "formControlType": {
          "appellation": AppellationFormCtrlType.true
        },
        "valueObjectType": {
          "appellation": TrueEnum.true
        },
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "41": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "50": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "51": {
        icon: IconType.value,
        "formControlType": {
          "place": TrueEnum.true
        },
        "valueObjectType": {
          "place": TrueEnum.true
        },
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "52": {
        icon: IconType.value,
        "viewType": {
          "dimension": {
            "measurementUnitClass": 56
          }
        },
        "formControlType": {
          "dimension": {
            "measurementUnitClass": 56
          }
        },
        "valueObjectType": {
          "dimension": {
            "measurementUnitClass": 56
          }
        },
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "54": {
        "viewType": {
          "language": TrueEnum.true
        },
        "formControlType": {
          "language": TrueEnum.true
        },
        "valueObjectType": {
          "language": TrueEnum.true
        },
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "70": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "218": {
        icon: IconType.source,
        belongsToCategory: {
          sources: {showInAddMenu: false}
        }
      },
      "220": {
        icon: IconType.source,
        docUrl: 'https://docs.geovistory.com/geovistory-manual/sources/what-is-a-source-in-geovistory/types-of-sources#class-unique-source-object',
        belongsToCategory: {
          sources: {
            showInAddMenu: true,
            positionInAddMenu: 10
          }
        }
      },
      "503": {
        icon: IconType.source,
        belongsToCategory: {
          sources: {
            showInAddMenu: true,
            positionInAddMenu: 20
          }
        }
      },
      "219": {
        icon: IconType.source,
        docUrl: 'https://docs.geovistory.com/geovistory-manual/sources/what-is-a-source-in-geovistory/types-of-sources#class-serially-produced-source',
        belongsToCategory: {
          sources: {
            showInAddMenu: true,
            positionInAddMenu: 30
          }
        }
      },
      "221": {
        icon: IconType.source,
        belongsToCategory: {
          sources: {
            showInAddMenu: true,
            positionInAddMenu: 40
          }
        }
      },
      "234": {
        icon: IconType.source,
        belongsToCategory: {
          sources: {
            showInAddMenu: true,
            positionInAddMenu: 50
          }
        }
      },
      "502": {
        icon: IconType.source,
        belongsToCategory: {
          sources: {
            showInAddMenu: true,
            positionInAddMenu: 60
          }
        }
      },
      "335": {
        icon: IconType.value,
        "viewType": {
          "timePrimitive": TrueEnum.true
        },
        "formControlType": {
          "timePrimitive": TrueEnum.true
        },
        "valueObjectType": {
          "timePrimitive": TrueEnum.true
        },
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "338": {
        icon: IconType.value,
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "339": {
        icon: IconType.value,
        "viewType": {
          "appellation": TrueEnum.true
        },
        "formControlType": {
          "appellation": AppellationFormCtrlType.textEditor
        },
        "valueObjectType": {
          "appellation": TrueEnum.true
        },
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "365": {
        "formControlType": {
          "appellationTeEn": TrueEnum.true
        }
      },
      "445": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "454": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "455": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "456": {
        icon: IconType.value,
        "viewType": {
          "appellation": TrueEnum.true
        },
        "formControlType": {
          "appellation": AppellationFormCtrlType.textEditor
        },
        "valueObjectType": {
          "appellation": TrueEnum.true
        },
        belongsToCategory: {
          digitals: {showInAddMenu: false}
        }
      },
      "457": {
        icon: IconType.value,
        belongsToCategory: {
          digitals: {showInAddMenu: false}
        }
      },
      "518": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "521": {
        icon: IconType.value,
        "viewType": {
          "cell": TrueEnum.true
        },
        "formControlType": {
          "cell": TrueEnum.true
        },
        "valueObjectType": {
          "cell": TrueEnum.true
        },
        belongsToCategory: {
          digitals: {showInAddMenu: false}
        }
      },
      635: {
        communityVisibilityRange: {toolbox: [false], dataApi: [false], website: [false]},
        communityVisibilityDefault: {toolbox: false, dataApi: false, website: false},
      },
      "657": {
        icon: IconType.value,
        "viewType": {
          "langString": TrueEnum.true
        },
        "formControlType": {
          "langString": TrueEnum.true
        },
        "valueObjectType": {
          "langString": TrueEnum.true
        },
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "689": {
        icon: IconType.value,
        "viewType": {
          "dimension": {
            "measurementUnitClass": 690
          }
        },
        "formControlType": {
          "dimension": {
            "measurementUnitClass": 690
          }
        },
        "valueObjectType": {
          "dimension": {
            "measurementUnitClass": 690
          }
        },
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "707": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "709": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "713": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "716": {
        icon: IconType.value,
        "viewType": {
          "dimension": {
            "measurementUnitClass": 715
          }
        },
        "formControlType": {
          "dimension": {
            "measurementUnitClass": 715
          }
        },
        "valueObjectType": {
          "dimension": {
            "measurementUnitClass": 715
          }
        },
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "717": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "783": {
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "784": {
        icon: IconType.value,
        "viewType": {
          "langString": TrueEnum.true
        },
        "formControlType": {
          "langString": TrueEnum.true
        },
        "valueObjectType": {
          "langString": TrueEnum.true
        },
        belongsToCategory: {
          entities: {showInAddMenu: false}
        }
      },
      "785": {
        "viewType": {
          "langString": TrueEnum.true
        },
        "formControlType": {
          "langString": TrueEnum.true
        },
        "valueObjectType": {
          "langString": TrueEnum.true
        },
        belongsToCategory: {
          digitals: {showInAddMenu: false}
        }
      },
      "868": {
        "formControlType": {
          "appellationTeEn": TrueEnum.true
        }
      },
      "899": {
        icon: IconType.text,
        detailPage: TabComponent.text,
        belongsToCategory: {
          digitals: {
            showInAddMenu: true,
            positionInAddMenu: 2
          }

        }
      },
      "900": {
        icon: IconType.text,
        detailPage: TabComponent.text,
        belongsToCategory: {
          digitals: {
            showInAddMenu: false,
          }
        }
      },
      "901": {
        icon: IconType.text,
        detailPage: TabComponent.text,
        belongsToCategory: {
          digitals: {
            showInAddMenu: true,
            positionInAddMenu: 1
          }
        }
      },
      "898": {
        icon: IconType.table,
        detailPage: TabComponent.table,
        belongsToCategory: {
          digitals: {
            showInAddMenu: true,
            positionInAddMenu: 3
          }
        }
      },
      "934": {
        icon: IconType['persistent-item'],
        viewType: {nestedResource: []},
        belongsToCategory: {
          digitals: {showInAddMenu: false}
        }
      },
      "933": {
        icon: IconType['persistent-item'],
        viewType: {nestedResource: []},
        belongsToCategory: {
          digitals: {showInAddMenu: false}
        }
      },
      "935": {
        icon: IconType['persistent-item'],
        viewType: {nestedResource: []},
        belongsToCategory: {
          sources: {showInAddMenu: false}
        }
      },
      "936": {
        icon: IconType.value,
        "valueObjectType": {},
        belongsToCategory: {
          digitals: {showInAddMenu: false}
        }
      },
    },
    "addProperty": [
      {
        "comment": "add <has appellation> to all teEn, peIt and types except for appe for lang itself",
        "isOutgoing": false,
        "toSourceClass": {
          "whereBasicTypeIn": [
            8,
            9,
            30
          ],
          "wherePkClassNotIn": [
            365,
            21,
            870
          ]
        },
        "whereFkDomain": 365,
        "wherePkProperty": 1111
      },
      {
        "comment": "add <has definition> to all teEn, peIt and types",
        "isOutgoing": true,
        "toSourceClass": {
          "whereBasicTypeIn": [
            8,
            9,
            30
          ],
          "whereNotSubclassOf": [
            40,
            455,
            13
          ]
        },
        "wherePkProperty": 1762,
        "whereFkRange": 899
      },
      {
        "comment": "Entity is mentioned by mentioning",
        "isOutgoing": false,
        "wherePkProperty": 1876,
        "toSourceClass": {
          "all": true,
          "whereNotValueObjectType": true,
          "whereNotSubclassOf": [13, 52],
          "wherePkClassNotIn": [1, 2]
        }
      },
      {
        "comment": "Entity is annotated by annotation in text",
        "isOutgoing": false,
        "wherePkProperty": 1875,
        "whereFkDomain": 933,
        "toSourceClass": {
          "all": true,
          "whereNotValueObjectType": true,
          "whereNotSubclassOf": [13, 52],
          "wherePkClassNotIn": [1, 2]
        }
      },
      {
        "comment": "Entity is annotated by annotation in table",
        "isOutgoing": false,
        "wherePkProperty": 1875,
        "whereFkDomain": 934,
        "toSourceClass": {
          "all": true,
          "whereNotValueObjectType": true,
          "whereNotSubclassOf": [13, 52],
          "wherePkClassNotIn": [1, 2]
        }
      },
      {
        "comment": "add <Ongoing throughout> to all teEn",
        "isOutgoing": true,
        "toSourceClass": {"whereBasicTypeIn": [9]},
        "wherePkProperty": 71
      },
      {
        "comment": "add <At some time within> to all teEn",
        "isOutgoing": true,
        "toSourceClass": {"whereBasicTypeIn": [9]},
        "wherePkProperty": 72
      },
      {
        "comment": "add <end of the begin> to all teEn",
        "isOutgoing": true,
        "toSourceClass": {"whereBasicTypeIn": [9]},
        "wherePkProperty": 150
      },
      {
        "comment": "add <begin of the end> to all teEn",
        "isOutgoing": true,
        "toSourceClass": {"whereBasicTypeIn": [9]},
        "wherePkProperty": 151
      },
      {
        "comment": "add <begin of the begin> to all teEn",
        "isOutgoing": true,
        "toSourceClass": {"whereBasicTypeIn": [9]},
        "wherePkProperty": 152
      },
      {
        "comment": "add <end of the end> to all teEn",
        "isOutgoing": true,
        "toSourceClass": {"whereBasicTypeIn": [9]},
        "wherePkProperty": 153
      },
      {
        "comment": "add <has to be merged with> to a lot of classes",
        "isOutgoing": true,
        "toSourceClass": {
          "all": true
        },
        "wherePkProperty": 1499,
        "replaceTargetClassWithSourceClass": true
      },
      {
        "comment": "add «same as URI (same as) – P20 -> crm:E42 Identifier» to all classes.",
        "isOutgoing": true,
        "whereFkRange": 41,
        "toSourceClass": {
          "all": true,
          "wherePkClassNotIn": [
            41,
            783
          ]
        },
        "wherePkProperty": 1842
      }
    ],
    "specialFields": {
      "bySourceClass": {
        "41": {
          "incomingProperties": {
            "1111": {
              "comment": "has appellation",
              "formSections": {
                "specific": {
                  "hidden": true
                },
                "simpleForm": {
                  "hidden": true
                }
              },
              "viewSections": {
                "specific": {
                  "position": 1
                }
              }
            }
          },
          "outgoingProperties": {
            "1762": {
              "comment": "has definition",
              "formSections": {
                "specific": {
                  "hidden": true
                },
                "simpleForm": {
                  "hidden": true
                }
              },
              "viewSections": {
                "basic": {
                  "position": 5
                }
              }
            },
            "1843": {
              "comment": "has value",
              "formSections": {
                "basic": {
                  "position": 1
                },
                "simpleForm": {
                  "position": 1,
                  "controlsOnInit": 1
                }
              },
              "viewSections": {
                "basic": {
                  "position": 1
                }
              }
            }
          }
        },
        "219": {
          "incomingProperties": {
            "1111": {
              "comment": "has appellation",
              "formSections": {
                "specific": {
                  "position": 1
                },
                "simpleForm": {
                  "hidden": true
                }
              },
              "viewSections": {
                "specific": {
                  "position": 1
                }
              }
            }
          },
          "outgoingProperties": {
            "1": {
              "comment": "is identified by (in GV: has bibliographic reference)",
              "formSections": {
                "basic": {
                  "position": 1.5,
                  "controlsOnInit": 1
                }
              },
              "viewSections": {
                "basic": {
                  "position": 1.5
                }
              }
            }
          }
        },
        "220": {
          "incomingProperties": {
            "1844": {
              "comment": "belongs to -> Beloning to a Collection",
              "formSections": {
                "basic": {
                  "position": 2
                },
                "simpleForm": {
                  "position": 1.5,
                  "controlsOnInit": 1
                }
              },
              "viewSections": {
                "basic": {
                  "position": 2
                }
              }
            }
          }
        },
        "221": {
          "incomingProperties": {
            "1844": {
              "comment": "belongs to -> Beloning to a Collection",
              "formSections": {
                "basic": {
                  "position": 2
                },
                "simpleForm": {
                  "position": 1.5,
                  "controlsOnInit": 1
                }
              },
              "viewSections": {
                "basic": {
                  "position": 2
                }
              }
            }
          }
        },
        "783": {
          "incomingProperties": {
            "1111": {
              "comment": "has appellation",
              "formSections": {
                "specific": {
                  "hidden": true
                },
                "simpleForm": {
                  "hidden": true
                }
              },
              "viewSections": {
                "specific": {
                  "position": 1
                }
              }
            }
          },
          "outgoingProperties": {
            "1843": {
              "comment": "has value",
              "formSections": {
                "basic": {
                  "position": 1
                },
                "simpleForm": {
                  "position": 1,
                  "controlsOnInit": 1
                }
              },
              "viewSections": {
                "basic": {
                  "position": 1
                }
              }
            }
          }
        },
        "870": {
          "outgoingProperties": {
            "63": {
              "comment": "has language",
              "formSections": {
                "basic": {
                  "position": 2
                },
                "simpleForm": {
                  "position": 2,
                  "controlsOnInit": 1
                }
              },
              "viewSections": {
                "basic": {
                  "position": 2
                }
              }
            },
            "1843": {
              "comment": "has value",
              "formSections": {
                "basic": {
                  "position": 1
                },
                "simpleForm": {
                  "position": 1,
                  "controlsOnInit": 1
                }
              },
              "viewSections": {
                "basic": {
                  "position": 1
                }
              }
            }
          }
        },
        "872": {
          "outgoingProperties": {
            "4": {
              "comment": "has time-span (When)",
              "formSections": {
                "basic": {
                  "position": 1
                },
                "simpleForm": {
                  "hidden": true
                }
              },
              "viewSections": {
                "basic": {
                  "position": 1
                }
              },
              "isHasTimeSpanShortCut": true
            },
            "1111": {
              "comment": "has appellation",
              "formSections": {
                "simpleForm": {
                  "position": 2,
                  "controlsOnInit": 1
                }
              }
            },
            "1762": {
              "comment": "P18 has definition (is definition of)",
              "formSections": {
                "basic": {
                  "position": 2
                },
                "simpleForm": {
                  "hidden": true
                }
              },
              "viewSections": {
                "basic": {
                  "position": 2
                }
              }
            },
            "1844": {
              "comment": "belongs to -> Collection",
              "formSections": {
                "simpleForm": {
                  "position": 1,
                  "controlsOnInit": 1
                }
              }
            }
          }
        },
        "899": {
          outgoingProperties: {
            63: {
              "comment": "Definition has language",
              formSections: {
                "simpleForm": {
                  "position": 2,
                  hideRemoveBtn: true,
                  required: 1,
                  controlsOnInit: 1,
                },
                "specific": {
                  "position": 2,
                  hideRemoveBtn: true,
                  required: 1,
                  controlsOnInit: 1,
                }
              }
            }
          }
        },
        "898": {
          outgoingProperties: {
            1761: {
              "comment": "has short title",
              formSections: {
                "simpleForm": {
                  "position": 1,
                  controlsOnInit: 1,
                }
              }
            }
          }
        }
      },
      "incomingProperties": {
        "1111": {
          "comment": "has appellation for language",
          "formSections": {
            "basic": {
              "position": 1
            },
            "simpleForm": {
              "position": 1
            }
          },
          "viewSections": {
            "basic": {
              "position": 1
            }
          }
        },
        "1499": {
          "comment": "has to be preferred to",
          "formSections": {
            "specific": {
              "hidden": true
            }
          },
          "viewSections": {
            "metadata": {
              "position": 11
            }
          }
        },
        "1872": {
          "comment": "geov:P? is annotation in",
          "formSections": {
            "specific": {
              "hidden": true // hide it from the fields
            }
          },
          "viewSections": {
            "specific": {
              "hidden": true // hide it from the fields
            }
          }
        },
        "1875": {
          "comment": "Entity is annotated in annotation",
          "formSections": {
            "specific": {
              "hidden": true // hide it from the fields
            }
          },
          "viewSections": {
            "specific": {
              "hidden": true // hide it from the fields
            }
          }
        },
        "1876": {
          "comment": "Entity is mentioned by mentioning",
          "viewSections": {
            "linkedSources": {
              "position": 1
            }
          }
        },
        "1877": {
          "comment": "Source mentions mentioning",
          "viewSections": {
            "linkedEntities": {
              "position": 1
            }
          }
        }
      },
      "outgoingProperties": {
        "72": {
          "comment": "At some time within",
          "formSections": {
            "timeSpan": {
              "position": 1
            }
          },
          "viewSections": {
            "timeSpan": {
              "position": 1
            }
          },
          "isHasTimeSpanShortCut": true
        },
        "152": {
          "comment": "begin of the begin",
          "formSections": {
            "timeSpan": {
              "position": 2
            }
          },
          "viewSections": {
            "timeSpan": {
              "position": 2
            }
          },
          "isHasTimeSpanShortCut": true
        },
        "150": {
          "comment": "end of the begin",
          "formSections": {
            "timeSpan": {
              "position": 3
            }
          },
          "viewSections": {
            "timeSpan": {
              "position": 3
            }
          },
          "isHasTimeSpanShortCut": true
        },
        "151": {
          "comment": "begin of the end",
          "formSections": {
            "timeSpan": {
              "position": 4
            }
          },
          "viewSections": {
            "timeSpan": {
              "position": 4
            }
          },
          "isHasTimeSpanShortCut": true
        },
        "153": {
          "comment": "end of the end",
          "formSections": {
            "timeSpan": {
              "position": 5
            }
          },
          "viewSections": {
            "timeSpan": {
              "position": 5
            }
          },
          "isHasTimeSpanShortCut": true
        },
        "71": {
          "comment": "Ongoing throughout",
          "formSections": {
            "timeSpan": {
              "position": 6
            }
          },
          "viewSections": {
            "timeSpan": {
              "position": 6
            }
          },
          "isHasTimeSpanShortCut": true
        },
        "145": {
          "comment": "during (When)",
          "formSections": {
            "basic": {
              "position": 8
            }
          },
          "viewSections": {
            "basic": {
              "position": 8
            }
          },
          "isHasTimeSpanShortCut": true
        },
        "1499": {
          "comment": "has to be merged with",
          "formSections": {
            "specific": {
              "hidden": true
            }
          },
          "viewSections": {
            "metadata": {
              "position": 11
            }
          }
        },
        "1760": {
          "comment": "has web address (is web addess of) – P16",
          "formSections": {
            "basic": {
              "position": 5,
              "controlsOnInit": 1
            }
          },
          "viewSections": {
            "basic": {
              "position": 5
            }
          }
        },
        "1761": {
          "comment": "has short title",
          "formSections": {
            "basic": {
              "position": 1,
              "controlsOnInit": 1
            }
          },
          "viewSections": {
            "basic": {
              "position": 1
            }
          }
        },
        "1762": {
          "comment": "P18 has definition (is definition of)",
          "formSections": {
            "basic": {
              "position": 2
            },
            "simpleForm": {
              "position": 2
            }
          },
          "viewSections": {
            "basic": {
              "position": 2
            }
          }
        },
        "1763": {
          "comment": "P19 has comment (is comment about)",
          "formSections": {
            "basic": {
              "position": 6
            }
          },
          "viewSections": {
            "basic": {
              "position": 6
            }
          }
        },
        "1842": {
          "comment": "P20 same as URI (same as) -> crm:E42 Identifier",
          "formSections": {
            "metadata": {
              "position": 9
            }
          },
          "viewSections": {
            "metadata": {
              "position": 9
            }
          }
        },
        "1864": {
          "comment": "geov:P? has value version",
          "formSections": {
            "basic": {
              "position": 1,
              "noFieldHeader": true, // hide the field header
              hideRemoveBtn: true,
              required: 1,
              controlsOnInit: 1,
            },
            "simpleForm": {
              "position": 1,
              "noFieldHeader": true,// hide the field header
              hideRemoveBtn: true,
              required: 1,
              controlsOnInit: 1,
            }
          },
          "viewSections": {
            "specific": {
              "hidden": true // hide it from the fields
            }
          }
        }
      },
      "hasTypeSubproperties": {
        "comment": "all subproperties of has type (dfh.api_property.is_has_type_subproperty=true)",
        "formSections": {
          "basic": {
            "position": 3
          }
        },
        "viewSections": {
          "basic": {
            "position": 3
          }
        }
      }
    },

  }

  // static readonly SYS_CONFIC_DIGITALS: SysConfigValue = {
  //   "ontome": {
  //     "optionalOntomeProfiles": [
  //       {
  //         "profilesAvailableByOmProjects": [
  //           6
  //         ]
  //       }
  //     ],
  //     "requiredOntomeProfiles": [
  //       5
  //     ]
  //   },
  //   "classesDefault": {
  //     "viewType": {
  //       "nestedResource": []
  //     },
  //     "formControlType": {
  //       "entity": TrueEnum.true
  //     },
  //     communityVisibilityRange: {toolbox: [true], dataApi: [true], website: [true]},
  //     communityVisibilityDefault: {toolbox: false, dataApi: false, website: false},
  //     projectVisibilityDefault: {dataApi: false, website: false},
  //   },
  //   "classesByBasicType": {
  //     "8": {
  //       "viewType": {
  //         "entityPreview": TrueEnum.true
  //       },
  //       "formControlType": {
  //         "entity": TrueEnum.true
  //       },
  //       communityVisibilityRange: {toolbox: [true], dataApi: [true], website: [true]},
  //       communityVisibilityDefault: {toolbox: true, dataApi: true, website: true},
  //     },
  //     9: {
  //       communityVisibilityRange: {toolbox: [true], dataApi: [true, false], website: [true, false]},
  //       communityVisibilityDefault: {toolbox: true, dataApi: false, website: false},
  //     },
  //     "30": {
  //       "viewType": {
  //         "entityPreview": TrueEnum.true
  //       },
  //       "formControlType": {
  //         "entity": TrueEnum.true
  //       },
  //       communityVisibilityRange: {toolbox: [true], dataApi: [true], website: [true]},
  //       communityVisibilityDefault: {toolbox: true, dataApi: true, website: true}
  //     },
  //     "54": {
  //       "viewType": {
  //         "language": TrueEnum.true
  //       },
  //       "formControlType": {
  //         "language": TrueEnum.true
  //       },
  //       "valueObjectType": {
  //         "language": TrueEnum.true
  //       },
  //       belongsToCategory: {
  //         entities: {showInAddMenu: false}
  //       }
  //     },
  //   },
  //   "classes": {
  //     "40": {
  //       "viewType": {
  //         "appellation": TrueEnum.true
  //       },
  //       "formControlType": {
  //         "appellation": AppellationFormCtrlType.true
  //       },
  //       "valueObjectType": {
  //         "appellation": TrueEnum.true
  //       },
  //       belongsToCategory: {
  //         entities: {showInAddMenu: false}
  //       }
  //     },
  //     "54": {
  //       "viewType": {
  //         "language": TrueEnum.true
  //       },
  //       "formControlType": {
  //         "language": TrueEnum.true
  //       },
  //       "valueObjectType": {
  //         "language": TrueEnum.true
  //       },
  //       belongsToCategory: {
  //         entities: {showInAddMenu: false}
  //       }
  //     },
  //     "218": {
  //       icon: IconType.source,
  //       belongsToCategory: {
  //         sources: {showInAddMenu: false}
  //       }
  //     },
  //     "220": {
  //       icon: IconType.source,
  //       docUrl: 'https://docs.geovistory.com/geovistory-manual/sources/what-is-a-source-in-geovistory/types-of-sources#class-unique-source-object',
  //       belongsToCategory: {
  //         sources: {
  //           showInAddMenu: true,
  //           positionInAddMenu: 10
  //         }
  //       }
  //     },
  //     "339": {
  //       "viewType": {
  //         "appellation": TrueEnum.true
  //       },
  //       "formControlType": {
  //         "appellation": AppellationFormCtrlType.textEditor
  //       },
  //       "valueObjectType": {
  //         "appellation": TrueEnum.true
  //       },
  //       belongsToCategory: {
  //         entities: {showInAddMenu: false}
  //       }
  //     },
  //     "521": {
  //       icon: IconType.value,
  //       "viewType": {
  //         "cell": TrueEnum.true
  //       },
  //       "formControlType": {
  //         "cell": TrueEnum.true
  //       },
  //       "valueObjectType": {
  //         "cell": TrueEnum.true
  //       },
  //       belongsToCategory: {
  //         digitals: {showInAddMenu: false}
  //       }
  //     },
  //     "456": {
  //       "viewType": {
  //         "appellation": TrueEnum.true
  //       },
  //       "formControlType": {
  //         "appellation": AppellationFormCtrlType.textEditor
  //       },
  //       "valueObjectType": {
  //         "appellation": TrueEnum.true
  //       },
  //       belongsToCategory: {
  //         entities: {showInAddMenu: false}
  //       }
  //     },
  //     "784": {
  //       "viewType": {
  //         "langString": TrueEnum.true
  //       },
  //       "formControlType": {
  //         "langString": TrueEnum.true
  //       },
  //       "valueObjectType": {
  //         "langString": TrueEnum.true
  //       },
  //       belongsToCategory: {
  //         entities: {showInAddMenu: false}
  //       }
  //     },
  //     "899": {
  //       icon: IconType.text,
  //       detailPage: TabComponent.text,
  //       belongsToCategory: {
  //         digitals: {
  //           showInAddMenu: true,
  //           positionInAddMenu: 2
  //         }

  //       }
  //     },
  //     "933": {
  //       viewType: {nestedResource: []},
  //       belongsToCategory: {
  //         entities: {showInAddMenu: false}
  //       }
  //     },
  //     "901": {
  //       icon: IconType.text,
  //       detailPage: TabComponent.text,
  //       belongsToCategory: {
  //         digitals: {
  //           showInAddMenu: true,
  //           positionInAddMenu: 1
  //         }
  //       }
  //     },
  //     "898": {
  //       icon: IconType.table,
  //       detailPage: TabComponent.table,
  //       belongsToCategory: {
  //         digitals: {
  //           showInAddMenu: true,
  //           positionInAddMenu: 3
  //         }
  //       }
  //     },
  //     "934": {
  //       viewType: {nestedResource: []},
  //       belongsToCategory: {
  //         entities: {showInAddMenu: false}
  //       }
  //     },
  //     "936": {
  //       "valueObjectType": {},
  //       belongsToCategory: {
  //         digitals: {showInAddMenu: false}
  //       }
  //     },
  //     "935": {
  //       viewType: {nestedResource: []},
  //       belongsToCategory: {
  //         entities: {showInAddMenu: false}
  //       }
  //     },
  //     "657": {
  //       "viewType": {
  //         "langString": TrueEnum.true
  //       },
  //       "formControlType": {
  //         "langString": TrueEnum.true
  //       },
  //       "valueObjectType": {
  //         "langString": TrueEnum.true
  //       },
  //       belongsToCategory: {
  //         entities: {showInAddMenu: false}
  //       }
  //     },
  //   },
  //   "addProperty": [
  //     {
  //       "comment": "Entity is mentioned by mentioning",
  //       "isOutgoing": false,
  //       "wherePkProperty": 1876,
  //       "toSourceClass": {
  //         "whereBasicTypeIn": [8, 30, 9]
  //       }
  //     },
  //     {
  //       "comment": "Entity is annotated by annotation in text",
  //       "isOutgoing": false,
  //       "wherePkProperty": 1875,
  //       "whereFkDomain": 933,
  //       "toSourceClass": {
  //         "whereBasicTypeIn": [8, 30, 9]
  //       }
  //     },
  //     {
  //       "comment": "Entity is annotated by annotation in table",
  //       "isOutgoing": false,
  //       "wherePkProperty": 1875,
  //       "whereFkDomain": 934,
  //       "toSourceClass": {
  //         "whereBasicTypeIn": [8, 30, 9]
  //       }
  //     }
  //   ],
  //   "specialFields": {
  //     "bySourceClass": {
  //       "899": {
  //         outgoingProperties: {
  //           63: {
  //             "comment": "Definition has language",
  //             formSections: {
  //               "simpleForm": {
  //                 "position": 2,
  //                 hideRemoveBtn: true,
  //                 required: 1,
  //                 controlsOnInit: 1,
  //               },
  //               "specific": {
  //                 "position": 2,
  //                 hideRemoveBtn: true,
  //                 required: 1,
  //                 controlsOnInit: 1,
  //               }
  //             }
  //           }
  //         }
  //       },
  //       "898": {
  //         outgoingProperties: {
  //           1761: {
  //             "comment": "has short title",
  //             formSections: {
  //               "simpleForm": {
  //                 "position": 1,
  //                 controlsOnInit: 1,
  //               }
  //             }
  //           }
  //         }
  //       }
  //     },
  //     "outgoingProperties": {
  //       "1864": {
  //         "comment": "geov:P? has value version",
  //         "formSections": {
  //           "basic": {
  //             "position": 1,
  //             "noFieldHeader": true, // hide the field header
  //             hideRemoveBtn: true,
  //             required: 1,
  //             controlsOnInit: 1,
  //           },
  //           "simpleForm": {
  //             "position": 1,
  //             "noFieldHeader": true,// hide the field header
  //             hideRemoveBtn: true,
  //             required: 1,
  //             controlsOnInit: 1,
  //           }
  //         },
  //         "viewSections": {
  //           "specific": {
  //             "hidden": true // hide it from the fields
  //           }
  //         }
  //       }

  //     },
  //     "incomingProperties": {
  //       "1872": {
  //         "comment": "geov:P? is annotation in",
  //         "formSections": {
  //           "specific": {
  //             "hidden": true // hide it from the fields
  //           }
  //         },
  //         "viewSections": {
  //           "specific": {
  //             "hidden": true // hide it from the fields
  //           }
  //         }
  //       },
  //       "1876": {
  //         "comment": "Entity is mentioned by mentioning",
  //         "viewSections": {
  //           "linkedSources": {
  //             "position": 1
  //           }
  //         }
  //       },
  //       "1877": {
  //         "comment": "Source mentions mentioning",
  //         "viewSections": {
  //           "linkedEntities": {
  //             "position": 1
  //           }
  //         }
  //       }
  //     }

  //   }

  // }
}
