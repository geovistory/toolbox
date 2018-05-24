import { ExistenceTime } from "../../../information/components/existence-time";
import { TimePrimitive } from "app/core";
import { TimeLineData } from "../../models/timeline";

/**
 * A person (peIt) with two appellation uses (teEnt) that have its existence times 
 */

export const timeLineData: TimeLineData = {
    rows: [
        {
            label: 'Name: Johannes Jacob Meier Langer Name',
            existenceTime: new ExistenceTime({
                p82a: new TimePrimitive({
                    julianDay: 2394000,
                    duration: '1 year',
                    calendar: 'julian'
                }),
                p81a: new TimePrimitive({
                    julianDay: 2394100,
                    duration: '1 month',
                    calendar: 'julian'
                }),
                p81b: new TimePrimitive({
                    julianDay: 2394700,
                    duration: '1 day',
                    calendar: 'julian'
                }),
                p82b: new TimePrimitive({
                    julianDay: 2394770,
                    duration: '1 month',
                    calendar: 'julian'
                })
            })
        },
        {
            label: 'Name: Hans Meier',
            existenceTime: new ExistenceTime({
                p81a: new TimePrimitive({
                    julianDay: 2395632,
                    duration: '1 day',
                    calendar: 'julian'
                }),
                p81b: new TimePrimitive({
                    julianDay: 2395932,
                    duration: '1 month',
                    calendar: 'gregorian'
                }),
            })
        },
        {
            label: 'Erwerb: Titel',
            existenceTime: new ExistenceTime({
                p81a: new TimePrimitive({
                    julianDay: 2395642,
                    duration: '1 day',
                    calendar: 'julian'
                }),
                p81b: new TimePrimitive({
                    julianDay: 2395982,
                    duration: '1 month',
                    calendar: 'gregorian'
                }),
            })
        }
    ]
}

export const personPeIts = [
    {
        "fk_class": 1,
        "pk_entity_version_concat": "69780_1",
        "pk_entity": 69780,
        "entity_version": 1,
        "notes": "Michael Lang",
        "tmsp_creation": "2018-03-22T16:58:29.760Z",
        "tmsp_last_modification": "2018-03-22T16:58:29.760Z",
        "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
        "is_latest_version": true,
        "is_community_favorite": true,
        "entity_version_project_rels": [
            {
                "pk_entity_version_project_rel": 3674,
                "fk_project": 15,
                "fk_entity": 69780,
                "fk_entity_version": 1,
                "fk_entity_version_concat": "69780_1",
                "is_in_project": true,
                "is_standard_in_project": null,
                "calendar": null,
                "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00"
            }
        ],
        "pi_roles": [
            {
                "fk_property": 1,
                "fk_entity": 69780,
                "fk_temporal_entity": 69782,
                "is_in_project_count": 1,
                "is_standard_in_project_count": 1,
                "community_favorite_calendar": null,
                "pk_entity_version_concat": "69784_1",
                "pk_entity": 69784,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                "is_latest_version": true,
                "is_community_favorite": true,
                "entity_version_project_rels": [
                    {
                        "pk_entity_version_project_rel": 3676,
                        "fk_project": 15,
                        "fk_entity": 69784,
                        "fk_entity_version": 1,
                        "fk_entity_version_concat": "69784_1",
                        "is_in_project": true,
                        "is_standard_in_project": true,
                        "calendar": null,
                        "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00"
                    }
                ],
                "temporal_entity": {
                    "fk_class": 3,
                    "notes": null,
                    "pk_entity_version_concat": "69782_1",
                    "pk_entity": 69782,
                    "entity_version": 1,
                    "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                    "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                    "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                    "is_latest_version": true,
                    "is_community_favorite": true,
                    "entity_version_project_rels": [
                        {
                            "pk_entity_version_project_rel": 3675,
                            "fk_project": 15,
                            "fk_entity": 69782,
                            "fk_entity_version": 1,
                            "fk_entity_version_concat": "69782_1",
                            "is_in_project": true,
                            "is_standard_in_project": null,
                            "calendar": null,
                            "tmsp_last_modification": "2018-03-29T08:11:25.346527+00:00"
                        }
                    ],
                    label: 'Name: Johannes Jacob Meier Langer Name',
                    existenceTime: new ExistenceTime({
                        p82a: new TimePrimitive({
                            julianDay: 2394000,
                            duration: '1 year',
                            calendar: 'julian'
                        }),
                        p81a: new TimePrimitive({
                            julianDay: 2394100,
                            duration: '1 month',
                            calendar: 'julian'
                        }),
                        p81b: new TimePrimitive({
                            julianDay: 2394700,
                            duration: '1 day',
                            calendar: 'julian'
                        }),
                        p82b: new TimePrimitive({
                            julianDay: 2394770,
                            duration: '1 month',
                            calendar: 'julian'
                        })
                    })
                }
            },
            {
                "fk_property": 1,
                "fk_entity": 69780,
                "fk_temporal_entity": 69792,
                "is_in_project_count": 1,
                "is_standard_in_project_count": 0,
                "community_favorite_calendar": null,
                "pk_entity_version_concat": "69794_1",
                "pk_entity": 69794,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                "is_latest_version": true,
                "is_community_favorite": true,
                "entity_version_project_rels": [
                    {
                        "pk_entity_version_project_rel": 3681,
                        "fk_project": 15,
                        "fk_entity": 69794,
                        "fk_entity_version": 1,
                        "fk_entity_version_concat": "69794_1",
                        "is_in_project": true,
                        "is_standard_in_project": false,
                        "calendar": null,
                        "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00"
                    }
                ],
                "temporal_entity": {
                    "fk_class": 3,
                    "notes": null,
                    "pk_entity_version_concat": "69792_1",
                    "pk_entity": 69792,
                    "entity_version": 1,
                    "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                    "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                    "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                    "is_latest_version": true,
                    "is_community_favorite": true,
                    "entity_version_project_rels": [
                        {
                            "pk_entity_version_project_rel": 3680,
                            "fk_project": 15,
                            "fk_entity": 69792,
                            "fk_entity_version": 1,
                            "fk_entity_version_concat": "69792_1",
                            "is_in_project": true,
                            "is_standard_in_project": false,
                            "calendar": null,
                            "tmsp_last_modification": "2018-03-27T16:18:07.743516+00:00"
                        }
                    ],
                    label: 'Name: Hans Meier',
                    existenceTime: new ExistenceTime({
                        p81a: new TimePrimitive({
                            julianDay: 2395632,
                            duration: '1 day',
                            calendar: 'julian'
                        }),
                        p81b: new TimePrimitive({
                            julianDay: 2395932,
                            duration: '1 month',
                            calendar: 'gregorian'
                        }),
                    })
                }
            },
            {
                "fk_property": 1,
                "fk_entity": 69780,
                "fk_temporal_entity": 69792,
                "is_in_project_count": 1,
                "is_standard_in_project_count": 0,
                "community_favorite_calendar": null,
                "pk_entity_version_concat": "69794_1",
                "pk_entity": 69794,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                "is_latest_version": true,
                "is_community_favorite": true,
                "entity_version_project_rels": [
                    {
                        "pk_entity_version_project_rel": 3681,
                        "fk_project": 15,
                        "fk_entity": 69794,
                        "fk_entity_version": 1,
                        "fk_entity_version_concat": "69794_1",
                        "is_in_project": true,
                        "is_standard_in_project": false,
                        "calendar": null,
                        "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00"
                    }
                ],
                "temporal_entity": {
                    "fk_class": 3,
                    "notes": null,
                    "pk_entity_version_concat": "69792_1",
                    "pk_entity": 69792,
                    "entity_version": 1,
                    "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                    "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                    "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                    "is_latest_version": true,
                    "is_community_favorite": true,
                    "entity_version_project_rels": [
                        {
                            "pk_entity_version_project_rel": 3680,
                            "fk_project": 15,
                            "fk_entity": 69792,
                            "fk_entity_version": 1,
                            "fk_entity_version_concat": "69792_1",
                            "is_in_project": true,
                            "is_standard_in_project": false,
                            "calendar": null,
                            "tmsp_last_modification": "2018-03-27T16:18:07.743516+00:00"
                        }
                    ],
                    label: 'Erwerb: Titel',
                    existenceTime: new ExistenceTime({
                        p81a: new TimePrimitive({
                            julianDay: 2395642,
                            duration: '1 day',
                            calendar: 'julian'
                        }),
                        p81b: new TimePrimitive({
                            julianDay: 2395982,
                            duration: '1 month',
                            calendar: 'gregorian'
                        }),
                    })
                }
            },
            {
                "fk_property": 1,
                "fk_entity": 69780,
                "fk_temporal_entity": 69792,
                "is_in_project_count": 1,
                "is_standard_in_project_count": 0,
                "community_favorite_calendar": null,
                "pk_entity_version_concat": "69794_1",
                "pk_entity": 69794,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                "is_latest_version": true,
                "is_community_favorite": true,
                "entity_version_project_rels": [
                    {
                        "pk_entity_version_project_rel": 3681,
                        "fk_project": 15,
                        "fk_entity": 69794,
                        "fk_entity_version": 1,
                        "fk_entity_version_concat": "69794_1",
                        "is_in_project": true,
                        "is_standard_in_project": false,
                        "calendar": null,
                        "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00"
                    }
                ],
                "temporal_entity": {
                    "fk_class": 3,
                    "notes": null,
                    "pk_entity_version_concat": "69792_1",
                    "pk_entity": 69792,
                    "entity_version": 1,
                    "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                    "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                    "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                    "is_latest_version": true,
                    "is_community_favorite": true,
                    "entity_version_project_rels": [
                        {
                            "pk_entity_version_project_rel": 3680,
                            "fk_project": 15,
                            "fk_entity": 69792,
                            "fk_entity_version": 1,
                            "fk_entity_version_concat": "69792_1",
                            "is_in_project": true,
                            "is_standard_in_project": false,
                            "calendar": null,
                            "tmsp_last_modification": "2018-03-27T16:18:07.743516+00:00"
                        }
                    ],
                    label: 'Erwerb: Titel',
                    existenceTime: new ExistenceTime({
                        p81a: new TimePrimitive({
                            julianDay: 2395642,
                            duration: '1 day',
                            calendar: 'julian'
                        }),
                        p81b: new TimePrimitive({
                            julianDay: 2395982,
                            duration: '1 month',
                            calendar: 'gregorian'
                        }),
                    })
                }
            },
            {
                "fk_property": 1,
                "fk_entity": 69780,
                "fk_temporal_entity": 69792,
                "is_in_project_count": 1,
                "is_standard_in_project_count": 0,
                "community_favorite_calendar": null,
                "pk_entity_version_concat": "69794_1",
                "pk_entity": 69794,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                "is_latest_version": true,
                "is_community_favorite": true,
                "entity_version_project_rels": [
                    {
                        "pk_entity_version_project_rel": 3681,
                        "fk_project": 15,
                        "fk_entity": 69794,
                        "fk_entity_version": 1,
                        "fk_entity_version_concat": "69794_1",
                        "is_in_project": true,
                        "is_standard_in_project": false,
                        "calendar": null,
                        "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00"
                    }
                ],
                "temporal_entity": {
                    "fk_class": 3,
                    "notes": null,
                    "pk_entity_version_concat": "69792_1",
                    "pk_entity": 69792,
                    "entity_version": 1,
                    "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                    "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                    "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                    "is_latest_version": true,
                    "is_community_favorite": true,
                    "entity_version_project_rels": [
                        {
                            "pk_entity_version_project_rel": 3680,
                            "fk_project": 15,
                            "fk_entity": 69792,
                            "fk_entity_version": 1,
                            "fk_entity_version_concat": "69792_1",
                            "is_in_project": true,
                            "is_standard_in_project": false,
                            "calendar": null,
                            "tmsp_last_modification": "2018-03-27T16:18:07.743516+00:00"
                        }
                    ],
                    label: 'Erwerb: Titel',
                    existenceTime: new ExistenceTime({
                        p81a: new TimePrimitive({
                            julianDay: 2395642,
                            duration: '1 day',
                            calendar: 'julian'
                        }),
                        p81b: new TimePrimitive({
                            julianDay: 2395982,
                            duration: '1 month',
                            calendar: 'gregorian'
                        }),
                    })
                }
            },
            {
                "fk_property": 1,
                "fk_entity": 69780,
                "fk_temporal_entity": 69792,
                "is_in_project_count": 1,
                "is_standard_in_project_count": 0,
                "community_favorite_calendar": null,
                "pk_entity_version_concat": "69794_1",
                "pk_entity": 69794,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                "is_latest_version": true,
                "is_community_favorite": true,
                "entity_version_project_rels": [
                    {
                        "pk_entity_version_project_rel": 3681,
                        "fk_project": 15,
                        "fk_entity": 69794,
                        "fk_entity_version": 1,
                        "fk_entity_version_concat": "69794_1",
                        "is_in_project": true,
                        "is_standard_in_project": false,
                        "calendar": null,
                        "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00"
                    }
                ],
                "temporal_entity": {
                    "fk_class": 3,
                    "notes": null,
                    "pk_entity_version_concat": "69792_1",
                    "pk_entity": 69792,
                    "entity_version": 1,
                    "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                    "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                    "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                    "is_latest_version": true,
                    "is_community_favorite": true,
                    "entity_version_project_rels": [
                        {
                            "pk_entity_version_project_rel": 3680,
                            "fk_project": 15,
                            "fk_entity": 69792,
                            "fk_entity_version": 1,
                            "fk_entity_version_concat": "69792_1",
                            "is_in_project": true,
                            "is_standard_in_project": false,
                            "calendar": null,
                            "tmsp_last_modification": "2018-03-27T16:18:07.743516+00:00"
                        }
                    ],
                    label: 'Erwerb: Titel',
                    existenceTime: new ExistenceTime({
                        p81a: new TimePrimitive({
                            julianDay: 2395642,
                            duration: '1 day',
                            calendar: 'julian'
                        }),
                        p81b: new TimePrimitive({
                            julianDay: 2395982,
                            duration: '1 month',
                            calendar: 'gregorian'
                        }),
                    })
                }
            },
            {
                "fk_property": 1,
                "fk_entity": 69780,
                "fk_temporal_entity": 69792,
                "is_in_project_count": 1,
                "is_standard_in_project_count": 0,
                "community_favorite_calendar": null,
                "pk_entity_version_concat": "69794_1",
                "pk_entity": 69794,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                "is_latest_version": true,
                "is_community_favorite": true,
                "entity_version_project_rels": [
                    {
                        "pk_entity_version_project_rel": 3681,
                        "fk_project": 15,
                        "fk_entity": 69794,
                        "fk_entity_version": 1,
                        "fk_entity_version_concat": "69794_1",
                        "is_in_project": true,
                        "is_standard_in_project": false,
                        "calendar": null,
                        "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00"
                    }
                ],
                "temporal_entity": {
                    "fk_class": 3,
                    "notes": null,
                    "pk_entity_version_concat": "69792_1",
                    "pk_entity": 69792,
                    "entity_version": 1,
                    "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                    "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                    "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                    "is_latest_version": true,
                    "is_community_favorite": true,
                    "entity_version_project_rels": [
                        {
                            "pk_entity_version_project_rel": 3680,
                            "fk_project": 15,
                            "fk_entity": 69792,
                            "fk_entity_version": 1,
                            "fk_entity_version_concat": "69792_1",
                            "is_in_project": true,
                            "is_standard_in_project": false,
                            "calendar": null,
                            "tmsp_last_modification": "2018-03-27T16:18:07.743516+00:00"
                        }
                    ],
                    label: 'Erwerb: Titel',
                    existenceTime: new ExistenceTime({
                        p81a: new TimePrimitive({
                            julianDay: 2395642,
                            duration: '1 day',
                            calendar: 'julian'
                        }),
                        p81b: new TimePrimitive({
                            julianDay: 2395982,
                            duration: '1 month',
                            calendar: 'gregorian'
                        }),
                    })
                }
            },
            {
                "fk_property": 1,
                "fk_entity": 69780,
                "fk_temporal_entity": 69792,
                "is_in_project_count": 1,
                "is_standard_in_project_count": 0,
                "community_favorite_calendar": null,
                "pk_entity_version_concat": "69794_1",
                "pk_entity": 69794,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                "is_latest_version": true,
                "is_community_favorite": true,
                "entity_version_project_rels": [
                    {
                        "pk_entity_version_project_rel": 3681,
                        "fk_project": 15,
                        "fk_entity": 69794,
                        "fk_entity_version": 1,
                        "fk_entity_version_concat": "69794_1",
                        "is_in_project": true,
                        "is_standard_in_project": false,
                        "calendar": null,
                        "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00"
                    }
                ],
                "temporal_entity": {
                    "fk_class": 3,
                    "notes": null,
                    "pk_entity_version_concat": "69792_1",
                    "pk_entity": 69792,
                    "entity_version": 1,
                    "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                    "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                    "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                    "is_latest_version": true,
                    "is_community_favorite": true,
                    "entity_version_project_rels": [
                        {
                            "pk_entity_version_project_rel": 3680,
                            "fk_project": 15,
                            "fk_entity": 69792,
                            "fk_entity_version": 1,
                            "fk_entity_version_concat": "69792_1",
                            "is_in_project": true,
                            "is_standard_in_project": false,
                            "calendar": null,
                            "tmsp_last_modification": "2018-03-27T16:18:07.743516+00:00"
                        }
                    ],
                    label: 'Erwerb: Titel',
                    existenceTime: new ExistenceTime({
                        p81a: new TimePrimitive({
                            julianDay: 2395642,
                            duration: '1 day',
                            calendar: 'julian'
                        }),
                        p81b: new TimePrimitive({
                            julianDay: 2395982,
                            duration: '1 month',
                            calendar: 'gregorian'
                        }),
                    })
                }
            },
            {
                "fk_property": 1,
                "fk_entity": 69780,
                "fk_temporal_entity": 69792,
                "is_in_project_count": 1,
                "is_standard_in_project_count": 0,
                "community_favorite_calendar": null,
                "pk_entity_version_concat": "69794_1",
                "pk_entity": 69794,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                "is_latest_version": true,
                "is_community_favorite": true,
                "entity_version_project_rels": [
                    {
                        "pk_entity_version_project_rel": 3681,
                        "fk_project": 15,
                        "fk_entity": 69794,
                        "fk_entity_version": 1,
                        "fk_entity_version_concat": "69794_1",
                        "is_in_project": true,
                        "is_standard_in_project": false,
                        "calendar": null,
                        "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00"
                    }
                ],
                "temporal_entity": {
                    "fk_class": 3,
                    "notes": null,
                    "pk_entity_version_concat": "69792_1",
                    "pk_entity": 69792,
                    "entity_version": 1,
                    "tmsp_creation": "2018-03-22T16:58:29.760689+00:00",
                    "tmsp_last_modification": "2018-03-22T16:58:29.760689+00:00",
                    "sys_period": "[\"2018-03-22 16:58:29.760689+00\",)",
                    "is_latest_version": true,
                    "is_community_favorite": true,
                    "entity_version_project_rels": [
                        {
                            "pk_entity_version_project_rel": 3680,
                            "fk_project": 15,
                            "fk_entity": 69792,
                            "fk_entity_version": 1,
                            "fk_entity_version_concat": "69792_1",
                            "is_in_project": true,
                            "is_standard_in_project": false,
                            "calendar": null,
                            "tmsp_last_modification": "2018-03-27T16:18:07.743516+00:00"
                        }
                    ],
                    label: 'Erwerb: Titel',
                    existenceTime: new ExistenceTime({
                        p81a: new TimePrimitive({
                            julianDay: 2395642,
                            duration: '1 day',
                            calendar: 'julian'
                        }),
                        p81b: new TimePrimitive({
                            julianDay: 2395982,
                            duration: '1 month',
                            calendar: 'gregorian'
                        }),
                    })
                }
            }
        ]
    }
]
