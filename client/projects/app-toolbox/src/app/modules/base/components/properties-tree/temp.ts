const x: SysConfigValue = {
    "classes": {
        "1": {
            "excludedFromEntities": true
        },
        "40": {
            "viewType": {
                "appellation": "true"
            },
            "formControlType": {
                "appellation": "true"
            },
            "valueObjectType": {
                "appellation": "true"
            },
            "excludedFromEntities": true
        },
        "50": {
            "excludedFromEntities": true
        },
        "51": {
            "formControlType": {
                "place": "true"
            },
            "valueObjectType": {
                "place": "true"
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
                "language": "true"
            },
            "formControlType": {
                "language": "true"
            },
            "valueObjectType": {
                "language": "true"
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
                "timePrimitive": "true"
            },
            "formControlType": {
                "timePrimitive": "true"
            },
            "valueObjectType": {
                "timePrimitive": "true"
            },
            "excludedFromEntities": true
        },
        "339": {
            "viewType": {
                "appellation": "true"
            },
            "formControlType": {
                "appellation": "true"
            },
            "valueObjectType": {
                "appellation": "true"
            },
            "excludedFromEntities": true
        },
        "365": {
            "formControlType": {
                "appellationTeEn": "true"
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
        "657": {
            "viewType": {
                "langString": "true"
            },
            "formControlType": {
                "langString": "true"
            },
            "valueObjectType": {
                "langString": "true"
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
                "langString": "true"
            },
            "formControlType": {
                "langString": "true"
            },
            "valueObjectType": {
                "langString": "true"
            },
            "excludedFromEntities": true
        },
        "785": {
            "viewType": {
                "langString": "true"
            },
            "formControlType": {
                "langString": "true"
            },
            "valueObjectType": {
                "langString": "true"
            },
            "excludedFromEntities": true
        },
        "868": {
            "formControlType": {
                "appellationTeEn": "true"
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
            "comment": "add <has identification> to teEn, peIt and types",
            "isOutgoing": false,
            "toSourceClass": {
                "whereBasicTypeIn": [
                    8,
                    9,
                    30
                ]
            },
            "wherePkProperty": 1782
        },
        {
            "comment": "add <has to be merged with> to a lot of classes",
            "isOutgoing": true,
            "toSourceClass": {
                "whereBasicTypeIn": [
                    8,
                    9,
                    10,
                    30
                ]
            },
            "wherePkProperty": 1499,
            "replaceTargetClassWithSourceClass": true
        }
    ],
    "specialFields": {
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
                    "metadata": {
                        "hidden": true
                    }
                },
                "viewSections": {
                    "metadata": {
                        "position": 11
                    }
                }
            },
            "1782": {
                "comment": "has identification – P18",
                "formSections": {
                    "metadata": {
                        "hidden": true
                    }
                },
                "viewSections": {
                    "metadata": {
                        "position": 9
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
            },
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
                    "basic": {
                        "position": 10
                    }
                },
                "viewSections": {
                    "basic": {
                        "position": 10
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
            "1843": {
                "comment": "has value",
                "formSections": {
                    "simpleForm": {
                        "position": 1
                    },
                    "basic": {
                        "position": 1
                    }
                },
                "viewSections": {
                    "basic": {
                        "position": 1
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
    "classesDefault": {
        "viewType": {
            "nestedResource": []
        },
        "formControlType": {
            "entity": "true"
        }
    },
    "classesByBasicType": {
        "8": {
            "viewType": {
                "entityPreview": "true"
            },
            "formControlType": {
                "entity": "true"
            }
        },
        "30": {
            "viewType": {
                "entityPreview": "true"
            },
            "formControlType": {
                "entity": "true"
            }
        }
    }
}
