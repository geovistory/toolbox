import {TrueEnum} from '../../../../models/enums/TrueEnum';
import {SysConfigValue} from '../../../../models/sys-config/sys-config-value.model';

export class SysConfigValueMock {
  static readonly SYS_CONFIC_VALID: SysConfigValue = {
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
    },
    "classesByBasicType": {
      "8": {
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
        communityVisibilityRange: {toolbox: [true], dataApi: [true, false], website: [true, false]},
        communityVisibilityDefault: {toolbox: true, dataApi: false, website: false},
      },
      "30": {
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
        "excludedFromEntities": true
      },
      "40": {
        "viewType": {
          "appellation": TrueEnum.true
        },
        "formControlType": {
          "appellation": TrueEnum.true
        },
        "valueObjectType": {
          "appellation": TrueEnum.true
        },
        "excludedFromEntities": true
      },
      "50": {
        "excludedFromEntities": true
      },
      "51": {
        "formControlType": {
          "place": TrueEnum.true
        },
        "valueObjectType": {
          "place": TrueEnum.true
        },
        "excludedFromEntities": true
      },
      "52": {
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
        "excludedFromEntities": true
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
        "excludedFromEntities": true
      },
      "70": {
        "excludedFromEntities": true
      },
      "218": {
        "excludedFromEntities": true
      },
      "335": {
        "viewType": {
          "timePrimitive": TrueEnum.true
        },
        "formControlType": {
          "timePrimitive": TrueEnum.true
        },
        "valueObjectType": {
          "timePrimitive": TrueEnum.true
        },
        "excludedFromEntities": true
      },
      "339": {
        "viewType": {
          "appellation": TrueEnum.true
        },
        "formControlType": {
          "appellation": TrueEnum.true
        },
        "valueObjectType": {
          "appellation": TrueEnum.true
        },
        "excludedFromEntities": true
      },
      "365": {
        "formControlType": {
          "appellationTeEn": TrueEnum.true
        }
      },
      "445": {
        "excludedFromEntities": true
      },
      "454": {
        "excludedFromEntities": true
      },
      "455": {
        "excludedFromEntities": true
      },
      "456": {
        "excludedFromEntities": true
      },
      "457": {
        "excludedFromEntities": true
      },
      "518": {
        "excludedFromEntities": true
      },
      "521": {
        "excludedFromEntities": true
      },
      635: {
        communityVisibilityRange: {toolbox: [false], dataApi: [false], website: [false]},
        communityVisibilityDefault: {toolbox: false, dataApi: false, website: false},
      },
      "657": {
        "viewType": {
          "langString": TrueEnum.true
        },
        "formControlType": {
          "langString": TrueEnum.true
        },
        "valueObjectType": {
          "langString": TrueEnum.true
        },
        "excludedFromEntities": true
      },

      "689": {
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
        "excludedFromEntities": true
      },
      "707": {
        "excludedFromEntities": true
      },
      "709": {
        "excludedFromEntities": true
      },
      "713": {
        "excludedFromEntities": true
      },
      "716": {
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
        "excludedFromEntities": true
      },
      "717": {
        "excludedFromEntities": true
      },
      "783": {
        "excludedFromEntities": true
      },
      "784": {
        "viewType": {
          "langString": TrueEnum.true
        },
        "formControlType": {
          "langString": TrueEnum.true
        },
        "valueObjectType": {
          "langString": TrueEnum.true
        },
        "excludedFromEntities": true
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
        "excludedFromEntities": true
      },
      "868": {
        "formControlType": {
          "appellationTeEn": TrueEnum.true
        }
      }
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
          "wherePkClassNotIn": [
            870,
            783
          ]
        },
        "wherePkProperty": 1762
      },
      {
        "comment": "add <has time span> to all teEn",
        "isOutgoing": true,
        "toSourceClass": {
          "whereBasicTypeIn": [
            9
          ]
        },
        "wherePkProperty": 4
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
        }
      },
      "outgoingProperties": {
        "4": {
          "comment": "has time-span (When)",
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
