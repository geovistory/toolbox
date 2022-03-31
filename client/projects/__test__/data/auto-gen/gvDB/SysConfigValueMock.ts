import {AppellationFormCtrlType} from '../enums/AppellationFormCtrlType';
import {IconType} from '../enums/IconType';
import {TabComponent} from '../enums/TabComponent';
import {TrueEnum} from '../enums/TrueEnum';
import {SysConfigValue} from '@kleiolab/lib-sdk-lb4';

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
            48, 125
          ],
          "restrictedToGvProjects": [
            591,
            375669
          ]
        }
      ],
      "requiredOntomeProfiles": [
        5, 97
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
        "viewType": {
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
        icon: IconType.expression,
        belongsToCategory: {
          sources: {showInAddMenu: false}
        },
      },
      "219": {
        icon: IconType.source,
        // docUrl: 'https://docs.geovistory.com/geovistory-manual/sources/what-is-a-source-in-geovistory/types-of-sources#class-serially-produced-source',
        belongsToCategory: {
          sources: {
            showInAddMenu: true,
            positionInAddMenu: 10
          }
        }
      },
      "220": {
        icon: IconType.source,
        // docUrl: 'https://docs.geovistory.com/geovistory-manual/sources/what-is-a-source-in-geovistory/types-of-sources#class-unique-source-object',
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
            positionInAddMenu: 50
          }
        }
      },
      "234": {
        icon: IconType.source,
        belongsToCategory: {
          sources: {
            showInAddMenu: true,
            positionInAddMenu: 40
          }
        }
      },
      "502": {
        icon: IconType.source,
        "belongsToCategory": {
          "sources": {
            "positionInAddMenu": 20,
            "showInAddMenu": true
          }
        }
      },
      "503": {
        "belongsToCategory": {
          "sources": {
            "showInAddMenu": false
          }
        },
        icon: IconType.section
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
      "635": {
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
        icon: IconType.text,
        detailPage: TabComponent.text,
        belongsToCategory: {
          digitals: {
            showInAddMenu: true,
            positionInAddMenu: 1
          }
        },
        communityVisibilityRange: {
          toolbox: [false, true],
          dataApi: [false, true],
          website: [false, true]
        },
        communityVisibilityDefault: {
          toolbox: false,
          dataApi: false,
          website: false
        }
      },
      "868": {
        "formControlType": {
          "appellationTeEn": TrueEnum.true
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
        },
        communityVisibilityRange: {
          toolbox: [false, true],
          dataApi: [false, true],
          website: [false, true]
        },
        communityVisibilityDefault: {
          toolbox: false,
          dataApi: false,
          website: false
        }
      },
      "899": {
        icon: IconType.text,
        detailPage: TabComponent.text,
        formControlType: {
          textWithLang: TrueEnum.true
        },
        belongsToCategory: {
          digitals: {
            showInAddMenu: false,
          }
        },
        communityVisibilityRange: {
          toolbox: [true],
          dataApi: [true],
          website: [true]
        },
        communityVisibilityDefault: {
          toolbox: true,
          dataApi: true,
          website: true
        }
      },
      "900": {
        icon: IconType.text,
        detailPage: TabComponent.text,
        formControlType: {
          textWithLang: TrueEnum.true
        },
        belongsToCategory: {
          digitals: {
            showInAddMenu: false,
          }
        },
        communityVisibilityRange: {
          toolbox: [false, true],
          dataApi: [false, true],
          website: [false, true]
        },
        communityVisibilityDefault: {
          toolbox: false,
          dataApi: false,
          website: false
        }
      },
      "934": {
        icon: IconType['persistent-item'],
        viewType: {nestedResource: []},
        belongsToCategory: {
          digitals: {showInAddMenu: false}
        },
        communityVisibilityRange: {
          toolbox: [false, true],
          dataApi: [false, true],
          website: [false, true]
        },
        communityVisibilityDefault: {
          toolbox: false,
          dataApi: false,
          website: false
        }
      },
      "933": {
        icon: IconType['persistent-item'],
        viewType: {nestedResource: []},
        belongsToCategory: {
          digitals: {showInAddMenu: false}
        },
        communityVisibilityRange: {
          toolbox: [false, true],
          dataApi: [false, true],
          website: [false, true]
        },
        communityVisibilityDefault: {
          toolbox: false,
          dataApi: false,
          website: false
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
        // "valueObjectType": {},
        belongsToCategory: {
          digitals: {showInAddMenu: false}
        }
      },
    },
    "addProperty": [
      {
        "comment": "add <has appellation> to all subclasses of PeIt (70), TeEn (2) excluding subclasses of Appellation (40), Appellation for Language (365) and Annotation (932) and excluding  Person (21) and excluding value classes",
        "isOutgoing": false,
        "toSourceClass": {
          "whereSubclassOf": [2, 70],
          "whereNotValueObjectType": true,
          "wherePkClassNotIn": [21],
          "whereNotSubclassOf": [40, 365, 932]
        },
        "whereFkDomain": 365,
        "wherePkProperty": 1111
      },
      {
        "comment": "add <has definition> to all subclasses of PeIt (70), TeEn (2) and not subclass of Appellation (40) and not subclass of Annotation (932) and not Mentioning (935), Definition (899), Comment (900)",
        "isOutgoing": true,
        "wherePkProperty": 1762,
        "whereFkRange": 899,
        "toSourceClass": {
          "whereSubclassOf": [2, 70],
          "whereNotSubclassOf": [40, 365, 932],
          "wherePkClassNotIn": [899],
          "whereNotValueObjectType": true,
        }
      },
      {
        "comment": "add <has comment> to all all subclasses of PeIt (70), TeEn (2) excluding subclasses of Appellation (40) and the class Comment (900) and excluding value classes",
        "isOutgoing": true,
        "wherePkProperty": 1763,
        "whereFkRange": 900,
        "toSourceClass": {
          "whereSubclassOf": [2, 70],
          "whereNotSubclassOf": [40],
          "wherePkClassNotIn": [900],
          "whereNotValueObjectType": true,
        }
      },
      {
        "comment": "add CRM Entity <is mentioned in> Mentioning to all subclasses of PeIt (70), TeEn (2) excluding subclasses of Appellation (40), Annotation (932) and Digital (455) and excluding value classes",
        "isOutgoing": false,
        "wherePkProperty": 1876,
        "whereFkDomain": 935,
        "toSourceClass": {
          "whereSubclassOf": [2, 70],
          "whereNotSubclassOf": [40, 455, 932],
          "whereNotValueObjectType": true,
        }
      },
      {
        "comment": "Entity is annotated by annotation in text to all subclasses of PeIt (70), TeEn (2) excluding subclasses of Appellation (40) and Annotation (932) and Digital (455) and excluding value classes",
        "isOutgoing": false,
        "wherePkProperty": 1875,
        "whereFkDomain": 933,
        "toSourceClass": {
          "whereSubclassOf": [2, 70],
          "whereNotValueObjectType": true,
          "whereNotSubclassOf": [40, 455, 932],
        }
      },
      {
        "comment": "Entity is annotated by annotation in table to all subclasses of PeIt (70), TeEn (2) excluding subclasses of Appellation (40) and Annotation (932) and Digital (455) and excluding value classes",
        "isOutgoing": false,
        "wherePkProperty": 1875,
        "whereFkDomain": 934,
        "toSourceClass": {
          "whereSubclassOf": [2, 70],
          "whereNotValueObjectType": true,
          "whereNotSubclassOf": [40, 455, 932],
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
                },
                "simpleForm": {
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
        "785": {
          outgoingProperties: {
            "1864": {
              "comment": "geov:P? has value version",
              "formSections": {
                "basic": {
                  hidden: true
                  // "position": 0,
                  // hideRemoveBtn: true,
                  // "noFieldHeader": true, // hide the field header
                  // controlsOnInit: 1,
                },
                "simpleForm": {
                  hidden: true
                }
              },
              "viewSections": {
                "specific": {
                  "hidden": true // hide it from the fields
                }
              }
            },
            "1761": {
              "comment": "Text has short title",
              formSections: {
                "simpleForm": {
                  "position": 1,
                  controlsOnInit: 1,
                },
                "basic": {
                  "position": 1,
                  controlsOnInit: 1,
                }
              },
              "viewSections": {
                "basic": {
                  "position": 1
                }
              }
            },
            "63": {
              "comment": "Text has language",
              viewSections: {
                "specific": {
                  "position": 2,
                  controlsOnInit: 1,
                }
              }
            }
          },
          incomingProperties: {
            "1762": {
              comment: "is definition of",
              viewSections: {
                specific: {hidden: true},
              },
              formSections: {
                basic: {hidden: true},
                simpleForm: {hidden: true},
              }
            },
            "1763": {
              comment: "is comment about",
              viewSections: {
                specific: {hidden: true},
              },
              formSections: {
                basic: {hidden: true},
                simpleForm: {hidden: true},
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
        "898": {
          outgoingProperties: {
            1761: {
              "comment": "Table has short title",
              formSections: {
                "simpleForm": {
                  "position": 1,
                  controlsOnInit: 1,
                },
                "basic": {
                  "position": 1,
                  controlsOnInit: 1,
                }
              },
              "viewSections": {
                "basic": {
                  "position": 1
                }
              }
            },
            63: {
              "comment": "Table has language",
              viewSections: {
                "specific": {
                  "position": 2,
                  controlsOnInit: 1,
                }
              }
            }
          }
        },
        "899": {
          "outgoingProperties": {
            "1761": {
              "comment": "Definition has short title",
              "formSections": {
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
            "63": {
              "comment": "Definition has language",
              "formSections": {
                "simpleForm": {
                  "position": 2,
                  "hideRemoveBtn": true,
                  "required": 1,
                  "controlsOnInit": 1,
                },
                "specific": {
                  "position": 2,
                  "hideRemoveBtn": true,
                  "required": 1,
                  "controlsOnInit": 1,
                }
              }
            }
          }
        },
        "900": {
          "outgoingProperties": {
            "1761": {
              "comment": "Comment has short title",
              "formSections": {
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
            "63": {
              "comment": "Comment has language",
              "formSections": {
                "simpleForm": {
                  "position": 2,
                  "hideRemoveBtn": true,
                  "required": 1,
                  "controlsOnInit": 1,
                },
                "specific": {
                  "position": 2,
                  "hideRemoveBtn": true,
                  "required": 1,
                  "controlsOnInit": 1,
                }
              }
            }
          }
        },
      },
      "bySourceSuperClass": [
        {
          "pkSuperClass": 455,
          "outgoingProperties": {
            "1762": {
              "comment": "P18 has definition (is definition of)",
              "formSections": {
                "simpleForm": {
                  "hidden": true
                },
                "basic": {
                  "position": 3,
                }
              },
              "viewSections": {
                "basic": {
                  "position": 3
                }
              }
            },
          },
          "incomingProperties": {
            "1111": {
              "comment": "has appellation for language",
              "formSections": {
                "simpleForm": {
                  "hidden": true
                },
                "basic": {
                  "position": 1
                },
              },
              "viewSections": {
                "basic": {
                  "position": 1
                }
              }
            }
          }
        },

        {
          "pkSuperClass": 70,
          "outgoingProperties": {
            "1762": {
              "comment": "P18 has definition (is definition of)",
              "formSections": {
                "basic": {
                  "position": 2,
                  required: 1,
                  controlsOnInit: 1,
                },
                "simpleForm": {
                  "position": 2,
                  required: 1,
                  controlsOnInit: 1,
                }
              },
              "viewSections": {
                "basic": {
                  "position": 2
                }
              }
            },
          },
          "incomingProperties": {
            "1111": {
              "comment": "has appellation for language",
              "formSections": {
                "basic": {
                  "position": 1,
                  controlsOnInit: 1,
                },
                "simpleForm": {
                  "position": 1,
                  controlsOnInit: 1,
                }
              },
              "viewSections": {
                "basic": {
                  "position": 1
                }
              }
            },
          }
        },
      ],
      "incomingProperties": {
        "979": {
          "comment": "Manifestation product type > comprises carriers of > Expression",
          "viewSections": {
            "linkedSources": {
              "position": 1
            }
          }
        },
        "1216": {
          "comment": "Expression > has reproduction > Transcription / Table",
          "viewSections": {
            "linkedSources": {
              "position": 1
            }
          }
        },
        "1305": {
          "comment": "Expression > has server response > Expression",
          "viewSections": {
            "linkedSources": {
              "position": 1
            }
          }
        },
        "1316": {
          "comment": "Item > provides carrier to > Expression",
          "viewSections": {
            "linkedSources": {
              "position": 1
            }
          }
        },
        "1317": {
          "comment": "Expression > has as part > Expression Portion",
          "viewSections": {
            "linkedSources": {
              "position": 1
            }
          }
        },
        "1111": {
          "comment": "has appellation for language",
          "formSections": {
            "basic": {
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
          "comment": "Digital > has annotation > Annotation",
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
            "linkedEntities": {
              "position": 3
            }
          }
        },
        "1876": {
          "comment": "Entity is mentioned by mentioning",
          "formSections": {
            "specific": {
              "hidden": true // hide it from the fields
            }
          },
          "viewSections": {
            "linkedEntities": {
              "position": 2
            }
          }
        },
        "1877": {
          "comment": "Source > mentions > Mentioning",
          "formSections": {
            "specific": {
              "hidden": true // hide it from the fields
            }
          },
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
        "1016": {
          "comment": "Manifestation Singleton > is representative manifestation singleton for > Expression",
          "viewSections": {
            "linkedSources": {
              "position": 1
            }
          }
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
              "position": 2,
            }

          },
          "viewSections": {
            "basic": {
              "position": 2
            }
          }
        },
        "1763": {
          "comment": "has comment > Comment",
          "formSections": {
            "specific": {
              "hidden": true
            },
            "basic": {
              "hidden": true
            },
            "simpleForm": {
              "hidden": true
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
        },
        "1879": {
          "comment": "Table > has value > Table Value",
          "formSections": {
            "specific": {
              "hidden": true
            }
          },
          "viewSections": {
            "specific": {
              "hidden": true
            }
          }
        },
        "1876": {
          "comment": "Mentioning mentions Entity",
          "formSections": {
            "simpleForm": {
              "position": 1
            },
            "specific": {
              "position": 1
            }
          },
          "viewSections": {
            "specific": {
              "position": 1
            }
          }
        },
        "1877": {
          "comment": "Mentioning > is mentioned in > Source",
          "formSections": {
            "simpleForm": {
              "position": 2
            },
            "specific": {
              "position": 2
            }
          },
          "viewSections": {
            "specific": {
              "position": 2
            }
          }
        },
        "1878": {
          "comment": "Mentioning > at position > Reference",
          "formSections": {
            "simpleForm": {
              "position": 3
            },
            "specific": {
              "position": 3
            }
          },
          "viewSections": {
            "specific": {
              "position": 3
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

}
