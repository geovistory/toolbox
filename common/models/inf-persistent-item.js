'use strict';

const Promise = require('bluebird');
const Config = require('../config/Config');
const _ = require('lodash');
var FlatObjectQueryBuilder = require('../classes/FlatObjectQueryBuilder');
const helpers = require('../helpers');

module.exports = function(InfPersistentItem) {
  InfPersistentItem.findOrCreateInfPersistentItems = function(
    pk_project,
    items,
    ctx
  ) {
    return new Promise((resolve, reject) => {
      const promiseArray = items.map((item, i) => {
        const context = {
          ...ctx,
          req: {
            ...ctx.req,
            body: {
              ...ctx.req.body[i],
            },
          },
        };

        return InfPersistentItem.findOrCreatePeIt(pk_project, item, context);
      });
      Promise.map(promiseArray, promise => promise)
        .catch(err => reject(err))
        .then(res => {
          return resolve(_.flatten(res));
        });
    });
  };

  InfPersistentItem.findOrCreatePeIt = function(pkProject, data, ctx, cb) {
    return new Promise((resolve, reject) => {
      const dataObject = {
        pk_entity: data.pk_entity,
        notes: data.notes,
        fk_class: data.fk_class,
      };

      let requestedPeIt;

      if (ctx && ctx.req && ctx.req.body) {
        requestedPeIt = ctx.req.body;
      } else {
        requestedPeIt = data;
      }

      // Add F2 Expression, if this is a F4 Manifestation Singleton
      if (requestedPeIt.fk_class == 220) {
        requestedPeIt.domain_entity_associations = [
          ...(requestedPeIt.domain_entity_associations || []),
          { fk_property: 1016, range_pe_it: { fk_class: 218 } },
        ];
      }
      // Add F2 Expression, if this is a F3 Manifestation Product Type
      else if (requestedPeIt.fk_class == 219) {
        requestedPeIt.range_entity_associations = [
          ...(requestedPeIt.range_entity_associations || []),
          { fk_property: 979, domain_pe_it: { fk_class: 218 } },
        ];
      }
      // Add F2 Expression, if this is a F5 Item
      else if (requestedPeIt.fk_class == 221) {
        requestedPeIt.range_entity_associations = [
          ...(requestedPeIt.range_entity_associations || []),
          { fk_property: 1316, domain_pe_it: { fk_class: 218 } },
        ];
      }
      // Add F2 Expression, if this is a geovC4 Web Request
      else if (requestedPeIt.fk_class == 502) {
        requestedPeIt.range_entity_associations = [
          ...(requestedPeIt.range_entity_associations || []),
          { fk_property: 1305, domain_pe_it: { fk_class: 218 } },
        ];
      }

      const ctxWithoutBody = _.omit(ctx, ['req.body']);

      InfPersistentItem._findOrCreatePeIt(
        InfPersistentItem,
        pkProject,
        dataObject,
        ctxWithoutBody
      )
        .then(resultingEntities => {
          // pick first item of array
          const resultingEntity = resultingEntities[0];
          const res = helpers.toObject(resultingEntity);

          // Array of Promises
          const promiseArray = [];

          /******************************************
           * pi-roles
           ******************************************/
          if (requestedPeIt.pi_roles) {
            // prepare parameters
            const InfRole = InfPersistentItem.app.models.InfRole;

            //… filter roles that are truthy (not null), iterate over them,
            // return the promise that the PeIt will be
            // returned together with all nested items
            const promise = Promise.map(
              requestedPeIt.pi_roles.filter(role => role),
              role => {
                // use the pk_entity from the created peIt to set the fk_entity of the role
                role.fk_entity = resultingEntity.pk_entity;
                // find or create the teEnt and the role pointing to the teEnt
                return InfRole.findOrCreateInfRole(
                  pkProject,
                  role,
                  ctxWithoutBody
                );
              }
            )
              .then(roles => {
                //attach the roles to peit.pi_roles
                res.pi_roles = [];
                for (var i = 0; i < roles.length; i++) {
                  const role = roles[i];
                  if (role && role[0]) {
                    res.pi_roles.push(role[0]);
                  }
                }
                return true;
              })
              .catch(err => {
                reject(err);
              });

            // add promise for pi_roles
            promiseArray.push(promise);
          }

          /******************************************
           * text_properties
           ******************************************/
          if (requestedPeIt.text_properties) {
            // prepare parameters
            const InfTextProperty =
              InfPersistentItem.app.models.InfTextProperty;

            //… filter items that are truthy (not null), iterate over them,
            // return the promise that the PeIt will be
            // returned together with all nested items
            const promise = Promise.map(
              requestedPeIt.text_properties.filter(item => item),
              item => {
                // use the pk_entity from the created peIt to set the fk_concerned_entity of the item
                item.fk_concerned_entity = resultingEntity.pk_entity;
                // find or create the item
                return InfTextProperty.findOrCreateInfTextProperty(
                  pkProject,
                  item,
                  ctxWithoutBody
                );
              }
            )
              .then(items => {
                //attach the items to peit.text_properties
                res.text_properties = [];
                for (var i = 0; i < items.length; i++) {
                  const item = items[i];
                  if (item && item[0]) {
                    res.text_properties.push(item[0]);
                  }
                }
                return true;
              })
              .catch(err => {
                reject(err);
              });

            // add promise for text properties
            promiseArray.push(promise);
          }

          /******************************************
           * domain_entity_associations
           ******************************************/
          if (requestedPeIt.domain_entity_associations) {
            // prepare parameters
            const InfEntityAssociation =
              InfPersistentItem.app.models.InfEntityAssociation;

            //… filter items that are truthy (not null), iterate over them,
            // return the promise that the PeIt will be
            // returned together with all nested items
            const promise = Promise.map(
              requestedPeIt.domain_entity_associations.filter(item => item),
              item => {
                // use the pk_entity from the created peIt to set the fk_info_domain of the item
                item.fk_info_domain = resultingEntity.pk_entity;
                // find or create the item
                return InfEntityAssociation.findOrCreateInfEntityAssociation(
                  pkProject,
                  item,
                  ctxWithoutBody
                );
              }
            )
              .then(items => {
                //attach the items to peit.domain_entity_associations
                res.domain_entity_associations = [];
                for (var i = 0; i < items.length; i++) {
                  const item = items[i];
                  if (item && item[0]) {
                    res.domain_entity_associations.push(item[0]);
                  }
                }
                return true;
              })
              .catch(err => {
                reject(err);
              });

            // add promise for text properties
            promiseArray.push(promise);
          }

          /******************************************
           * range_entity_associations
           ******************************************/
          if (requestedPeIt.range_entity_associations) {
            // prepare parameters
            const InfEntityAssociation =
              InfPersistentItem.app.models.InfEntityAssociation;

            //… filter items that are truthy (not null), iterate over them,
            // return the promise that the PeIt will be
            // returned together with all nested items
            const promise = Promise.map(
              requestedPeIt.range_entity_associations.filter(item => item),
              item => {
                // use the pk_entity from the created peIt to set the fk_info_range of the item
                item.fk_info_range = resultingEntity.pk_entity;
                // find or create the item
                return InfEntityAssociation.findOrCreateInfEntityAssociation(
                  pkProject,
                  item,
                  ctxWithoutBody
                );
              }
            )
              .then(items => {
                //attach the items to peit.range_entity_associations
                res.range_entity_associations = [];
                for (var i = 0; i < items.length; i++) {
                  const item = items[i];
                  if (item && item[0]) {
                    res.range_entity_associations.push(item[0]);
                  }
                }
                return true;
              })
              .catch(err => {
                reject(err);
              });

            // add promise for text properties
            promiseArray.push(promise);
          }

          if (promiseArray.length === 0) return resolve([res]);
          else
            return Promise.map(promiseArray, promise => promise).then(() => {
              resolve([res]);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  /**
   * nestedObjectOfProject - get a rich object of the PeIt with all its
   * roles > temporal entities > roles > PeIts
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the persistent item
   */
  InfPersistentItem.nestedObjectOfProject = function(pkProject, pkEntity, cb) {
    let filter = {
      where: ['pk_entity', '=', pkEntity],
      include: InfPersistentItem.getIncludeObject(true, pkProject),
    };

    return InfPersistentItem.findComplex(filter, cb);
  };

  InfPersistentItem.nestedObjectOfRepo = function(pkEntity, cb) {
    const filter = {
      /** Select persistent item by pk_entity … */
      where: ['pk_entity', '=', pkEntity],
      orderBy: [
        {
          pk_entity: 'asc',
        },
      ],
      include: {
        dfh_class: {
          $relation: {
            name: 'dfh_class',
            joinType: 'inner join',
            orderBy: [{ pk_entity: 'asc' }],
          },
        },
        /** include all roles … */
        pi_roles: {
          $relation: {
            name: 'pi_roles',
            joinType: 'left join',
            orderBy: [{ pk_entity: 'asc' }],
          },

          /** include the temporal_entity of the role */
          temporal_entity: {
            $relation: {
              name: 'temporal_entity',
              joinType: 'inner join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
            te_roles: {
              $relation: {
                name: 'te_roles',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
              language: {
                $relation: {
                  name: 'language',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
              },
              appellation: {
                $relation: {
                  name: 'appellation',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
              },
              time_primitive: {
                $relation: {
                  name: 'time_primitive',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
              },
              place: {
                $relation: {
                  name: 'place',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    };

    return InfPersistentItem.findComplex(filter, cb);
  };

  /**
   * Internal function to get graphs of project or repo version
   * graphs - get a PeIt with all its roles
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the persistent item
   */
  InfPersistentItem.graphs = function(ofProject, projectId, pkEntities, cb) {
    const filter = {
      where: ['pk_entity', 'IN', pkEntities],
      include: InfPersistentItem.getGraphIncludeObject(ofProject, projectId),
    };

    return InfPersistentItem.findComplex(filter, cb);
  };

  /**
   * Remote method to get graphs of project version
   * graphs - get a PeIt with all its roles
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the persistent item
   */
  InfPersistentItem.graphsOfProject = function(pkProject, pkEntities, cb) {
    const ofProject = true;
    return InfPersistentItem.graphs(ofProject, pkProject, pkEntities, cb);
  };

  /**
   * Remote method to get graphs of repo version
   * graphs - get a PeIt with all its roles
   *
   * @param  {number} pkEntity  pk_entity of the persistent item
   */
  InfPersistentItem.graphsOfRepo = function(pkEntities, cb) {
    const ofProject = false;
    const pkProject = undefined;
    return InfPersistentItem.graphs(ofProject, pkProject, pkEntities, cb);
  };

  /**
   * Internal function to create a include object of
   * a filter object for findComplex()
   *
   * It includes everything, that is not better requested by itself.
   *
   * It includes relations from the persistent items
   * - roles
  //  * - domain_entity_associations
  //  * - range_entity_associations
   *
   * It includes associated values
   * - text properties
   *
   * It does not include related
   * - persistent items
   * - temporal entities
   * - classes
   * ...since those can be requested and cached alone
   *
   * Usage: add the returned object to the include property of a persistent item relation
   * of findComplex() filter, e.g.:
   * {
   *    ...
   *    include: InfPersistentItem.getIncludeObject(true, 123)
   * }
   *
   * @param ofProject {boolean}
   * @param project {number}
   * @returns include object of findComplex filter
   */
  InfPersistentItem.getGraphIncludeObject = function(ofProject, pkProject) {
    let projectJoin = {};

    // if a pkProject is provided, create the relation
    if (pkProject) {
      // get the join object. If ofProject is false, the join will be a left join.
      projectJoin = {
        entity_version_project_rels: InfPersistentItem.app.models.ProInfoProjRel.getJoinObject(
          ofProject,
          pkProject
        ),
      };
    }

    return {
      ...projectJoin,
      // domain_entity_associations: {
      //   $relation: {
      //     name: "domain_entity_associations",
      //     joinType: "left join",
      //     "orderBy": [{ "pk_entity": "asc" }]
      //   },
      //   ...projectJoin,
      // },
      // range_entity_associations: {
      //   $relation: {
      //     name: "range_entity_associations",
      //     joinType: "left join",
      //     "orderBy": [{ "pk_entity": "asc" }]
      //   },
      //   ...projectJoin,
      // },
      pi_roles: {
        $relation: {
          name: 'pi_roles',
          joinType: 'left join',
        },
        ...projectJoin,
      },
    };
  };

  /**
   * Internal function to create the include property of
   * a filter object for findComplex()
   *
   * Usage: add the returned object to the include property of a persistent item relation
   * of findComplex() filter, e.g.:
   * {
   *    ...
   *    include: InfPersistentItem.getIncludeObject(true, 123)
   * }
   *
   * @param ofProject {boolean}
   * @param project {number}
   * @returns include object of findComplex filter
   */
  InfPersistentItem.getIncludeObject = function(ofProject, pkProject) {
    let projectJoin = {};

    // if a pkProject is provided, create the relation
    if (pkProject) {
      // get the join object. If ofProject is false, the join will be a left join.
      projectJoin = {
        entity_version_project_rels: InfPersistentItem.app.models.ProInfoProjRel.getJoinObject(
          ofProject,
          pkProject
        ),
      };
    }

    return {
      ...projectJoin,
      // "dfh_class": {
      //   "$relation": {
      //     "name": "dfh_class",
      //     "joinType": "inner join",
      //     "orderBy": [{ "pk_entity": "asc" }]
      //   }
      // },

      pi_roles: {
        $relation: {
          name: 'pi_roles',
          joinType: 'left join',
        },
        ...projectJoin,
        temporal_entity: {
          $relation: {
            name: 'temporal_entity',
            joinType: 'inner join',
            // where: ['fk_class', '=', 2],
            orderBy: [
              {
                pk_entity: 'asc',
              },
            ],
          },
          ...projectJoin,
          te_roles: {
            $relation: {
              name: 'te_roles',
              joinType: 'inner join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
            ...projectJoin,
            appellation: {
              $relation: {
                name: 'appellation',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
            },
            language: {
              $relation: {
                name: 'language',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
            },
            time_primitive: {
              $relation: {
                name: 'time_primitive',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
            },
            place: {
              $relation: {
                name: 'place',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
            },
            /**
             * this is to get the remotely related geo information from
             * te_role
             *  -> persistent_item
             *    -> pi_roles
             *      -> temporal_entity (Presence E93)
             *        -> te_roles
             *          -> place, time_primitive
             */
            persistent_item: {
              $relation: {
                name: 'persistent_item',
                joinType: 'left join',
              },
              pi_roles: {
                $relation: {
                  name: 'pi_roles',
                  joinType: 'inner join',
                },
                ...projectJoin,
                temporal_entity: {
                  $relation: {
                    name: 'temporal_entity',
                    joinType: 'inner join',
                    where: ['fk_class', 'IN', [84]], // Presence – E93
                  },
                  te_roles: {
                    $relation: {
                      name: 'te_roles',
                      joinType: 'inner join',
                      where: [
                        'fk_property',
                        'IN',
                        [148, 71, 72, 150, 151, 152, 153],
                      ], // Properties leading to place or time_primitive
                    },
                    ...projectJoin,
                    place: {
                      $relation: {
                        name: 'place',
                        joinType: 'left join',
                      },
                    },
                    time_primitive: {
                      $relation: {
                        name: 'time_primitive',
                        joinType: 'left join',
                      },
                    },
                  },
                },
              },
            },
          },
          ingoing_roles: {
            $relation: {
              name: 'ingoing_roles',
              joinType: 'left join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
            ...projectJoin,
          },
        },
      },
      domain_entity_associations: {
        $relation: {
          name: 'domain_entity_associations',
          joinType: 'left join',
          orderBy: [{ pk_entity: 'asc' }],
        },
        ...projectJoin,
        range_pe_it: {
          $relation: {
            name: 'range_pe_it',
            joinType: 'inner join',
            orderBy: [{ pk_entity: 'asc' }],
          },
          pi_roles: {
            $relation: {
              name: 'pi_roles',
              joinType: 'left join',
            },
            ...projectJoin,
            temporal_entity: {
              $relation: {
                name: 'temporal_entity',
                joinType: 'inner join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
              ...projectJoin,
              te_roles: {
                $relation: {
                  name: 'te_roles',
                  joinType: 'inner join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
                ...projectJoin,
                appellation: {
                  $relation: {
                    name: 'appellation',
                    joinType: 'left join',
                    orderBy: [
                      {
                        pk_entity: 'asc',
                      },
                    ],
                  },
                },
                language: {
                  $relation: {
                    name: 'language',
                    joinType: 'left join',
                    orderBy: [
                      {
                        pk_entity: 'asc',
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      text_properties: {
        $relation: {
          name: 'text_properties',
          joinType: 'left join',
          orderBy: [{ pk_entity: 'asc' }],
        },
        ...projectJoin,
        language: {
          $relation: {
            name: 'language',
            joinType: 'left join',
            orderBy: [
              {
                pk_entity: 'asc',
              },
            ],
          },
        },
      },
    };
  };

  /**
   * Query instances of E55 Type
   *
   * Where
   *	- types are related to the given namespace
   *	- types are in given project
   *	- types are types of the given typed_class (where class is domain of a property where property is inherited from has_type pk=2 and range is class)
   *
   * Eager loading
   *  - The appellations of given language
   *  - TODO: The entity_associations of property "has broader term" used for hierarchy
   *
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  // InfPersistentItem.typesOfNamespaceClassAndProject = function (pk_namespace, pk_project, pk_typed_class, cb) {

  //   // get the pk_property of the property leading from the typed class to the type class
  //   // E.g. get the pk_property of "has geographical place type – histP8" for the pk_class of "histC8 Geographical Place"
  //   const pkProperty = Config.PK_CLASS_PK_HAS_TYPE_MAP[pk_typed_class] ? Config.PK_CLASS_PK_HAS_TYPE_MAP[pk_typed_class] : -1;

  //   const innerJoinThisProject = {
  //     "$relation": {
  //       "name": "entity_version_project_rels",
  //       "joinType": "inner join",
  //       "select": {
  //         include: [
  //           "pk_entity",
  //           "fk_project",
  //           "fk_entity",
  //         ]
  //       },
  //       "where": [
  //         "fk_project", "=", pk_project,
  //         "and", "is_in_project", "=", "true"
  //       ]
  //     }
  //   };

  //   const filter = {
  //     "orderBy": [{
  //       "pk_entity": "asc"
  //     }],
  //     "include": {
  //       "type_namespace_rels": {
  //         "$relation": {
  //           select: false,
  //           "name": "type_namespace_rels",
  //           "joinType": "inner join",
  //           "orderBy": [{ "pk_entity": "asc" }]
  //         },
  //         "namespace": {
  //           "$relation": {
  //             select: false,
  //             "name": "namespace",
  //             "joinType": "inner join",
  //             "orderBy": [{
  //               "pk_entity": "asc"
  //             }],
  //             where: ["pk_entity", "=", pk_namespace]
  //           }
  //         }
  //       },
  //       "entity_version_project_rels": innerJoinThisProject,
  //       "dfh_class": {
  //         "$relation": {
  //           select: false,
  //           "name": "dfh_class",
  //           "joinType": "inner join",
  //           "orderBy": [
  //             {
  //               "pk_entity": "asc"
  //             }
  //           ]
  //         },
  //         "ingoing_properties": {
  //           "$relation": {
  //             select: false,
  //             "name": "ingoing_properties",
  //             "joinType": "inner join",
  //             where: ["dfh_pk_property", "=", pkProperty]
  //           }
  //         }
  //       },
  //       "pi_roles": {
  //         "$relation": {
  //           "name": "pi_roles",
  //           "joinType": "left join"
  //         },
  //         "entity_version_project_rels": innerJoinThisProject,
  //         "temporal_entity": {
  //           "$relation": {
  //             "name": "temporal_entity",
  //             "joinType": "inner join",
  //             "orderBy": [{
  //               "pk_entity": "asc"
  //             }]
  //           },
  //           "entity_version_project_rels": innerJoinThisProject,
  //           "te_roles": {
  //             "$relation": {
  //               "name": "te_roles",
  //               "joinType": "inner join",
  //               "orderBy": [{
  //                 "pk_entity": "asc"
  //               }]
  //             },
  //             "entity_version_project_rels": innerJoinThisProject,
  //             "appellation": {
  //               "$relation": {
  //                 "name": "appellation",
  //                 "joinType": "left join",
  //                 "orderBy": [{
  //                   "pk_entity": "asc"
  //                 }]
  //               },
  //               // "entity_version_project_rels": innerJoinThisProject
  //             },
  //             "language": {
  //               "$relation": {
  //                 "name": "language",
  //                 "joinType": "left join",
  //                 "orderBy": [{
  //                   "pk_entity": "asc"
  //                 }]
  //               }
  //               // ,
  //               // "entity_version_project_rels": innerJoinThisProject
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  //   return InfPersistentItem.findComplex(filter, cb);
  // }

  /**
   * Query instances of E55 Type
   *
   * Where
   *	- types are in given project
   *	- types are instances of the type class
   *
   * Eager loading
   *  - The appellations of given language
   *  - TODO: The entity_associations of property "has broader term" used for hierarchy
   *
   * @param pk_namespace
   * @param pk_project
   * @param pk_class
   */
  InfPersistentItem.typesByClassAndProject = function(
    pk_project,
    pk_class,
    cb
  ) {
    const innerJoinThisProject = {
      $relation: {
        name: 'entity_version_project_rels',
        joinType: 'inner join',
        select: {
          include: ['pk_entity', 'fk_project', 'fk_entity'],
        },
        where: [
          'fk_project',
          '=',
          pk_project,
          'and',
          'is_in_project',
          '=',
          'true',
        ],
      },
    };

    const filter = {
      where: ['fk_class', '=', pk_class],
      orderBy: [
        {
          pk_entity: 'asc',
        },
      ],
      include: {
        entity_version_project_rels: innerJoinThisProject,
        pi_roles: {
          $relation: {
            name: 'pi_roles',
            joinType: 'left join',
          },
          entity_version_project_rels: innerJoinThisProject,
          temporal_entity: {
            $relation: {
              name: 'temporal_entity',
              joinType: 'inner join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
            entity_version_project_rels: innerJoinThisProject,
            te_roles: {
              $relation: {
                name: 'te_roles',
                joinType: 'inner join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
              entity_version_project_rels: innerJoinThisProject,
              appellation: {
                $relation: {
                  name: 'appellation',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
                // "entity_version_project_rels": innerJoinThisProject
              },
              language: {
                $relation: {
                  name: 'language',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
                // ,
                // "entity_version_project_rels": innerJoinThisProject
              },
            },
          },
        },
      },
    };

    return InfPersistentItem.findComplex(filter, cb);
  };

  /**
   * Query instances of E55 Type
   *
   * Where
   *	- types are related to the given namespace
   *	- types are in given project
   *	- types are types of the given typed_class (where class is domain of a property where property is inherited from has_type pk=2 and range is class)
   *  - optional: the type has the pk_entity. This is for querying a specific type.
   *
   * Eager loading
   *  - The appellations of given language
   *  - TODO: The entity_associations of property "has broader term" used for hierarchy
   *
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfPersistentItem.typesOfNamespaceNested = function(
    pk_namespace,
    pk_project,
    pk_entity,
    cb
  ) {
    const innerJoinThisProject = {
      $relation: {
        name: 'entity_version_project_rels',
        joinType: 'inner join',
        select: {
          include: ['pk_entity', 'fk_project', 'fk_entity'],
        },
        where: [
          'fk_project',
          '=',
          pk_project,
          'and',
          'is_in_project',
          '=',
          'true',
        ],
      },
    };

    const filter = {
      orderBy: [
        {
          pk_entity: 'asc',
        },
      ],
      include: {
        type_namespace_rels: {
          $relation: {
            select: false,
            name: 'type_namespace_rels',
            joinType: 'inner join',
            orderBy: [{ pk_entity: 'asc' }],
          },
          namespace: {
            $relation: {
              select: false,
              name: 'namespace',
              joinType: 'inner join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
              where: ['pk_entity', '=', pk_namespace],
            },
          },
        },
        entity_version_project_rels: innerJoinThisProject,
        text_properties: {
          $relation: {
            name: 'text_properties',
            joinType: 'left join',
          },
        },
        pi_roles: {
          $relation: {
            name: 'pi_roles',
            joinType: 'left join',
          },
          entity_version_project_rels: innerJoinThisProject,
          temporal_entity: {
            $relation: {
              name: 'temporal_entity',
              joinType: 'inner join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
            entity_version_project_rels: innerJoinThisProject,
            te_roles: {
              $relation: {
                name: 'te_roles',
                joinType: 'inner join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
              entity_version_project_rels: innerJoinThisProject,
              appellation: {
                $relation: {
                  name: 'appellation',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
                // "entity_version_project_rels": innerJoinThisProject
              },
              language: {
                $relation: {
                  name: 'language',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
                // ,
                // "entity_version_project_rels": innerJoinThisProject
              },
            },
          },
        },
      },
    };

    if (pk_entity) {
      filter.where = ['pk_entity', '=', pk_entity];
    }

    return InfPersistentItem.findComplex(filter, cb);
  };

  /**
   * Query instance of E55 Type
   *
   * Where
   *	- types are in given project
   *  - the type has the pk_entity.
   *
   * Eager loading
   *  - The appellations of given language
   *  - TODO: The entity_associations of property "has broader term" used for hierarchy
   *
   * @param pk_project
   * @param pk_entity
   */
  InfPersistentItem.typeNested = function(pk_project, pk_entity, cb) {
    const innerJoinThisProject = {
      $relation: {
        name: 'entity_version_project_rels',
        joinType: 'inner join',
        select: {
          include: ['pk_entity', 'fk_project', 'fk_entity'],
        },
        where: [
          'fk_project',
          '=',
          pk_project,
          'and',
          'is_in_project',
          '=',
          'true',
        ],
      },
    };

    const filter = {
      where: ['pk_entity', '=', pk_entity],
      orderBy: [
        {
          pk_entity: 'asc',
        },
      ],
      include: {
        entity_version_project_rels: innerJoinThisProject,
        text_properties: {
          $relation: {
            name: 'text_properties',
            joinType: 'left join',
          },
        },
        pi_roles: {
          $relation: {
            name: 'pi_roles',
            joinType: 'left join',
          },
          entity_version_project_rels: innerJoinThisProject,
          temporal_entity: {
            $relation: {
              name: 'temporal_entity',
              joinType: 'inner join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
            entity_version_project_rels: innerJoinThisProject,
            te_roles: {
              $relation: {
                name: 'te_roles',
                joinType: 'inner join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
              entity_version_project_rels: innerJoinThisProject,
              appellation: {
                $relation: {
                  name: 'appellation',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
              },
              language: {
                $relation: {
                  name: 'language',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    };

    return InfPersistentItem.findComplex(filter, (err, res) => {
      if (err) cb(err);
      else cb(null, res[0]);
    });
  };

  /**
   * Query instances of E55 Type
   *
   * Where
   *	- types are in given project
   *	- types are related to the namespace enabled by given project or the namespace geovistory ongoing
   *    TODO: There is the need of a namespace_proj_rel table that says: This project has enabled this namespace for this class
   *	- types are types of the given typed_class (where class is domain of a property where property is inherited from has_type pk=2 and range is class)
   *
   * Eager loading
   *  - The appellations of given language
   *  - TODO: The entity_associations of property "has broader term" used for hierarchy
   *
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfPersistentItem.typesOfClassAndProject = function(
    pk_project,
    pk_typed_class,
    cb
  ) {
    // TODO: use namespace_proj_rel instead of entity_version_project_rels
    const innerJoinThisProject = {
      $relation: {
        name: 'entity_version_project_rels',
        joinType: 'inner join',
        where: [
          'fk_project',
          '=',
          pk_project,
          'and',
          'is_in_project',
          '=',
          'true',
        ],
      },
    };

    // Find activated namespace
    InfPersistentItem.app.models.DatNamespace.findComplex(
      {
        include: {
          entity_version_project_rels: innerJoinThisProject,
        },
      },
      // Find types
      (error, namespace) => {
        // assign geovistory ongoing or, if available, the activated namespace
        const pk_namespace = !namespace.length
          ? Config.PK_NAMESPACE__GEOVISTORY_ONGOING
          : namespace.pk_entity;

        InfPersistentItem.typesOfNamespaceClassAndProject(
          pk_namespace,
          pk_project,
          pk_typed_class,
          cb
        );
      }
    );
  };

  /**
   * Get all types for classes and project
   *
   * Where
   *	- types are in given project
   *	- types are related to the namespace enabled by given project or the namespace geovistory ongoing
   *    TODO: There is the need of a namespace_proj_rel table that says: This project has enabled this namespace for this class
   *	- types are types of the given typed_class (where class is domain of a property where property is inherited from has_type pk=2 and range is class)
   *
   * @param pk_project
   * @param pk_typed_classes
   */
  // InfPersistentItem.typesOfClassesAndProject = function(
  //   pk_project,
  //   pk_typed_classes,
  //   cb
  // ) {
  //   const params = [pk_project, ...pk_typed_classes];
  //   const pk_typed_classes_refs = pk_typed_classes
  //     .map((pk, i) => '$' + (i + 2))
  //     .join(', ');

  //   const sql_stmt = `
  //   -- select the types
  //   SELECT type_entity.*, has_type_prop.fk_class as fk_typed_class
  //   from information.persistent_item type_entity

  //   -- join the info, of which class these the type_entities are types
  //   JOIN data_for_history.property has_type ON has_type.dfh_has_range = type_entity.fk_class
  //   JOIN system.class_has_type_property has_type_prop ON has_type.dfh_pk_property = has_type_prop.fk_property

  //   -- join the project_rel of the type
  //   JOIN projects.info_proj_rel type_proj_rel ON type_entity.pk_entity = type_proj_rel.fk_entity

  //   -- join the namespace of the type
  //   -- JOIN information.type_namespace_rel type_nmsp_rel ON type_entity.pk_entity = type_nmsp_rel.fk_persistent_item

  //   -- TODO: join namespace_project_rel in order to see if for that class a custom namespace is activated
  //   --LEFT JOIN commons.namespace_project_rel nmsp_proj_rel
  //   --	ON nmsp_proj_rel.fk_namespace = type_nmsp_rel.fk_namespace
  //   --	AND nmsp_proj_rel.fk_class = type_entity.fk_class
  //   --	AND nmsp_proj_rel.fk_project = $1
  //   -- filter for types in the given project

  //   WHERE
  //   -- where the typed class is in ...
  //   has_type_prop.fk_class IN (${pk_typed_classes_refs})

  //   -- where they type is in project
  //   AND type_proj_rel.fk_project = $1
  //   AND type_proj_rel.is_in_project = true

  //   -- TODO: somehow filter for the namespace activated per project and class
  //   --AND
  //   -- where the namespace is activated by the project, else geovistory_ongoing
  //   --nmsp_proj_rel.fk_namespace IS NULL OR nmsp_proj_rel.fk_namespace = $xy`;

  //   const connector = InfPersistentItem.dataSource.connector;
  //   connector.execute(sql_stmt, params, (err, resultObjects) => {
  //     if (err) return cb(err, resultObjects);
  //     cb(null, resultObjects);
  //   });
  // };

  /**
   * Add a persistent item to project
   *
   * This query will add those things to the project:
   * - Roles that are enabled for auto-adding (using the admin configuration of that class).
   * - Entity associationss enabled for auto-adding (using the admin configuration of that class).
   *   This will add the type for example. If the type is not activated by the project, the association is added but nothing will be displayed in that project.
   *   Currently, there is no information displayed to the user, concerning the possible 'loss' of type information upon adding it to the project.
   *
   * This query will not add
   * - The temporal entities (since we can then still decide, which temporal entities will be shown in the result list)
   * - The value-like items (time-primitive, appellation, language), since they never belong to projects
   *
   * See this page for details
   * https://kleiolab.atlassian.net/wiki/spaces/GEOV/pages/693764097/Add+DataUnits+to+Project
   *
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfPersistentItem.addToProject = function(pk_project, pk_entity, ctx, cb) {
    if (!ctx.req.accessToken.userId)
      return Error('AccessToken.userId is missing');
    const accountId = ctx.req.accessToken.userId;

    const params = [pk_entity, pk_project, accountId];

    const sql_stmt = `SELECT information.add_pe_it_to_project($1, $2, $3)`;

    const connector = InfPersistentItem.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) return cb(err, resultObjects);

      InfPersistentItem.ownProperties(pk_project, pk_entity, (err, result) => {
        cb(err, result);
      });
    });
  };

  InfPersistentItem.preview = function(
    pk_project,
    pk_entity,
    fk_app_context,
    cb
  ) {
    const sql_stmt = 'select * from information.queryPeItPreview($1,$2,$3)';
    const params = [pk_project, pk_entity, fk_app_context];
    const connector = InfPersistentItem.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });
  };

  /**
   * Includes only appellations of persistent items
   */
  InfPersistentItem.getTypeIncludeObject = function(pkProject) {
    const projectJoin = {
      entity_version_project_rels: InfPersistentItem.app.models.ProInfoProjRel.getJoinObject(
        true,
        pkProject
      ),
    };
    return {
      ...projectJoin,
      pi_roles: {
        $relation: {
          name: 'pi_roles',
          joinType: 'left join',
        },
        ...projectJoin,
        temporal_entity: {
          $relation: {
            name: 'temporal_entity',
            joinType: 'inner join',
            orderBy: [
              {
                pk_entity: 'asc',
              },
            ],
          },
          te_roles: {
            $relation: {
              name: 'te_roles',
              joinType: 'inner join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
            ...projectJoin,
            appellation: {
              $relation: {
                name: 'appellation',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
            },
          },
        },
      },
      text_properties: {
        $relation: {
          name: 'text_properties',
          joinType: 'left join',
          orderBy: [{ pk_entity: 'asc' }],
        },
        ...projectJoin,
        language: {
          $relation: {
            name: 'language',
            joinType: 'left join',
            orderBy: [
              {
                pk_entity: 'asc',
              },
            ],
          },
        },
      },
    };
  };

  /**
   * Get all types of project with all appellations
   * and all text properties
   */
  InfPersistentItem.typesOfProject = function(pkProject, cb) {
    // Get array of all peits that are types and in given project
    const sql_stmt = `
      SELECT 1, jsonb_agg(t3.pk_entity) as pk_type_array
      FROM
      "system".class_has_type_property t1,
      data_for_history.v_property  t2,
      information.persistent_item t3,
      projects.info_proj_rel t4
      WHERE t1.fk_property = t2.pk_property
      AND t3.fk_class = t2.has_range
      AND t4.fk_entity = t3.pk_entity
      AND t4.is_in_project = true
      AND t4.fk_project = $1
      GROUP BY 1
    `;

    const params = [pkProject];
    const connector = InfPersistentItem.dataSource.connector;
    connector.execute(sql_stmt, params, (err, result) => {
      if (err) return cb(err);

      if (
        !result ||
        !result.length > 0 ||
        !result[0].pk_type_array ||
        result[0].pk_type_array.length < 1
      )
        return cb(false, []);

      let filter = {
        where: ['pk_entity', 'IN', result[0].pk_type_array],
        include: InfPersistentItem.getTypeIncludeObject(pkProject),
      };

      return InfPersistentItem.findComplex(filter, cb);
    });
  };

  /**
   * Get all type of project with all appellations
   * and all text properties
   */
  InfPersistentItem.typeOfProject = function(pkProject, pkType, cb) {
    let filter = {
      where: ['pk_entity', '=', pkType],
      include: InfPersistentItem.getTypeIncludeObject(pkProject),
    };

    return InfPersistentItem.findComplex(filter, cb);
  };

  InfPersistentItem.ownProperties = function(pkProject, pkEntity, cb) {
    const mainQuery = new FlatObjectQueryBuilder(
      InfPersistentItem.app.models
    ).createPeItOwnPropertiesQuery(pkProject, pkEntity);
    const connector = InfPersistentItem.dataSource.connector;
    connector.execute(mainQuery.sql, mainQuery.params, (err, result) => {
      if (err) return cb(err);
      const item = result[0];
      const data = !item ? {} : item.data;
      return cb(false, data);
    });
  };

  InfPersistentItem.flatObjectOfProject = function(pkProject, pkEntity, cb) {
    const mainQuery = new FlatObjectQueryBuilder(
      InfPersistentItem.app.models
    ).createPeItMainQuery(pkProject, pkEntity);
    const connector = InfPersistentItem.dataSource.connector;
    connector.execute(mainQuery.sql, mainQuery.params, (err, result) => {
      if (err) return cb(err);
      if (result.length === 0) return cb(false, result);

      const geoPks = result.find(row => row.model === 'geos').json_agg;

      if (!geoPks || geoPks.length === 0) return cb(false, result);

      const geoQuery = new FlatObjectQueryBuilder(
        InfPersistentItem.app.models
      ).createPeItGeoQuery(
        pkProject,
        geoPks.map(pk => parseInt(pk))
      );
      connector.execute(geoQuery.sql, geoQuery.params, (err, geoResult) => {
        if (err) return cb(err);
        const final = {};
        const models = [
          'persistent_item',
          'role',
          'entity_association',
          'temporal_entity',
          'appellation',
          'language',
          'time_primitive',
          'place',
          'text_property',
          'info_proj_rel',
        ];

        result.forEach(row => {
          if (models.indexOf(row.model) > -1) {
            final[row.model] = row.json_agg;
          }
        });

        geoResult.forEach(row => {
          if (models.indexOf(row.model) > -1) {
            final[row.model] = [...(final[row.model] || []), ...row.json_agg];
          }
        });

        return cb(null, final);
      });
    });
  };
};
